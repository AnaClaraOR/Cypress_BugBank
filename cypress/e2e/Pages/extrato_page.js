class ExtratoForm {
    saldoExtrato = {}
    componentes_extrato = {
        extratoBnt: () => cy.get('#btn-EXTRATO'),
        saldoDisponivel: () => cy.get('.dntobx'),
        valorExtrato: () => cy.get('.fCYQeb #textTransferValue'),
        descricaoExtrato: () => cy.get('#textDescription'),
        dataTransacao: () => cy.get('#textDateTransaction'),
        tipoTransacao: () => cy.get('#textTypeTransaction'),
        saldoExtrato: () => cy.get('#textBalanceAvailable')
    }

    clickExtrato() {
        this.componentes_extrato.extratoBnt().click()
    }
    
}

export const extratoForm = new ExtratoForm()
