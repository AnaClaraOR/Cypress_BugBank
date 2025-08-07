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
const { env } = require('../support/env-dinamico')

//Comando customizavel para a coleta do número da conta
Cypress.Commands.add('numeroDaConta', () => {
    cy.get(transferenciaLocators.alertaConta)
        .invoke('text')
        .then((text) => {
            const match = text.match(/(\d+)-(\d+)/);
            const [_, numeroConta, digitoConta] = match;

            Cypress.env('numeroConta', numeroConta);
            cy.log(`numeroConta: ${numeroConta}`);
            Cypress.env('digitoConta', digitoConta);
            cy.log(`digitoConta: ${digitoConta}`);
        });
});

Cypress.Commands.add('saldo', () => {
    cy.get(transferenciaLocators.saldoContaHome)
        .invoke('text')
        .then((text) => {
            const saldoContaHome = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));

            return saldoContaHome;
        });
});

Cypress.Commands.add('fluxoTransferenciaComSucesso', () => {
    transferenciaLocators.transferenciaBnt().click();

    const numeroConta = Cypress.env('numeroConta');
    const digitoConta = Cypress.env('digitoConta');
    cy.get(transferenciaLocators.numeroContaField).type(numeroConta);
    cy.get(transferenciaLocators.digitoContaField).type(digitoConta);
    cy.get(transferenciaLocators.valorTransferenciaField).type(env.valorTransferencia);

    transferenciaLocators.transferirBnt().click();
})