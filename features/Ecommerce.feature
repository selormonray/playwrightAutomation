Feature: Ecommerce Validations

  Scenario: Placing Order
    Given a login to the ecommerce application using "selormonray14@gmail.com" and "playwrightTester14"
    When I add "IPHONE 13 PRO" to the cart
    Then Verify "IPHONE 13 PRO" is added to the cart
    When I enter valid details and place order
    Then Verify order is present in the order history page