export const cadastroLocators = {
    registrarBnt: () => cy.get('.ihdmxA'),
    cadastrarBnt: () => cy.get('.card__register [type="submit"]'),
    alertObrigatorio: () => cy.get('.input__warging'),
    emailInput: '.card__register [type="email"]',
    nomeInput: '.card__register [type="name"]',
    senhaInput: '.card__register [name="password"]',
    confirmaSenhaInput: '.card__register [name="passwordConfirmation"]',
    contaSaldoBnt: () => cy.get('.card__register #toggleAddBalance'),
    alert: () => cy.get('.styles__ContainerInformations-sc-8zteav-3'),
    fecharBnt: () => cy.get('#btnCloseModal'),
    saldoConta: () => cy.get('#textBalance')
};
