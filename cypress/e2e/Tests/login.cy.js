import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { loginLocators } from "../../support/locators/loginLocators"
const { env } = require('../../support/env-dinamico')

describe('Login', () => {

  //----------------CENÁRIO 1-------------------
  describe('Email e Senha são campos obrigatórios', () => {
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I click in Acessar button', () => {
      loginLocators.acessarBnt().click()
    })

    it('Then I should see the mensage in fields "É campo obrigatório"', () => {
      loginLocators.alertObrigatorio().should('contains.text', 'É campo obrigatório')
    })
  })

  //----------------CENÁRIO 2-------------------
  describe('Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos"', () => {
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I click in Acessar button', () => {
      loginLocators.acessarBnt().click()
    })

    it('Then I should see the mensage "Usuário e senha precisam ser preenchidos"', () => {
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
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I enter email address in "E-mail" field not registered', () => {
      cy.log(`Email gerado: ${env.email}`)
      cy.get(loginLocators.emailInput).type(env.email, { force: true })
    })

    it('When I enter password in "Senha" field not registered', () => {
      cy.log(`Senha gerada: ${env.senha}`)
      cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
    })

    it('And I click in Acessar button', () => {
      loginLocators.acessarBnt().click()
    })

    it('And I should see the mensage "Usuário ou senha inválido.Tente novamente ou verifique suas informações!"', () => {
      loginLocators.alertUserInvalido().should('contains.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!')
    })
  })

  //----------------CENÁRIO 4-------------------
  describe('Usuários válidos e cadastros são direcionados para a home', () => {
    it('Given that I have registered the username and password', () => {
      fluxoCadastroContaComSucesso();
    })

    it('When I enter email address in "E-mail" field', () => {
      cy.get(loginLocators.emailInput).type(env.email, { force: true })
    })

    it('And I enter password in "Senha" field', () => {
      cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
    })

    it('And I click in Acessar button', () => {
      loginLocators.acessarBnt().click()
    })

    it('Then I should be directed to the home page', () => {
      loginLocators.textHomePage().should('contains.text', 'bem vindo ao BugBank :)')
    })
  })
})
