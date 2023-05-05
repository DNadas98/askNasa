# Ask NASA
- The page can fetch data from the [Astronomy Picture of the Day](https://github.com/nasa/apod-api) open api of NASA.
- Frontend: One of my coding bootcamp projects
- Backend: My minimal no framework Node.js server

## My Node.js server

https://github.com/DNadas98/node_server

## Install & run

- npm i
- run from the root directory
- node backend/server.js or npm run dev

## Request filtering
- By default all queries are removed from the request url
- The request body is cleared (`req.body={}`)
- Cookie and other unneeded headers are deleted from the request header
- To remove or modify these, see backend/server.js

## File structure

- backend
  - server.js
  - logs
  - middleware
- frontend
  - public
    - css
    - data
    - img
    - js
  - views
    - subdir
