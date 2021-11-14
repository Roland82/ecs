ECS Test

## Bootstrapping

- run `yarn install`
- Install Postgres
- Create database called `ecs_cars`
- Run database migration to create table `yarn db:migrate`

### To Run Tests

`yarn test`

### To Run App

`yarn start`

# Notes:

- TDD approach is outside in. This allows me to refactor implementation details without having to worry about breaking the actual requirements
- Some of the production code is not quite as neat as I would like. If this was a production level project then things like prettier/linting would be in order and perhaps a little more code organisation.
- Since we are dependent on a 3rd party API theres every chance it could go down. If this was a proper production application and depending on requirements, I would want to at least create a different table for car makes which would mean maybe not having to call the service every time a new car was created and only if a new make was passed to us.
