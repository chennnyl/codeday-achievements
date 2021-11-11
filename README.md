# CodeDay Achievements
This project is a full-stack application to give "achievements" to local CodeDay attendees. These achievements are little, goofy challenges to incentivize engagement and collaboration with some good old-fashioned meaningless competition.

## Setup
You'll need Docker and `docker-compose` on your development machine.
Make a folder called `mongo` at the root of the repository (this is where database files will be stored), and run:
`docker-compose build`
`docker-compose up -d`
The frontend site will now be running on `localhost:3000`, and the API is publicly exposed at `localhost:3001/api`.