Feature: Create a session
  In order to create a new session of my data stored on the database
  As a registered user
  I want to be able to create a new session from the application

    Scenario: Create a new session
      When I create a new session with details:
        | idac |  3   |
        | date   | 2020-11-03 |
      Then the session is created successfully, the session idac should be "3"