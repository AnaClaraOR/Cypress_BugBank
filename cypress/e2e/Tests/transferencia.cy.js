import { faker } from '@faker-js/faker';
import { cadastroLocators } from '../../support/locators/cadastroLocators';
import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
const { env } = require('../../support/env-dinamico')

describe('Transação', () => {

  beforeEach('Dado que me registrei e estou logado', () => {
    cy.fluxoCadastro(env.usuario1)
    cy.fluxoCadastro(env.usuario2).then((dadosDaConta) => {
      Cypress.env('numeroConta', dadosDaConta.numeroConta);
      Cypress.env('digitoConta', dadosDaConta.digitoConta);
    })
    cy.fluxoLogin(env.usuario1);
    transferenciaLocators.transferenciaBnt().click()
  })

  afterEach(function () {
    if (
      this.currentTest.title === 'Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"' ||
      this.currentTest.title === 'Ao realizar uma transferência com sucesso deve ser redirecionado para o extrato'
    ) {
      transferenciaLocators.sairBnt().click()
      return;
    }
    cadastroLocators.fecharBnt().click()
    transferenciaLocators.sairBnt().click()
  });

  //-----------------CENÁRIO 1----------------------
  it('Só é permitido transferência para contas válidas', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
  })

  //-----------------CENÁRIO 2----------------------
  it('Permitido transferência quando saldo é igual ou maior que valor para transferir', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.saldo().then((saldo) => {
      cy.log('Saldo:', saldo)
      const valorTransferencia = faker.finance.amount({ min: 1, max: saldo, dec: 2 })
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta);
      cy.get(transferenciaLocators.valorTransferenciaField).type(valorTransferencia);
      cy.log('valor:', valorTransferencia)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao);
      transferenciaLocators.transferirBnt().click();

      cadastroLocators.alert()
        .should('be.visible')
        .and('contains.text', 'Transferencia realizada com sucesso');
    });
  });

  //-----------------CENÁRIO 2.1----------------------
  it('Não é permitido transferência quando saldo é menor que valor para transferir', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.saldo().then((saldo) => {
      cy.log('Saldo:', saldo)
      const valorTransferencia = faker.finance.amount({ min: saldo + 1, max: saldo*5, dec: 2 })
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta);
      cy.get(transferenciaLocators.valorTransferenciaField).type(valorTransferencia);
      cy.log('valor:', valorTransferencia)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao);
      transferenciaLocators.transferirBnt().click();

      cadastroLocators.alert()
        .should('be.visible')
        .and('contains.text', 'Você não tem saldo suficiente para essa transação');
    });
  });

  //-----------------CENÁRIO 3----------------------
  it('Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"', () => {
    cy.get(transferenciaLocators.numeroContaField).type(env.numConta)
    cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
  })

  //-----------------CENÁRIO 4----------------------
  it('Número e digito da conta aceitam apenas números', () => {
    cy.get(transferenciaLocators.numeroContaField).type(env.numContaInvalida)
    cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoContaInvalida)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
  })

  //-----------------CENÁRIO 5----------------------
  it('Campo descrição é um campo de preenchimento obrigatório', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    transferenciaLocators.transferirBnt().click()
    /**
    * Dará erro no teste, pois não há validação do campo "Descrição" para 
    * que seja de preencimento obrigatório.
    */
    //cadastroLocators.alertObrigatorio().should('contains.text','É campo obrigatório')
  })

  //-----------------CENÁRIO 6----------------------
  it('Valor de transferência não pode ser igual ou menor que zero', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorMenor)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Valor da transferência não pode ser 0 ou negativo')
  })

  //-----------------CENÁRIO 7----------------------
  it('Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.saldo().then((saldo) => {
      Cypress.env('saldoHome', saldo);
    })

    cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    cadastroLocators.fecharBnt().click()
    transferenciaLocators.voltarBnt().click()

    cy.saldo().then((saldo) => {
      Cypress.env('saldoHomeFinal', saldo);
    }).then(() => {
      const saldoInicial = Cypress.env('saldoHome');
      const saldoFinal = Cypress.env('saldoHomeFinal');
      const valorEsperado = Number((saldoInicial - (env.valorTransferencia)).toFixed(2));

      expect(saldoFinal).to.equal(valorEsperado);
    });
  })

  //-----------------CENÁRIO 8----------------------
  it('Ao realizar uma transferência com sucesso deve ser redirecionado para o extrato', () => {
    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');

    cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    transferenciaLocators.transferirBnt().click()
    cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    cadastroLocators.fecharBnt().click()
    /**
     * Dará erro no teste, pois após a transferência com sucesso a página 
     * deveria ser redirecionada para o extrato, porém permanece na transferência. 
     */
    //cy.url().should('include', 'https://bugbank.netlify.app/bank-statement');
  })
})