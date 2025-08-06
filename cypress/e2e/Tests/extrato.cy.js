import { fluxoCadastroContaComSucesso2 } from "../../support/testSuites/funcoesReutilizaveis"
import { cadastroForm } from "../Pages/cadastro_page"
import { extratoForm } from "../Pages/extrato_page"
import { loginForm } from "../Pages/login_page"
import { transferenciaForm, input_transferencia } from "../Pages/transferencia_page"
import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { loginLocators } from "../../support/locators/loginLocators"
import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
import { cadastroLocators } from "../../support/locators/cadastroLocators"
import { fluxoTransferenciaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { extratoLocators } from "../../support/locators/extratoLocators"
const { env } = require('../../support/env-dinamico')

describe('Extrato', () => {

    before('Given I have registered and am logged in', () => {
        fluxoCadastroContaComSucesso();
        fluxoCadastroContaComSucesso2();
        cy.get(loginLocators.emailInput).type(env.email, { force: true })
        cy.get(loginLocators.senhaInput).type(env.senha, { force: true })
        loginLocators.acessarBnt().click()
        cy.fluxoTransferenciaComSucesso();
        cadastroLocators.fecharBnt().click()
        transferenciaLocators.voltarBnt().click()
    })

    describe('Deve exibir o saldo disponível no momento', () => {
        it('Then I should see "Saldo disponível"', () => {
            cy.get(transferenciaLocators.saldoContaHome).invoke('text')
                .then((text) => {
                    const saldoHome = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));
                    cy.wrap(saldoHome).as('saldoHome');
                    extratoLocators.extratoBnt().click()
                });

            extratoLocators.dataTransacao().should('be.visible')
                .then((text) => {
                    extratoLocators.saldoExtrato().invoke('text')
                        .then((text) => {
                            const saldoDisponivel = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));
                            cy.wrap(saldoDisponivel).as('saldoDisponivel');
                            cy.log(`Saldo Extrato: ${saldoDisponivel}`);
                        });
                });

            cy.get('@saldoDisponivel').then((saldoDisponivel) => {
                cy.get('@saldoHome').then((saldoHome) => {
                    expect(saldoDisponivel).to.equal(saldoHome);
                });
            });
        })
    })

    describe('Cada transação deve exibir data que foi realizada, tipo da transação (Abertura de conta / Transferência enviada / Transferência recebida)- Quando valor for de saida da conta deve estar em vermelho e iniciar com o sinal de menos/negativo(-)', () => {
        it('Then I should see transaction date', () => {
            // extratoForm.componentes_extrato.dataTransacao().invoke('text')
            //     .should((text) => {
            //         expect(text.trim()).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // exemplo: 13/07/2025
            //     });
            extratoLocators.dataTransacao().invoke('text')
                .should((text) => {
                    expect(text.trim()).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // exemplo: 13/07/2025
                });
        })

        it('And I should see transaction type (Abertura de conta / Transferência enviada / Transferência recebida)', () => {
            extratoLocators.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência enviada', 'Transferência recebida']);
                });
        })

        it('And I should see the value in red color and negative simbol', () => {
            extratoLocators.valorExtrato().contains('-').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('Quando valor for de entrada na conta deve estar em verde', () => {
        it('When I should see the value not negative, the value should be green', () => {
            extratoLocators.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência recebida']);
                });
            // verifica que o valor seja verde
            extratoLocators.valorExtrato().should('have.css', 'color', 'rgb(0, 128, 0)');
        })
    })

    describe('Transações sem comentário devem exibir (-)', () => {
        it('Then I should see in description "-"', () => {
            // extratoForm.componentes_extrato.descricaoExtrato().invoke('text')
            //     .then((text) => {
            //         if (text.trim() === '') {
            //             extratoForm.componentes_extrato.descricaoExtrato().should('have.text', '-');
            //         } else {
            //             extratoForm.componentes_extrato.descricaoExtrato().should('not.have.text', '-');
            //         }
            //     });
            extratoLocators.descricaoExtrato().invoke('text')
                .then((text) => {
                    if (text.trim() === '') {
                        extratoLocators.descricaoExtrato().should('have.text', '-');
                    } else {
                        extratoLocators.descricaoExtrato().should('not.have.text', '-');
                    }
                });
        })
    })
})