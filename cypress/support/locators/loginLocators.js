export const loginLocators = {
    acessarBnt: () => cy.get('.otUnI'),
    alertObrigatorio: () => cy.get('.input__warging'),
    emailInput: '.card__login [name="email"]',
    senhaInput: '.card__login [name="password"]',
    alertUserInvalido: () => cy.get('.styles__ContainerInformations-sc-8zteav-3'),
    textHomePage: () => cy.get('.home__ContainerInfos-sc-1auj767-4')
};
