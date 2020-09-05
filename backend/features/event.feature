Feature: Create a event
  In order to create a new event of my data stored on the database
  As a registered user
  I want to be able to create a new event from the application

    Scenario: Create a new event
      When I create a new event with details:
        | name | example event |
        | classroom | A-102 |
        | description | example event description |
        | date   | 2020-10-31 |
      Then the event is created successfully, the event description should be "example event description"