import { transferenciaLocators } from "../../support/locators/transferenciaLocators"
import { cadastroLocators } from "../../support/locators/cadastroLocators"
import { extratoLocators } from "../../support/locators/extratoLocators"
const { env } = require('../../support/env-dinamico')

describe('Extrato', () => {

    beforeEach('Dado que me registrei e estou logado', () => {
        cy.fluxoCadastro(env.usuario1);
        cy.fluxoCadastro(env.usuario2).then((dadosDaConta) => {
            Cypress.env('numeroConta', dadosDaConta.numeroConta);
            Cypress.env('digitoConta', dadosDaConta.digitoConta);
        })
        cy.fluxoLogin(env.usuario1);

        cy.then(() => {
            const dadosDaTranferencia = {
                numeroConta: Cypress.env('numeroConta'),
                digitoConta: Cypress.env('digitoConta'),
                valorTransferencia: 100,
                descricao: ''
            }
            cy.fluxoTransferencia2(dadosDaTranferencia);
        })

        cadastroLocators.fecharBnt().click()
        transferenciaLocators.voltarBnt().click()
        extratoLocators.extratoBnt().click()
    })

    afterEach(() => {
        transferenciaLocators.sairBnt().click()
    })

    //-----------------CENÁRIO 1----------------------
    it('Deve exibir o saldo disponível no momento', () => {
        cy.get(transferenciaLocators.saldoContaHome).invoke('text')
            .then((text) => {
                const saldoHome = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));
                cy.wrap(saldoHome).as('saldoHome');
            });

        extratoLocators.dataTransacao().should('be.visible')
            .then(() => {
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

    //-----------------CENÁRIO 2----------------------
    it('Cada transação deve exibir data que foi realizada, tipo da transação (Abertura de conta / Transferência enviada / Transferência recebida)', () => {
        extratoLocators.divGeral().each(($el) => {
            cy.wrap($el).within(() => {
                extratoLocators.dataTransacao().invoke('text')
                    .should((text) => {
                        expect(text.trim()).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // exemplo: 13/07/2025
                    });
            })
        })

        extratoLocators.divGeral().each(($el) => {
            cy.wrap($el).within(() => {
                extratoLocators.tipoTransacao().invoke('text')
                    .should((text) => {
                        expect(text).to.include.oneOf(['Abertura de conta', 'Transferência enviada', 'Transferência recebida']);
                    });
            })
        })
    })

    //-----------------CENÁRIO 2.1----------------------
    it('Quando valor for de saida da conta deve estar em vermelho e iniciar com o sinal de menos/negativo(-)', () => {
        extratoLocators.divGeral().contains('Transferência enviada').parents('.fUCxBP').within(() => {
            extratoLocators.valorExtrato().should('contain.text', '-').and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    //-----------------CENÁRIO 3----------------------
    it('Quando valor for de entrada na conta deve estar em verde', () => {
        extratoLocators.divGeral().contains(/Abertura de conta|Transferência recebida/).parents('.fUCxBP').within(() => {
            extratoLocators.valorExtrato().should('have.css', 'color', 'rgb(0, 128, 0)')
        })
    })

    //-----------------CENÁRIO 4----------------------
    it('Transações sem comentário devem exibir (-)', () => {
        //A transferência sem decrição se encontra dentro do beforeEach
        extratoLocators.divGeral().contains('Transferência enviada').parents('.fUCxBP').within(() => {
            extratoLocators.descricaoExtrato().should('have.text', '-');
        })
    });
})
