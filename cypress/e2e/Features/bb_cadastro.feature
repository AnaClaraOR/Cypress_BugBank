Feature: Cadastro de usuário

    Scenario: Os campos Nome, Email, Senha e Confirmação de senha são de preenchimento obrigatório
        Given I am on the login page
        When I click in Registrar button
        And I click in Cadastrar button
        Then I should see the mensage in fields "É campo obrigatório"

    Scenario: Tentativa de cadastro sem preencher NOME deve visualizar a mensagem "Nome não pode ser vazio"
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name empty in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "Nome não pode ser vazio"

    Scenario: Tentativa de cadastro sem preencher EMAIL deve visualizar a mensagem "Email não pode ser vazio"
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address empty in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "Email não pode ser vazio"

    Scenario: Tentativa de cadastro sem preencher SENHA deve visualizar a mensagem "Senha não pode ser vazio"
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address empty in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in empty "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "Senha não pode ser vazio"

    Scenario: Tentativa de cadastro sem preencher CONFIRMAÇÃO SENHA deve visualizar a mensagem "Confirmar senha não pode ser vazio"
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in empty "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "Confirmar senha não pode ser vazio"

    Scenario: Senha e confirmação de senha precisam ser iguais
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter different password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "As senhas não são iguais."

    Scenario: Cadastrar conta com sucesso deve exibir número da conta criada
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "A conta 'xxx' foi criada com sucesso"

    Scenario: Deixar ativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 1.000,00
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click activate in "Criar conta com saldo ?"
        And I click in Cadastrar button
        Then I should see the mensage "A conta 'xxx' foi criada com sucesso"
        When I enter email address in "E-mail" field registered
        And I enter password in "Senha" field registered
        And I click in Acessar button
        Then I should see "Saldo em conta R$ '1.000,00'"

    Scenario: Deixar inativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 0,00
        Given I am on the login page
        When I click in Registrar button
        Then I enter email address in "E-mail" field
        And I enter name in "Nome" field
        And I enter password in "Senha" field
        And I enter password confirmation in "Confirmação Senha" field
        And I click in Cadastrar button
        Then I should see the mensage "A conta 'xxx' foi criada com sucesso"
        And I click in Fechar button
        When I enter email address in "E-mail" field registered
        And I enter password in "Senha" field registered
        And I click in Acessar button
        Then I should see "Saldo em conta R$ '0,00'"
