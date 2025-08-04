const { faker } = require('@faker-js/faker')

module.exports = {
  env: {
    email: faker.internet.email(),
    nome: faker.person.fullName(),
    senha: faker.internet.password({ length: 5 }),
    confirmaSenhaFaker: faker.internet.password({ length: 4 }),
    email2: faker.internet.email(),
    nome2: faker.person.fullName(),
    senha2: faker.internet.password({ length: 5 })
  }
}