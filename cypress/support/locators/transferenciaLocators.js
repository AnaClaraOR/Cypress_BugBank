export const transferenciaLocators = {
    transferenciaBnt: () => cy.get('#btn-TRANSFERÊNCIA'),
    numeroContaField: '.input__default[name="accountNumber"]',
    digitoContaField: '.input__default[name="digit"]',
    valorTransferenciaField: '.input__default[name="transferValue"]',
    descricaoField: '.input__default[name="description"]',
    transferirBnt: () => cy.get('.CMabB[type="submit"]'),
    voltarBnt: () => cy.get('#btnBack'),
    saldoContaHome: '#textBalance',
    alertaConta: '#modalText',
    sairBnt: () => cy.get('#btnExit')
};
