Feature: Login

    Scenario: Email e Senha são campos obrigatórios
        Given I am on the login page
        When I click in Acessar button
        Then I should see the mensage in fields "É campo obrigatório" 

    Scenario: Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos"
        Given I am on the login page
        When I click in Acessar button
        Then I should see the mensage "Usuário e senha precisam ser preenchidos"

    Scenario: Não deve autorizar o acesso para usuários inválidos ou não cadastrados
        Given I am on the login page
        When I enter email address in "E-mail" field not registered
        When I enter password in "Senha" field not registered
        And I click in Acessar button
        And I should see the mensage "Usuário ou senha inválido.Tente novamente ou verifique suas informações!"

    Scenario: Usuários válidos e cadastros são direcionados para a home
        Given that I have registered the username and password
        When I enter email address in "E-mail" field 
        And I enter password in "Senha" field
        And I click in Acessar button
        Then I should be directed to the home page
