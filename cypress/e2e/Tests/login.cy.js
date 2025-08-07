import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { loginLocators } from "../../support/locators/loginLocators"
const { env } = require('../../support/env-dinamico')

describe('Login', () => {

  //----------------CENÁRIO 1-------------------
  describe('Email e Senha são campos obrigatórios', () => {
    it('Dado que estou na página de login', () => {
      cy.visit('/')
    })

    it('Quando eu clicar no botão Acessar', () => {
      loginLocators.acessarBnt().click()
    })

    it('Então devo ver a mensagem nos campos "É campo obrigatório"', () => {
      loginLocators.alertObrigatorio().should('contains.text', 'É campo obrigatório')
    })
  })

  //----------------CENÁRIO 2-------------------
  describe('Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos"', () => {
    it('Dado que estou na página de login', () => {
      cy.visit('/')
    })

    it('Quando eu clicar no botão Acessar', () => {
      loginLocators.acessarBnt().click()
    })

    it('Então devo ver a mensagem "Usuário e senha precisam ser preenchidos"', () => {
      /**
     * Dará erro no teste, pois a mensagem do requisito não é 
     * apresentada, ele faz a validação do campo se está vazio 
     * ou não e apresenta o alerta abaixo do campo 'É campo 
     * obrigatório'
     */
  
      //loginLocators.alertObrigatorio().should('contains.text', 'Usuário e senha precisam ser preenchidos')
    })
  })

  //----------------CENÁRIO 3-------------------
  describe('Não deve autorizar o acesso para usuários inválidos ou não cadastrados.', () => {
    it('Dado que estou na página de login', () => {
      cy.visit('/')
    })

    it('Quando eu insiro o endereço de e-mail no campo "E-mail" não registrado', () => {
      cy.log(`Email gerado: ${env.email}`)
      cy.get(loginLocators.emailInput).type(env.email, { force: true })
    })

    it('Quando eu insiro a senha no campo "Senha" não registrado', () => {
      cy.log(`Senha gerada: ${env.senha}`)
      cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
    })

    it('E clico no botão Acessar', () => {
      loginLocators.acessarBnt().click()
    })

    it('E eu devo ver a mensagem "Usuário ou senha inválido.Tente novamente ou verifique suas informações!"', () => {
      loginLocators.alertUserInvalido().should('contains.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!')
    })
  })

  //----------------CENÁRIO 4-------------------
  describe('Usuários válidos e cadastros são direcionados para a home', () => {
    it('Dado que registrei o usuário e a senha', () => {
      fluxoCadastroContaComSucesso();
    })

    it('Quando eu insiro o endereço de e-mail no campo "E-mail"', () => {
      cy.get(loginLocators.emailInput).type(env.email, { force: true })
    })

    it('E eu coloco a senha no campo "Senha"', () => {
      cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
    })

    it('E eu clico no botão Acessar', () => {
      loginLocators.acessarBnt().click()
    })

    it('Então eu deveria ser direcionado para a página inicial', () => {
      loginLocators.textHomePage().should('contains.text', 'bem vindo ao BugBank :)')
    })
  })
})
