import { faker } from '@faker-js/faker'

class LoginForm {
    elements = {
        acessarBnt: () => cy.get('.otUnI'),
        alertObrigatorio: () => cy.get('.input__warging'),
        emailInput: () => cy.get('.card__login [name="email"]'),
        senhaInput: () => cy.get('.card__login [name="password"]'),
        userInvalido: () => cy.get('.styles__ContainerInformations-sc-8zteav-3'),
        homePage: () => cy.get('.home__ContainerInfos-sc-1auj767-4')
    }

    clickAcessar() {
        this.elements.acessarBnt().click({ force: true })
    }
    typeEmail(text) {
        if (!text) return;
        this.elements.emailInput().type(text)
    }
    typeSenha(text) {
        if (!text) return;
        this.elements.senhaInput().type(text)
    }
}

export const loginForm = new LoginForm()

export const input_valida = {
    email: 'teste@email.com',
    senha: '12345'
}

export const input_login = {
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 5 })
}