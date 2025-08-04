import { cadastroForm } from "../../e2e/Pages/cadastro_page"
const { env } = require('../../support/env-dinamico')

export function fluxoCadastroContaComSucesso() {
    cy.visit('/')
    cadastroForm.clickRegistrar()
    cy.get('.card__register [type="email"]').type(env.email, { force: true })
    cy.get('.card__register [type="name"]').type(env.nome, { force: true })
    cy.get('.card__register [name="password"]').type(env.senha, { force: true })
    cy.get('.card__register [name="passwordConfirmation"]').type(env.senha, { force: true })
    cadastroForm.clickContaSaldo()
    cadastroForm.clickCadastrar()
    cadastroForm.clickFechar()
}

export function fluxoCadastroContaComSucesso2() {
    cy.visit('/')
    cadastroForm.clickRegistrar()
    cy.get('.card__register [type="email"]').type(env.email2, { force: true })
    cy.get('.card__register [type="name"]').type(env.nome2, { force: true })
    cy.get('.card__register [name="password"]').type(env.senha2, { force: true })
    cy.get('.card__register [name="passwordConfirmation"]').type(env.senha2, { force: true })
    cadastroForm.clickContaSaldo()
    cadastroForm.clickCadastrar()
    cadastroForm.numeroDaConta()
    cadastroForm.clickFechar()
}