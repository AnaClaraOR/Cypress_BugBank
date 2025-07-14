import { cadastroForm, input_registro, input_registro_conta_2 } from "../Pages/cadastro_page"
import { extratoForm } from "../Pages/extrato_page"
import { loginForm } from "../Pages/login_page"
import { transferenciaForm, input_transferencia } from "../Pages/transferencia_page"

describe('Extrato', () => {

    before('Given I have registered and am logged in', () => {
        cy.visit('/')
        cadastroForm.clickRegistrar()
        cadastroForm.typeEmailRegister(input_registro.email)
        cadastroForm.typeNomeRegister(input_registro.nome)
        cadastroForm.typeSenhaRegister(input_registro.senha)
        cadastroForm.typeConfirmaSenha(input_registro.senha)
        cadastroForm.clickContaSaldo()
        cy.wait(2000)
        cadastroForm.clickCadastrar()
        cadastroForm.clickFechar()
        cy.visit('/')
        cadastroForm.clickRegistrar()
        cadastroForm.typeEmailRegister(input_registro_conta_2.email2)
        cadastroForm.typeNomeRegister(input_registro_conta_2.nome2)
        cadastroForm.typeSenhaRegister(input_registro_conta_2.senha2)
        cadastroForm.typeConfirmaSenha(input_registro_conta_2.senha2)
        cadastroForm.clickCadastrar()
        cadastroForm.numeroDaConta()
        cadastroForm.clickFechar()
        loginForm.typeEmail(input_registro.email)
        loginForm.typeSenha(input_registro.senha)
        loginForm.clickAcessar()
        transferenciaForm.clickTransferencia()
        transferenciaForm.typeNumeroConta(cadastroForm.contaRecebedor.numeroConta)
        transferenciaForm.typeDigitoConta(cadastroForm.contaRecebedor.digitoConta)
        transferenciaForm.typeValorTransferencia(input_transferencia.valor)
        transferenciaForm.clickTransferir()
        cadastroForm.clickFechar()
        transferenciaForm.clickVoltar()
    })

    describe('Deve exibir o saldo disponível no momento', () => {
        it('When I click in EXTRATO button', () => {
            extratoForm.clickExtrato()
        })

        it('Then I should see "Saldo disponível"', () => {
            extratoForm.componentes_extrato.saldoDisponivel().should('contains.text', 'Saldo disponível')
        })
    })

    describe('Cada transação deve exibir data que foi realizada, tipo da transação (Abertura de conta / Transferência enviada / Transferência recebida)- Quando valor for de saida da conta deve estar em vermelho e iniciar com o sinal de menos/negativo(-)', () => {
        it('Then I should see transaction date', () => {
            extratoForm.componentes_extrato.dataTransacao().invoke('text')
                .should((text) => {
                    expect(text.trim()).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // exemplo: 13/07/2025
                });
        })

        it('And I should see transaction type (Abertura de conta / Transferência enviada / Transferência recebida)', () => {
            extratoForm.componentes_extrato.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência enviada', 'Transferência recebida']);
                });
        })

        it('And I should see the value in red color and negative simbol', () => {
            extratoForm.componentes_extrato.valorExtrato().contains('-').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('Quando valor for de entrada na conta deve estar em verde', () => {
        it('When I should see the value not negative, the value should be green', () => {
            extratoForm.componentes_extrato.tipoTransacao().invoke('text')
                .should((text) => {
                    expect(text).to.include.oneOf(['Abertura de conta', 'Transferência recebida']);
                });
            // verifica que o valor seja verde
            extratoForm.componentes_extrato.valorExtrato().should('have.css', 'color', 'rgb(0, 128, 0)');
        })
    })

    describe('Transações sem comentário devem exibir (-)', () => {
        it('Then I should see in description "-"', () => {
            extratoForm.componentes_extrato.descricaoExtrato().invoke('text')
                .then((text) => {
                    if (text.trim() === '') {
                        extratoForm.componentes_extrato.descricaoExtrato().should('have.text', '-');
                    } else {
                        extratoForm.componentes_extrato.descricaoExtrato().should('not.have.text', '-');
                    }
                });
        })
    })
})