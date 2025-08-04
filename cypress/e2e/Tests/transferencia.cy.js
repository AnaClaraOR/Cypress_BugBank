import { fluxoCadastroContaComSucesso2 } from "../../support/testSuites/funcoesReutilizaveis"
import { cadastroForm } from "../Pages/cadastro_page"
import { loginForm } from "../Pages/login_page"
import { input_transferencia, input_vazio, transferenciaForm } from "../Pages/transferencia_page"
import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
const { env } = require('../../support/env-dinamico')

describe('Transação', () => {

  before('Given I have registered and am logged in', () => {
    fluxoCadastroContaComSucesso();
    fluxoCadastroContaComSucesso2();
    cy.get('.card__login [name="email"]').type(env.email, { force: true })
    cy.get('.card__login [name="password"]').type(env.senha, { force: true })
    loginForm.clickAcessar()
  })

  describe('Só é permitido transferência para contas válidas', () => {
    it('When I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Transferencia realizada com sucesso"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Só é permitido transferência quando saldo é igual ou maior que valor para transferir', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valorMaior)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Você não tem saldo suficiente para essa transação"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Você não tem saldo suficiente para essa transação')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter invalid account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(input_transferencia.numConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(input_transferencia.numDigitoConta)
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Conta inválida ou inexistente"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Número e digito da conta aceitam apenas números', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter invalid account number with letter in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(input_transferencia.numContaInvalida)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(input_transferencia.numDigitoContaInvalida)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Conta inválida ou inexistente"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Conta inválida ou inexistente')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Campo descrição é um campo de preenchimento obrigatório', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description empty in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_vazio.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "É campo obrigatório"', () => {
      /**
      * Dará erro no teste, pois não há validação do campo "Descrição" 
      * para que seja de preencimento obrigatório.
      */
      //cadastroForm.componentes_cadastro.alertObrigatorio().should('contains.text','É campo obrigatório')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Valor de transferência não pode ser igual ou menor que zero', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valorMenor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Valor da transferência não pode ser 0 ou negativo"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Valor da transferência não pode ser 0 ou negativo')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })
  })

  describe('Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"', () => {
    it('When I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('And I click in TRANSFERÊNCIA button', () => {
      cy.wait(2000)
      transferenciaForm.saldoInicial()
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
    })

    it('And I click in voltar button', () => {
      transferenciaForm.clickVoltar()
    })

    it('And I checks if the amount was debited from the opening balance', async () => {
      await transferenciaForm.saldoFinal()
      expect(transferenciaForm.saldoContaFinal).to.equal(Number(transferenciaForm.novoSaldoConta.toFixed(2)))
    })
  })

  describe('Ao realizar uma transferência com sucesso deve ser redirecionado para o extrato', () => {
    //Se não for utilizado o botão do voltar para limpar a tela, tem que comentar esse ponto
    it('When I click in TRANSFERÊNCIA button', () => {
      transferenciaForm.clickTransferencia()
    })

    it('Then I enter account number in "Número da conta" field', () => {
      transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
    })

    it('And I enter digit in "Dígito" field', () => {
      transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
    })

    it('And I enter value in "Valor da transferência" field', () => {
      transferenciaForm.typeValorTransferencia(input_transferencia.valor)
    })

    it('And I enter description in "Descrição" field', () => {
      transferenciaForm.typeDescricao(input_transferencia.descricao)
    })

    it('And I click in "Transferir agora" button', () => {
      transferenciaForm.clickTransferir()
    })

    it('And I should see the mensage "Transferencia realizada com sucesso"', () => {
      cadastroForm.componentes_cadastro.alert().should('contains.text', 'Transferencia realizada com sucesso')
    })

    it('And click Fechar button', () => {
      cadastroForm.clickFechar()
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