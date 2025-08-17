const { faker } = require('@faker-js/faker')

module.exports = {
  env: {
    valorTransferencia: faker.finance.amount({ min: 1, max: 1500, dec: 2 }),
    descricao: faker.word.words(),
    numConta: faker.finance.accountNumber(),
    numDigitoConta: faker.finance.accountNumber(1),
    valorMenor: faker.finance.amount({ min: -100, max: 0, dec: 2 }),
    numContaInvalida: faker.string.alphanumeric(5),
    numDigitoContaInvalida: faker.string.alphanumeric(2),

    usuario: {
      email: faker.internet.email(),
      nome: faker.person.fullName(),
      senha: faker.internet.password({ length: 5 }),
      confirmaSenhaFaker: faker.internet.password({ length: 4 })
    },

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