import { cadastroLocators } from "../locators/cadastroLocators"
const { env } = require('../../support/env-dinamico')

export function fluxoCadastroContaComSucesso() {
    cy.visit('/')
    cadastroLocators.registrarBnt().click()
    cy.get(cadastroLocators.emailInput).type(env.email, { force: true })
    cy.get(cadastroLocators.nomeInput).type(env.nome, { force: true })
    cy.get(cadastroLocators.senhaInput).type(env.senha, { force: true })
    cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha, { force: true })
    cadastroLocators.contaSaldoBnt().click({force: true})
    cadastroLocators.cadastrarBnt().click({force: true})
    cadastroLocators.fecharBnt().click()
}

export function fluxoCadastroContaComSucesso2() {
    cy.visit('/')
    cadastroLocators.registrarBnt().click()
    cy.get(cadastroLocators.emailInput).type(env.email2, { force: true })
    cy.get(cadastroLocators.nomeInput).type(env.nome2, { force: true })
    cy.get(cadastroLocators.senhaInput).type(env.senha2, { force: true })
    cy.get(cadastroLocators.confirmaSenhaInput).type(env.senha2, { force: true })
    cadastroLocators.contaSaldoBnt().click({force: true})
    cadastroLocators.cadastrarBnt().click({force: true})
    cy.numeroDaConta(); // executa o comando customizado
    cadastroLocators.fecharBnt().click()
}