Feature: Create a workshop
  In order to create a new workshop of my data stored on the database
  As a registered user
  I want to be able to create a new workshop from the application

    Scenario: Create a new workshop
      When I create a new workshop with details:
        | name | example               |
        | description    | example description |
        | classroom | A-102    |
        | startdate | 2020-07-20 |
        | enddate   | 2020-10-31 |
      Then the workshop is created successfully, the workshop description should be "example description"