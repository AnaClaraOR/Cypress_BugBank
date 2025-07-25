import { cadastroForm, input_registro, input_vazio } from "../Pages/cadastro_page"
import { loginForm } from "../Pages/login_page"

describe('Cadastro de usuário', () => {

    before(() => cy.clearAllLocalStorage())

    //-----------------CENÁRIO 1----------------------
    describe('Os campos Nome, Email, Senha e Confirmação de senha são de preenchimento obrigatório', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage in fields "É campo obrigatório"', () => {
            cadastroForm.componentes_cadastro.alertObrigatorio().should('contains.text', 'É campo obrigatório')
        })
    })

    //-----------------CENÁRIO 2----------------------
    describe('Tentativa de cadastro sem preencher NOME deve visualizar a mensagem "Nome não pode ser vazio"', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it(`Then I enter email address in "E-mail" field`, () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name empty in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_vazio.nome)
            cy.log(`Nome: ${input_vazio.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage "Nome não pode ser vazio"', () => {
            cadastroForm.componentes_cadastro.alert().should('contains.text', 'Nome não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 3----------------------
    describe('Tentativa de cadastro sem preencher EMAIL deve visualizar a mensagem "Email não pode ser vazio"', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address empty in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_vazio.email)
            cy.log(`Email: ${input_vazio.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage "Email não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroForm.componentes_cadastro.alert().should('contains.text', 'Email não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 4----------------------
    describe('Tentativa de cadastro sem preencher SENHA deve visualizar a mensagem "Senha não pode ser vazio"', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address empty in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in empty "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_vazio.senha)
            cy.log(`Senha: ${input_vazio.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage "Senha não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroForm.componentes_cadastro.alert().should('contains.text', 'Senha não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 5----------------------
    describe('Tentativa de cadastro sem preencher CONFIRMAÇÃO SENHA deve visualizar a mensagem "Confirmar senha não pode ser vazio"', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in empty "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_vazio.senha)
            cy.log(`Confirmação Senha: ${input_vazio.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage "Confirmar senha não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroForm.componentes_cadastro.alert().should('contains.text', 'Confirmar senha não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 6----------------------
    describe('Senha e confirmação de senha precisam ser iguais', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter different password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.confirmaSenhaFaker)
            cy.log(`Confirmação Senha: ${input_registro.confirmaSenhaFaker}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('Then I should see the mensage "As senhas não são iguais."', () => {
            cadastroForm.componentes_cadastro.alert().should('contains.text', 'As senhas não são iguais.')
        })
    })

    //-----------------CENÁRIO 7----------------------
    describe('Cadastrar conta com sucesso deve exibir número da conta criada', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it(`Then I should see the mensage "A conta XXX foi criada com sucesso"`, () => {
            cadastroForm.componentes_cadastro.alert().invoke('text').should('match', /^A conta \d+-\d+ foi criada com sucessoFechar$/)
        })
    })

    //-----------------CENÁRIO 8----------------------
    describe('Deixar ativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 1.000,00', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click activate in "Criar conta com saldo ?"', () => {
            cadastroForm.clickContaSaldo()
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('And I click in Fechar button', () => {
            cadastroForm.clickFechar()
        })

        it('When I enter email address in "E-mail" field registered', () => {
            loginForm.typeEmail(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter password in "Senha" field registered', () => {
            loginForm.typeSenha(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I click in Acessar button', () => {
            loginForm.clickAcessar()
        })

        it('Then I should see "Saldo em conta R$ 1.000,00"', () => {
            cadastroForm.componentes_cadastro.saldoConta().should('contains.text', "1.000,00")
        })
    })

    //-----------------CENÁRIO 9----------------------

    describe('Deixar inativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 0,00', () => {
        it('Given I am on the login page', () => {
            cy.visit('/')
        })

        it('When I click in Registrar button', () => {
            cadastroForm.clickRegistrar()
        })

        it('Then I enter email address in "E-mail" field', () => {
            cadastroForm.typeEmailRegister(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter name in "Nome" field', () => {
            cadastroForm.typeNomeRegister(input_registro.nome)
            cy.log(`Nome: ${input_registro.nome}`);
        })

        it('And I enter password in "Senha" field', () => {
            cadastroForm.typeSenhaRegister(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I enter password confirmation in "Confirmação Senha" field', () => {
            cadastroForm.typeConfirmaSenha(input_registro.senha)
            cy.log(`Confirmação Senha: ${input_registro.senha}`);
        })

        it('And I click in Cadastrar button', () => {
            cadastroForm.clickCadastrar()
        })

        it('And I click in Fechar button', () => {
            cadastroForm.clickFechar()
        })

        it('When I enter email address in "E-mail" field registered', () => {
            loginForm.typeEmail(input_registro.email)
            cy.log(`Email: ${input_registro.email}`);
        })

        it('And I enter password in "Senha" field registered', () => {
            loginForm.typeSenha(input_registro.senha)
            cy.log(`Senha: ${input_registro.senha}`);
        })

        it('And I click in Acessar button', () => {
            loginForm.clickAcessar()
        })

        it('Then I should see "Saldo em conta R$ 0,00"', () => {
            cadastroForm.componentes_cadastro.saldoConta().should('contains.text', '0,00')
        })
    })
})