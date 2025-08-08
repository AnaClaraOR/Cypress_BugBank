const { faker } = require('@faker-js/faker')

module.exports = {
  env: {
    email: faker.internet.email(),
    nome: faker.person.fullName(),
    senha: faker.internet.password({ length: 5 }),
    confirmaSenhaFaker: faker.internet.password({ length: 4 }),

    valorTransferencia: faker.finance.amount({ min: 1, max: 200, dec: 2 }),
    descricao: faker.word.words(),
    numConta: faker.finance.accountNumber(),
    numDigitoConta: faker.finance.accountNumber(1),
    valorMenor: faker.finance.amount({ min: 0, max: 3, dec: 2, symbol: '-' }),
    valorMaior: faker.finance.amount({ min: 1000, max: 2000, dec: 2 }),
    numContaInvalida: faker.string.alphanumeric(5),
    numDigitoContaInvalida: faker.string.alphanumeric(2),

    usuario1: {
      email: faker.internet.email(),
      nome: faker.person.fullName(),
      senha: faker.internet.password({ length: 5 }),
    },
    usuario2: {
      email: faker.internet.email(),
      nome: faker.person.fullName(),
      senha: faker.internet.password({ length: 5 }),
    }
  }
}