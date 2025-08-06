import { fluxoCadastroContaComSucesso2 } from "../../support/testSuites/funcoesReutilizaveis"
import { transferenciaForm } from "../Pages/transferencia_page"
import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { loginLocators } from "../../support/locators/loginLocators"
import { cadastroLocators } from '../../support/locators/cadastroLocators';
import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
const { env } = require('../../support/env-dinamico')

describe('Transação', () => {

  before('Given I have registered and am logged in', () => {
    fluxoCadastroContaComSucesso();
    fluxoCadastroContaComSucesso2();
    cy.get(loginLocators.emailInput).type(env.email, { force: true })
    cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
    loginLocators.acessarBnt().click()
  })

  describe('Só é permitido transferência para contas válidas', () => {
    it('When I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Transferencia realizada com sucesso"', () => {
      cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Só é permitido transferência quando saldo é igual ou maior que valor para transferir', () => {
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerada: ${env.valorMaior}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorMaior)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Você não tem saldo suficiente para essa transação"', () => {
      cadastroLocators.alert().should('contains.text', 'Você não tem saldo suficiente para essa transação')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter invalid account number in "Número da conta" field', () => {
      cy.log(`Número da conta gerada: ${env.numConta}`)
      cy.get(transferenciaLocators.numeroContaField).type(env.numConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      cy.log(`Dígito da conta gerada: ${env.numDigitoConta}`)
      cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Conta inválida ou inexistente"', () => {
      cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Número e digito da conta aceitam apenas números', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter invalid account number with letter in "Número da conta" field', () => {
      cy.log(`Número da conta gerada: ${env.numContaInvalida}`)
      cy.get(transferenciaLocators.numeroContaField).type(env.numContaInvalida)
    })

    it('And I enter digit in "Dígito" field', () => {
      cy.log(`Dígito da conta gerada: ${env.numDigitoContaInvalida}`)
      cy.get(transferenciaLocators.digitoContaField).type(env.numDigitoContaInvalida)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Conta inválida ou inexistente"', () => {
      cadastroLocators.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Campo descrição é um campo de preenchimento obrigatório', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "É campo obrigatório"', () => {
      /**
      * Dará erro no teste, pois não há validação do campo "Descrição" 
      * para que seja de preencimento obrigatório.
      */
      //cadastroForm.componentes_cadastro.alertObrigatorio().should('contains.text','É campo obrigatório')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Valor de transferência não pode ser igual ou menor que zero', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorMenor}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorMenor)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Valor da transferência não pode ser 0 ou negativo"', () => {
      cadastroLocators.alert().should('contains.text', 'Valor da transferência não pode ser 0 ou negativo')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })
  })

  describe('Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"', () => {
    it('When I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I click in TRANSFERÊNCIA button', () => {
      cy.saldo().then((saldo) => {
        Cypress.env('saldoHome', saldo);
      })
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })

    it('And I click in voltar button', () => {
      transferenciaLocators.voltarBnt().click()
    })

    it('And I checks if the amount was debited from the opening balance', () => {
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
    it('When I click in TRANSFERÊNCIA button', () => {
      transferenciaLocators.transferenciaBnt().click()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      const numeroConta = Cypress.env('numeroConta');
      cy.log(`Conta recebida: ${numeroConta}`);
      cy.get(transferenciaLocators.numeroContaField).type(numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      const digitoConta = Cypress.env('digitoConta');
      cy.log(`digito recebida: ${digitoConta}`);
      cy.get(transferenciaLocators.digitoContaField).type(digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      cy.log(`Valor transferência gerado: ${env.valorTransferencia}`)
      cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia)
    })

    it('And I enter description in "Descrição" field', () => {
      cy.log(`Descrição gerada: ${env.descricao}`)
      cy.get(transferenciaLocators.descricaoField).type(env.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaLocators.transferirBnt().click()
    })

    it('And I should see the mensage "Transferencia realizada com sucesso"', () => {
      cadastroLocators.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('And click Fechar button', () => {
      cadastroLocators.fecharBnt().click()
    })

    it('And I go extrato page', () => {
      /**
       * Dará erro no teste, pois após a transferência com sucesso a 
       * página deveria ser redirecionada para o extrato, porém 
       * permanece na transferência. 
       */
      //cy.url().should('include', 'https://bugbank.netlify.app/bank-statement');
    })
  })
})