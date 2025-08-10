// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { transferenciaLocators } from "./locators/transferenciaLocators";
import { cadastroLocators } from "./locators/cadastroLocators"
import { loginLocators } from "./locators/loginLocators"
const { env } = require('../support/env-dinamico')

//Comando customizavel para a coleta do número da conta
Cypress.Commands.add('numeroDaConta', () => {
    cy.get(transferenciaLocators.alertaConta)
        .invoke('text')
        .then((text) => {
            const match = text.match(/(\d+)-(\d+)/);
            const [_, numeroConta, digitoConta] = match;

            return {
                numeroConta,
                digitoConta
            }
        });
});

//Comando customizavel para a coleta do saldo da conta
Cypress.Commands.add('saldo', () => {
    cy.get(transferenciaLocators.saldoContaHome)
        .invoke('text')
        .then((text) => {
            const saldoContaHome = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));

            return saldoContaHome;
        });
});

//Comando customizavel para a execução da transferência entre contas
Cypress.Commands.add('fluxoTransferencia', () => {
    transferenciaLocators.transferenciaBnt().click();

    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');
    cy.get(transferenciaLocators.numeroContaField).type(numeroConta);
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta);
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia);

    transferenciaLocators.transferirBnt().click();
})

//Comando customizavel para a execução do cadastro
Cypress.Commands.add('fluxoCadastro', (usuario) => {
    cy.visit('/')
    cadastroLocators.registrarBnt().click()
    cy.get(cadastroLocators.emailInput).type(usuario.email, { force: true })
    cy.get(cadastroLocators.nomeInput).type(usuario.nome, { force: true })
    cy.get(cadastroLocators.senhaInput).type(usuario.senha, { force: true })
    cy.get(cadastroLocators.confirmaSenhaInput).type(usuario.senha, { force: true })
    cadastroLocators.contaSaldoBnt().click({ force: true })
    cadastroLocators.cadastrarBnt().click({ force: true })
    cy.numeroDaConta().then((dadosDaConta) => {
        cy.wrap(dadosDaConta).as('dadosDaConta');
    })
    cadastroLocators.fecharBnt().click()
    cy.get('@dadosDaConta')
})

Cypress.Commands.add('fluxoLogin', (usuario) => {
    cy.visit('/')
    cy.get(loginLocators.emailInput).type(usuario.email, { force: true })
    cy.get(loginLocators.senhaInput).type(usuario.senha, { force: true })
    loginLocators.acessarBnt().click()
})