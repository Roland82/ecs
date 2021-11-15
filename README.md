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
- Since we are dependent on a 3rd party API there's every chance it could go down. If this was a proper production application and depending on requirements, I would want to at least create a different table for car makes which would mean maybe not having to call the service every time a new car was created and only if a new make was passed to us. Or you could move this to a background process so that we have a chance to retry when things go wrong either via events or a cron job.
