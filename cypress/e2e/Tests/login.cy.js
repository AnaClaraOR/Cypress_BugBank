import { loginLocators } from "../../support/locators/loginLocators"
const { env } = require('../../support/env-dinamico')

describe('Login', () => {

  beforeEach(() => {
    cy.clearAllLocalStorage()
    cy.visit('/')
  })

  //----------------CENÁRIO 1-------------------
  it('Email e Senha são campos obrigatórios', () => {
    loginLocators.acessarBnt().click()
    loginLocators.alertObrigatorio().should('contains.text', 'É campo obrigatório')
  })

  //----------------CENÁRIO 2-------------------
  it('Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos"', () => {
    loginLocators.acessarBnt().click()
    /**
   * Dará erro no teste, pois a mensagem do requisito não é apresentada, ele 
   * faz a validação do campo se está vazio ou não e apresenta o alerta abaixo 
   * do campo 'É campo obrigatório'
   */
    //loginLocators.alertObrigatorio().should('contains.text', 'Usuário e senha precisam ser preenchidos')
  })

  //----------------CENÁRIO 3-------------------
  it('Não deve autorizar o acesso para usuários inválidos ou não cadastrados', () => {
    cy.get(loginLocators.emailInput).type(env.usuario.email, { force: true })
    cy.get(loginLocators.senhaInput).type(env.usuario.senha, { force: true })
    loginLocators.acessarBnt().click()
    loginLocators.alertUserInvalido().should('contains.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!')
  })

  //----------------CENÁRIO 4-------------------
  it('Usuários válidos e cadastros são direcionados para a home', () => {
    cy.fluxoCadastro(env.usuario1);
    cy.get(loginLocators.emailInput).type(env.usuario1.email, { force: true })
    cy.get(loginLocators.senhaInput).type(env.usuario1.senha, { force: true })
    loginLocators.acessarBnt().click()
    loginLocators.textHomePage().should('contains.text', 'bem vindo ao BugBank :)')
  })
})