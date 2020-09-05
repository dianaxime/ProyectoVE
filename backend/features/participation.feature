Feature: Create a participation
  In order to create a new participation of my data stored on the database
  As a registered user
  I want to be able to create a new participation from the application

    Scenario: Create a new participation
      When I create a new participation with details:
        | userid | 1  |
        | idw    | 45 |
        | startdate | 2020-07-20 |
        | enddate   | 2020-10-31 |
      Then the participation is created successfully, the userid should be "1"