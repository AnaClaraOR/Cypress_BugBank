import { fluxoCadastroContaComSucesso2 } from "../../support/testSuites/funcoesReutilizaveis"
import { fluxoCadastroContaComSucesso } from "../../support/testSuites/funcoesReutilizaveis"
import { loginLocators } from "../../support/locators/loginLocators"
import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
import { cadastroLocators } from "../../support/locators/cadastroLocators"
import { extratoLocators } from "../../support/locators/extratoLocators"
const { env } = require('../../support/env-dinamico')

describe('Extrato', () => {

    before('Dado que me registrei e estou logado', () => {
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
        it('Então devo ver "Saldo disponível"', () => {
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
        it('Então eu deveria ver a data da transação', () => {
            extratoLocators.dataTransacao().invoke('text')
                .should((text) => {
                    expect(text.trim()).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // exemplo: 13/07/2025
                });
        })

        it('E devo ver o tipo de transação (Abertura de conta / Transferência enviada / Transferência recebida)', () => {
            extratoLocators.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência enviada', 'Transferência recebida']);
                });
        })

        it('E eu deveria ver o valor na cor vermelha e símbolo negativo', () => {
            extratoLocators.valorExtrato().contains('-').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('Quando valor for de entrada na conta deve estar em verde', () => {
        it('Quando eu deveria ver o valor não negativo, o valor deveria ser verde', () => {
            extratoLocators.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência recebida']);
                });
            // verifica que o valor seja verde
            extratoLocators.valorExtrato().should('have.css', 'color', 'rgb(0, 128, 0)');
        })
    })

    describe('Transações sem comentário devem exibir (-)', () => {
        it('Então eu deveria ver na descrição "-"', () => {
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