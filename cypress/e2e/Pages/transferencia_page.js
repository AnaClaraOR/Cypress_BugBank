import { faker } from '@faker-js/faker'

class TransferenciaForm {
    saldoConta = {}
    saldoContaFinal
    novoSaldoConta
    componentes_transferencia = {
        transferenciaBnt: () => cy.get('#btn-TRANSFERÊNCIA'),
        numeroContaField: () => cy.get('.input__default[name="accountNumber"]'),
        digitoContaField: () => cy.get('.input__default[name="digit"]'),
        valorTransferenciaField: () => cy.get('.input__default[name="transferValue"]'),
        descricaoField: () => cy.get('.input__default[name="description"]'),
        transferirBnt: () => cy.get('.CMabB[type="submit"]'),
        voltarBnt: () => cy.get('#btnBack'),
        saldoContaHome: () => cy.get('#textBalance > span'),
    }

    clickTransferencia() {
        this.componentes_transferencia.transferenciaBnt().click()
    }
    typeNumeroConta(numeroConta) {
        if (!numeroConta) return;
        this.componentes_transferencia.numeroContaField().type(numeroConta)
    }
    typeDigitoConta(digitoConta) {
        if (!digitoConta) return;
        this.componentes_transferencia.digitoContaField().type(digitoConta)
    }
    typeValorTransferencia(valor) {
        if (!valor) return;
        this.componentes_transferencia.valorTransferenciaField().type(valor)
    }
    typeDescricao(descricao) {
        if (!descricao) return;
        this.componentes_transferencia.descricaoField().type(descricao)
    }
    clickTransferir() {
        this.componentes_transferencia.transferirBnt().click();
    }
    clickVoltar() {
        this.componentes_transferencia.voltarBnt().click()
    }

    saldoInicial() {
        this.componentes_transferencia.saldoContaHome().invoke('text')
            .then((text) => {
                const saldoInicial = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));

                this.saldoConta = saldoInicial;

                cy.log(`Saldo Inicial: ${saldoInicial}`);
            });
    }

    saldoFinal() {
        this.componentes_transferencia.saldoContaHome().invoke('text')
            .then((text) => {
                //obtem o valor do saldo e retira os simbolos 
                const saldoFinal = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.')); 

                this.saldoContaFinal = saldoFinal;
                this.novoSaldoConta = transferenciaForm.saldoConta - input_transferencia.valor

                cy.log(`Saldo Final:`, saldoFinal);
                cy.log(`Saldo final esperado:`, novoSaldoConta);
            });
    }
}

export const transferenciaForm = new TransferenciaForm()

export const input_transferencia = {
    valor: faker.finance.amount({ min: 1, max: 333, dec: 2 }),
    descricao: faker.word.words(),
    numConta: faker.finance.accountNumber(),
    numDigitoConta: faker.finance.accountNumber(1),
    valorMenor: faker.finance.amount({ min: 0, max: 3, dec: 2, symbol: '-' }),
    valorMaior: faker.finance.amount({ min: 1000, max: 2000, dec: 2 }),
    numContaInvalida: faker.string.alphanumeric(5),
    numDigitoContaInvalida: faker.string.alphanumeric(2),
    confirmaSenhaFaker: faker.internet.password({ length: 4 })
}

export const input_vazio = {
    descricao: '',
}