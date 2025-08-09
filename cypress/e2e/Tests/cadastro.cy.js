const { env } = require('../../support/env-dinamico')
import { cadastroLocators } from '../../support/locators/cadastroLocators';

describe('Cadastro de usuário', () => {

    beforeEach(() => {
        cy.clearAllLocalStorage()
        cy.visit('/')
    })

    //-----------------CENÁRIO 1----------------------
    it('Os campos Nome, Email, Senha e Confirmação de senha são de preenchimento obrigatório', () => {
        cadastroLocators.registrarBnt().click()
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.alertObrigatorio().should('contains.text', 'É campo obrigatório')
    })

    //-----------------CENÁRIO 2----------------------
    it('Tentativa de cadastro sem preencher NOME deve visualizar a mensagem "Nome não pode ser vazio"', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.alert().should('contains.text', 'Nome não pode ser vazio')
    })

    //-----------------CENÁRIO 3----------------------
    it('Tentativa de cadastro sem preencher EMAIL deve visualizar a mensagem "Email não pode ser vazio"', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        /**
         * Dará erro no teste, pois a mensagem do requisito não é apresentada, 
         * ele faz a validação do campo se está vazio ou não e apresenta o 
         * alerta abaixo do campo 'É campo obrigatório'
         */
        //cadastroLocators.alert().should('contains.text', 'Email não pode ser vazio')
    })

    //-----------------CENÁRIO 4----------------------
    it('Tentativa de cadastro sem preencher SENHA deve visualizar a mensagem "Senha não pode ser vazio"', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        /**
         * Dará erro no teste, pois a mensagem do requisito não é apresentada, 
         * ele faz a validação do campo se está vazio ou não e apresenta o 
         * alerta abaixo do campo 'É campo obrigatório'
         */
        //cadastroLocators.alert().should('contains.text', 'Senha não pode ser vazio')
    })

    //-----------------CENÁRIO 5----------------------
    it('Tentativa de cadastro sem preencher CONFIRMAÇÃO SENHA deve visualizar a mensagem "Confirmar senha não pode ser vazio"', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        /**
         * Dará erro no teste, pois a mensagem do requisito não é apresentada, 
         * ele faz a validação do campo se está vazio ou não e apresenta o 
         * alerta abaixo do campo 'É campo obrigatório'
         */
        //cadastroLocators.alert().should('contains.text', 'Confirmar senha não pode ser vazio')
    })

    //-----------------CENÁRIO 6----------------------
    it('Senha e confirmação de senha precisam ser iguais', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.confirmaSenhaFaker, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.alert().should('contains.text', 'As senhas não são iguais.')
    })

    //-----------------CENÁRIO 7----------------------
    it('Cadastrar conta com sucesso deve exibir número da conta criada', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.alert().invoke('text').should('match', /^A conta \d+-\d+ foi criada com sucessoFechar$/)
    })

    //-----------------CENÁRIO 8----------------------
    it('Deixar ativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 1.000,00', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.contaSaldoBnt().click({ force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.fecharBnt().click()
        cy.fluxoLogin(env.usuario);
        cadastroLocators.saldoConta().should('contains.text', "1.000,00")
    })

    //-----------------CENÁRIO 9----------------------
    it('Deixar inativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 0,00', () => {
        cadastroLocators.registrarBnt().click()
        cy.get(cadastroLocators.emailInput).type(env.usuario.email, { force: true })
        cy.get(cadastroLocators.nomeInput).type(env.usuario.nome, { force: true })
        cy.get(cadastroLocators.senhaInput).type(env.usuario.senha, { force: true })
        cy.get(cadastroLocators.confirmaSenhaInput).type(env.usuario.senha, { force: true })
        cadastroLocators.cadastrarBnt().click({ force: true })
        cadastroLocators.fecharBnt().click()
        cy.fluxoLogin(env.usuario);
        cadastroLocators.saldoConta().should('contains.text', '0,00')
    })
})
