/// <reference types="cypress" />

class CadastroForm {
    contaRecebedor = {}

    componentes_cadastro = {
        registroBnt: () => cy.get('.ihdmxA'),
        cadastrarBnt: () => cy.get('.card__register [type="submit"]'),
        alertObrigatorio: () => cy.get('.input__warging'),
        emailInput: () => cy.get('.card__register [type="email"]'),
        nomeInput: () => cy.get('.card__register [type="name"]'),
        senhaInput: () => cy.get('.card__register [name="password"]'),
        confirmaSenha: () => cy.get('.card__register [name="passwordConfirmation"]'),
        contaSaldoBnt: () => cy.get('.card__register #toggleAddBalance'),
        alert: () => cy.get('.styles__ContainerInformations-sc-8zteav-3'),
        fecharBnt: () => cy.get('#btnCloseModal'),
        saldoConta: () => cy.get('#textBalance')
    }

    /**
     * O cypress não identificou os itens do card__register, então foi 
     * necessário utilizar o force em cada chamada.
     * Para não ser utilizado, uma forma seria forçar deixar visível 
     * o card__register com o invoke do css
     * 
     *  showRegister: () => cy.get('.card__register')
     *                  .invoke('css', 'backface-visibility', 'visible')
     */

    clickRegistrar() {
        this.componentes_cadastro.registroBnt().click()
        // this.showRegister()
    }

    clickCadastrar() {
        // Botão "Cadastrar" deve estar visível, utilizando o force
        this.componentes_cadastro.cadastrarBnt().click({ force: true });
    }
    typeEmailRegister(text) {
        if (!text) return;
        this.componentes_cadastro.emailInput().type(text, { force: true })
    }
    typeNomeRegister(text) {
        if (!text) return;
        this.componentes_cadastro.nomeInput().type(text, { force: true })
    }
    typeSenhaRegister(text) {
        if (!text) return;
        this.componentes_cadastro.senhaInput().type(text, { force: true })
    }
    typeConfirmaSenha(text) {
        if (!text) return;
        this.componentes_cadastro.confirmaSenha().type(text, { force: true })
    }
    clickFechar() {
        this.componentes_cadastro.fecharBnt().click();
    }
    clickContaSaldo() {
        this.componentes_cadastro.contaSaldoBnt().click({ force: true })
    }

    numeroDaConta() {
        this.componentes_cadastro.alert().invoke('text')
            .then((text) => {
                const match = text.match(/(\d+)-(\d+)/);
                expect(match).to.not.be.null;
                cy.log(match)
                this.contaRecebedor.numeroConta = match[1];
                this.contaRecebedor.digitoConta = match[2];
            })
    }

}

export const cadastroForm = new CadastroForm()
