Feature: Create a tournament
  In order to create a new tournament of my data stored on the database
  As a registered user
  I want to be able to create a new tournament from the application

    Scenario: Create a new tournament
      When I create a new tournament with details:
        | userid | 1  |
        | idt    | 6  |
        | startdate | 2020-07-20 |
        | enddate   | 2020-10-31 |
      Then the tournament is created successfully, the userid should be "1"