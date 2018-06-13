## To run a development version locally

1.  `npm i`
2.  `npm start` - set to run on port 8080 by default - can be changed in webpack.config.js
3.  access the application at http://localhost:8080

## To run the tests

launch a terminal/git bash at the root of the project then enter

* `npm test`

## To Build

npm run build
This will create static html,js,css files inside the 'build' directory.

## TODO

Refactor components for potential reuse.
Unit tests on actions.
Error checking when parsing response.
Search by location name.
Nicer icons.
Weather direction arrow using SVG arc.
Weather summary for each day.
Some deprecation warnings have crept into the npm install - would need to update dependencies.
