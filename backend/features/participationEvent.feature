Feature: Create a event participation
  In order to create a new event participation of my data stored on the database
  As a registered user
  I want to be able to create a new event participation from the application

    Scenario: Create a new event participation
      When I create a new event participation with details:
        | userid | 1  |
        | idEvent  | 1  |
        | hours | 2.75 |
      Then the event participation is created successfully, the userid should be "1"