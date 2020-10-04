Feature: Create a club
  In order to create a new club of my data stored on the database
  As a registered user
  I want to be able to create a new club from the application

    Scenario: Create a new club
      When I create a new club with details:
        | name | example club              |
        | description    | example club description |
        | type | Club   |
        | startdate | 2020-07-20 |
        | enddate   | 2020-10-31 |
      Then the club is created successfully, the club description should be "example club description"