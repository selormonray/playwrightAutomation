Feature: Ecommerce Validations

  Scenario: Placing Order
    Given a login to the ecommerce application using "username" and "password"
    When I add "item1" to the cart
    Then I should have heard "hello"