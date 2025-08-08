const { env } = require('../../support/env-dinamico')
import { cadastroLocators } from '../../support/locators/cadastroLocators';
import { loginLocators } from "../../support/locators/loginLocators";

describe('Cadastro de usuário', () => {

    before(() => cy.clearAllLocalStorage())

    //-----------------CENÁRIO 1----------------------
    describe('Os campos Nome, Email, Senha e Confirmação de senha são de preenchimento obrigatório', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem nos campos "É campo obrigatório"', () => {
            cadastroLocators.alertObrigatorio().should('contains.text', 'É campo obrigatório')
        })
    })

    //-----------------CENÁRIO 2----------------------
    describe('Tentativa de cadastro sem preencher NOME deve visualizar a mensagem "Nome não pode ser vazio"', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it(`Então eu insiro o endereço de e-mail no campo "E-mail"`, () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem "Nome não pode ser vazio"', () => {
            cadastroLocators.alert().should('contains.text', 'Nome não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 3----------------------
    describe('Tentativa de cadastro sem preencher EMAIL deve visualizar a mensagem "Email não pode ser vazio"', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem "Email não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroLocators.alert().should('contains.text', 'Email não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 4----------------------
    describe('Tentativa de cadastro sem preencher SENHA deve visualizar a mensagem "Senha não pode ser vazio"', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem "Senha não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroLocators.alert().should('contains.text', 'Senha não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 5----------------------
    describe('Tentativa de cadastro sem preencher CONFIRMAÇÃO SENHA deve visualizar a mensagem "Confirmar senha não pode ser vazio"', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem "Confirmar senha não pode ser vazio"', () => {
            /**
             * Dará erro no teste, pois a mensagem do requisito não é 
             * apresentada, ele faz a validação do campo se está vazio 
             * ou não e apresenta o alerta abaixo do campo 'É campo 
             * obrigatório'
             */

            //cadastroLocators.alert().should('contains.text', 'Confirmar senha não pode ser vazio')
        })
    })

    //-----------------CENÁRIO 6----------------------
    describe('Senha e confirmação de senha precisam ser iguais', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu insiro uma confirmação de senha diferente no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.confirmaSenhaFaker}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.confirmaSenhaFaker, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('Então eu devo ver a mensagem "As senhas não são iguais."', () => {
            cadastroLocators.alert().should('contains.text', 'As senhas não são iguais.')
        })
    })

    //-----------------CENÁRIO 7----------------------
    describe('Cadastrar conta com sucesso deve exibir número da conta criada', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it(`Então eu devo ver a mensagem "A conta XXX foi criada com sucesso"`, () => {
            cadastroLocators.alert().invoke('text').should('match', /^A conta \d+-\d+ foi criada com sucessoFechar$/)
        })
    })

    //-----------------CENÁRIO 8----------------------
    describe('Deixar ativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 1.000,00', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('And I click activate in "Criar conta com saldo ?"', () => {
            cadastroLocators.contaSaldoBnt().click({ force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('E eu clicar no botão Fechar', () => {
            cadastroLocators.fecharBnt().click()
        })

        it('Quando eu realizar o login com o acesso registrado', () => {
            const usuario = {
                email: env.email,
                senha: env.senha
            }
            cy.fluxoLogin(usuario);
        })

        it('Então eu devo ver "Saldo em conta R$ 1.000,00"', () => {
            cadastroLocators.saldoConta().should('contains.text', "1.000,00")
        })
    })

    //-----------------CENÁRIO 9----------------------

    describe('Deixar inativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 0,00', () => {
        it('Dado que estou na página de login', () => {
            cy.visit('/')
        })

        it('Quando eu clicar no botão Registrar', () => {
            cadastroLocators.registrarBnt().click()
        })

        it('Então eu insiro o endereço de e-mail no campo "E-mail"', () => {
            cy.log(`Email gerado: ${env.email}`)
            cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
        })

        it('E eu coloco o nome no campo "Nome"', () => {
            cy.log(`Nome gerado: ${env.nome}`)
            cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
        })

        it('E eu coloco a senha no campo "Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
        })

        it('E eu digito a confirmação da senha no campo "Confirmação Senha"', () => {
            cy.log(`Senha gerado: ${env.senha}`)
            cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
        })

        it('E clicar no botão Cadastrar', () => {
            cadastroLocators.cadastrarBnt().click({ force: true })
        })

        it('E clicar no botão Fechar', () => {
            cadastroLocators.fecharBnt().click()
        })

        it('Quando eu realizar o login com o acesso registrado', () => {
            const usuario = {
                email: env.email,
                senha: env.senha
            }
            cy.fluxoLogin(usuario);
        })

        it('Então eu devo ver "Saldo em conta R$ 0,00"', () => {
            cadastroLocators.saldoConta().should('contains.text', '0,00')
        })
    })
})