Feature: Tranferência

        Given I have registered and am logged in

    Scenario: Só é permitido transferência para contas válidas
        When I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Transferencia realizada com sucesso"
        And click Fechar button

    Scenario: Só é permitido transferência quando saldo é igual ou maior que valor para transferir
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Você não tem saldo suficiente para essa transação"
        And click Fechar button

    Scenario: Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter invalid account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Conta inválida ou inexistente"
        And click Fechar button

    Scenario: Número e digito da conta aceitam apenas números
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter invalid account number with letter in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Conta inválida ou inexistente"
        And click Fechar button

    Scenario: Campo descrição é um campo de preenchimento obrigatório
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description empty in "Descrição" field
        And I click in "Transferir agora" button
        And And I should see the mensage "É campo obrigatório"
        And click Fechar button

    Scenario: Valor de transferência não pode ser igual ou menor que zero
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I should not see the balance amount is equal or less than zero
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Valor da transferência não pode ser 0 ou negativo"
        And click Fechar button

    Scenario: Ao realizar transferência com sucesso deve ser debitado o valor da conta e exibir a mensagem de "Transferência realizada com sucesso"
        When I click in voltar button
        And I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And click Fechar button
        And I click in voltar button
        And I checks if the amount was debited from the opening balance

    Scenario: Ao realizar uma transferência com sucesso deve ser redirecionado para o extrato
        When I click in TRANSFERÊNCIA button
        Then I enter account number in "Número da conta" field
        And I enter digit in "Dígito" field
        And I enter value in "Valor da transferência" field
        And I enter description in "Descrição" field
        And I click in "Transferir agora" button
        And I should see the mensage "Transferência realizada com sucesso"
        And click Fechar button
        And I go extrato page