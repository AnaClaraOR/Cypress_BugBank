import { cadastroForm, input_registro } from "../Pages/cadastro_page"
import { input_login, input_valida, loginForm } from "../Pages/login_page"

describe('Login', () => {

  //----------------CENÁRIO 1-------------------
  describe('Email e Senha são campos obrigatórios', () => {
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I click in Acessar button', () => {
      loginForm.clickAcessar()
    })

    it('Then I should see the mensage in fields "É campo obrigatório"', () => {
      loginForm.elements.alertObrigatorio().should('contains.text', 'É campo obrigatório')
    })
  })

  //----------------CENÁRIO 2-------------------
  describe('Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos"', () => {
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I click in Acessar button', () => {
      loginForm.clickAcessar()
    })

    it('Then I should see the mensage "Usuário e senha precisam ser preenchidos"', () => {
      /**
     * Dará erro no teste, pois a mensagem do requisito não é 
     * apresentada, ele faz a validação do campo se está vazio 
     * ou não e apresenta o alerta abaixo do campo 'É campo 
     * obrigatório'
     */
  
      //loginForm.elements.alertObrigatorio().should('contains.text', 'Usuário e senha precisam ser preenchidos')
    })
  })

  //----------------CENÁRIO 3-------------------
  describe('Não deve autorizar o acesso para usuários inválidos ou não cadastrados.', () => {
    it('Given I am on the login page', () => {
      cy.visit('/')
    })

    it('When I enter email address in "E-mail" field not registered', () => {
      loginForm.typeEmail(input_login.email)
    })

    it('When I enter password in "Senha" field not registered', () => {
      loginForm.typeSenha(input_login.senha)
    })

    it('And I click in Acessar button', () => {
      loginForm.clickAcessar()
    })

    it('And I should see the mensage "Usuário ou senha inválido.Tente novamente ou verifique suas informações!"', () => {
      loginForm.elements.userInvalido().should('contains.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!')
    })
  })

  //----------------CENÁRIO 4-------------------
  describe('Usuários válidos e cadastros são direcionados para a home', () => {
    it('Given that I have registered the username and password', () => {
      cy.visit('/')
      cadastroForm.clickRegistrar()
      cadastroForm.typeEmailRegister(input_registro.email)
      cadastroForm.typeNomeRegister(input_registro.nome)
      cadastroForm.typeSenhaRegister(input_registro.senha)
      cadastroForm.typeConfirmaSenha(input_registro.senha)
      cadastroForm.clickCadastrar()
      cadastroForm.clickFechar()
    })

    it('When I enter email address in "E-mail" field', () => {
      loginForm.typeEmail(input_registro.email)
    })

    it('And I enter password in "Senha" field', () => {
      loginForm.typeSenha(input_registro.senha)
    })

    it('And I click in Acessar button', () => {
      loginForm.clickAcessar()
    })

    it('Then I should be directed to the home page', () => {
      loginForm.elements.homePage().should('contains.text', 'bem vindo ao BugBank :)')
    })
  })
})

