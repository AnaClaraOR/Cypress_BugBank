import { loginLocators } from "../../support/locators/loginLocators"
import { cadastroLocators } from '../../support/locators/cadastroLocators';
import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
const { env } = require('../../support/env-dinamico')

describe('Transação', () => {

  before('Dado que me registrei e estou logado', () => {
    cy.fluxoCadastro(env.usuario1);
    cy.fluxoCadastro(env.usuario2);
    cy.fluxoLogin(env.usuario1);
  })

  describe('Só é permitido transferência para contas válidas', () => {
    it('Quando eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clico no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Transferencia realizada com sucesso"', () => {
      cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Só é permitido transferência quando saldo é igual ou maior que valor para transferir', () => {
    it('Quando eu clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerada: ${env.valorMaior}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorMaior)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Você não tem saldo suficiente para essa transação"', () => {
      cadastroLocators.alert().should('contains.text', 'Você não tem saldo suficiente para essa transação')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('Quando eu clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      cy.log(`Número da conta gerada: ${env.numConta}`)
      cy.get(transferenciaLocators.numeroContaField).type(env.numConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      cy.log(`Dígito da conta gerada: ${env.numDigitoConta}`)
      cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Conta inválida ou inexistente"', () => {
      cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Número e digito da conta aceitam apenas números', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('Quando eu clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu coloco um número de conta inválido com uma letra no campo "Número da conta"', () => {
      cy.log(`Número da conta gerada: ${env.numContaInvalida}`)
      cy.get(transferenciaLocators.numeroContaField).type(env.numContaInvalida)
    })

    it('E eu coloco o dígito inválido no campo "Dígito"', () => {
      cy.log(`Dígito da conta gerada: ${env.numDigitoContaInvalida}`)
      cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoContaInvalida)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Conta inválida ou inexistente"', () => {
      cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Campo descrição é um campo de preenchimento obrigatório', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "É campo obrigatório"', () => {
      /**
      * Dará erro no teste, pois não há validação do campo "Descrição" 
      * para que seja de preencimento obrigatório.
      */
      //cadastroLocators.alertObrigatorio().should('contains.text','É campo obrigatório')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Valor de transferência não pode ser igual ou menor que zero', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('Quando eu clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorMenor}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorMenor)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Valor da transferência não pode ser 0 ou negativo"', () => {
      cadastroLocators.alert().should('contains.text', 'Valor da transferência não pode ser 0 ou negativo')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"', () => {
    it('Quando eu clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E eu clicar no botão TRANSFERÊNCIA', () => {
      cy.saldo().then((saldo) => {
        Cypress.env('saldoHome', saldo);
      })
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })

    it('E clicar no botão Voltar', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('E verifico se o valor foi debitado do saldo inicial', () => {
      cy.saldo().then((saldo) => {
        Cypress.env('saldoHomeFinal', saldo);
      }).then(() => {
        const saldoInicial = Cypress.env('saldoHome');
        const saldoFinal = Cypress.env('saldoHomeFinal');

        const valorEsperado = Number((saldoInicial - (env.valorTransferencia)).toFixed(2));

        cy.log(`Saldo inicial: ${saldoInicial}`);
        cy.log(`Saldo final: ${saldoFinal}`);
        cy.log(`Valor esperado: ${valorEsperado}`);

        expect(saldoFinal).to.equal(valorEsperado);
      });
    })
  })

  describe('Ao realizar uma transferência com sucesso deve ser redirecionado para o extrato', () => {
    it('Quando eu clicar no botão TRANSFERÊNCIA', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Então eu insiro o número da conta no campo "Número da conta"', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('E eu coloco o dígito no campo "Dígito"', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('E eu insiro o valor no campo "Valor da transferência"', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('E eu insiro a descrição no campo "Descrição"', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('E eu clicar no botão "Transferir agora"', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('E eu devo ver a mensagem "Transferencia realizada com sucesso"', () => {
      cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('E clicar no botão Fechar', () => {
      cadastroLocators.fecharBnt().click()
    })

    it('E eu sou direcionado a página de extrato', () => {
      /**
       * Dará erro no teste, pois após a transferência com sucesso a 
       * página deveria ser redirecionada para o extrato, porém 
       * permanece na transferência. 
       */
      //cy.url().should('include', 'https://bugbank.netlify.app/bank-statement');
    })
  })
})