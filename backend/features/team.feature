Feature: Create a team
  In order to create a new team of my data stored on the database
  As a registered user
  I want to be able to create a new team from the application

    Scenario: Create a new team
      When I create a new team with details:
        | name | example team              |
        | sport    | indoorfootball |
        | startdate | 2020-07-20 |
        | enddate   | 2020-10-31 |
      Then the team is created successfully, the team sport should be "Futsal masculino"