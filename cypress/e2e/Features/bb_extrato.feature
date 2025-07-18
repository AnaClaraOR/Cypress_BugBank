Feature: Extrato

Given I have registered and am logged in and made a transfer

    Scenario: Deve exibir o saldo disponível no momento
        When I click in EXTRATO button
        Then I should see "Saldo disponível"

    Scenario: Cada transação deve exibir data que foi realizada, tipo da transação (Abertura de conta / Transferência enviada / Transferência recebida)- Quando valor for de saida da conta deve estar em vermelho e iniciar com o sinal de menos/negativo(-)
        Then I should see transaction date
        And I should see transaction type (Abertura de conta / Transferência enviada / Transferência recebida)
        And I should see the value in red color and negative simbol

    Scenario: Quando valor for de entrada na conta deve estar em verde
        When I should see the value not negative, the value should be green

    Scenario: Transações sem comentário devem exibir (-)
        Then I should see in description "-"