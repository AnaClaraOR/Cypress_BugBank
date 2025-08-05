export const transferenciaLocators = {
    // acessarBnt: () => cy.get('.otUnI'),
    // alertObrigatorio: () => cy.get('.input__warging'),
    // emailInput: '.card__login [name="email"]',
    // senhaInput: '.card__login [name="password"]',
    // alertUserInvalido: () => cy.get('.styles__ContainerInformations-sc-8zteav-3'),
    // textHomePage: () => cy.get('.home__ContainerInfos-sc-1auj767-4')

    transferenciaBnt: () => cy.get('#btn-TRANSFERÊNCIA'),
    numeroContaField: '.input__default[name="accountNumber"]',
    digitoContaField: '.input__default[name="digit"]',
    valorTransferenciaField: '.input__default[name="transferValue"]',
    descricaoField: '.input__default[name="description"]',
    transferirBnt: () => cy.get('.CMabB[type="submit"]'),
    voltarBnt: () => cy.get('#btnBack'),
    saldoContaHome: () => cy.get('#textBalance > span'),
};
