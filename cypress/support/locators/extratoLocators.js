export const extratoLocators = {
    extratoBnt: () => cy.get('#btn-EXTRATO'),
    saldoDisponivel: () => cy.get('.dntobx'),
    valorExtrato: () => cy.get('.fCYQeb #textTransferValue'),
    descricaoExtrato: () => cy.get('#textDescription'),
    dataTransacao: () => cy.get('#textDateTransaction'),
    tipoTransacao: () => cy.get('#textTypeTransaction'),
    saldoExtrato: () => cy.get('#textBalanceAvailable')
};
