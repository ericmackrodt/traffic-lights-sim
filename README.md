# Traffic lights simulator

Description
-----------

Simulates an intersection with four traffic lights (N, S, E, W). It cycles though lights in a 5 minute period until they are red and makes the ones that were previously red green again.

Approach/Assumptions
--------------------

- All four traffic lights (N, S, W, E) are treated separately, this allows the possibility of more lights (like pedestrian lights) to be added if needed.
- Before the next set of lights becomes green, all lights are briefly red as for safety reasons, that behavior can easily be changed by uncommenting one line of code.
- The simulation processes only one intersection but changing the code to allow multiple intersections to be processed wouldn't be too dificult.
- The code was written in Vanilla JS making use of es6 classes, I'm aware that there are many different approaches that could've been used to write the solution.
- No third-party libraries were used except for QUnit for the unit tests.
- The UI is very simple, just a set of predefined divs and spans that represents the traffic lights, if we had more traffic lights maybe we would have to start thinking about using templates for the intersections or something along those lines.
- The constants file `consts.js` was written using the revealing module pattern, I would probably have changed the approach there a little bit if I was using Node, Weback, Browserify or something else that allowed me to make use of es6-modules or CommonJS.
- The `uiController.js` file is just a simple class to handle the UI, it references the elements in the index.html and is responsible for updating them.
- The screen is updated using the publish-subscribe pattern (`pubsub.js`), when the intersection is updated, an event is published and the uiController updates the UI based on that. 
- The entry point of the `app.js` and it's responsible for instantiating the simulation and injecting all the necessary dependencies for the code to run in the browser.
- Tests were written for all functionality, the only files that weren't covered were the `uiController.js` because it depends on the `index.html` and the `app.js` because it doesn't have any functionality besides instantiating everything.
- Making the code work on `Node` shouldn't be difficult, the only requirements would be to add the `module.exports`/`exports` and the `require` function in the right places. That would also allow the use of build tools like Browserify or Webpack.
- The code was written only with the latest versions of Chrome and Opera in mind.

Requirements to run the code
----------------------------

- Chrome 58 or newer / Opera 43 or newer

Getting started
---------------

Clone the repository

    $ git clone https://github.com/ericmackrodt/traffic-lights-sim.git

Open `index.html` in your browser.

For the tests open `tests.html` in your browser.

Output
------

Small UI (index.html)

![alt tag](https://raw.githubusercontent.com/ericmackrodt/traffic-lights-sim/master/Screenshot.PNG)

Console logs for a 30 minute period:

    [Sun Apr 23 2017 17:42:58 GMT+1000 (AUS Eastern Standard Time)] - north: green, south: green, west: red, east: red
    [Sun Apr 23 2017 17:47:29 GMT+1000 (AUS Eastern Standard Time)] - north: yellow, south: yellow, west: red, east: red
    [Sun Apr 23 2017 17:48:00 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 17:48:01 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: green, east: green
    [Sun Apr 23 2017 17:52:32 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: yellow, east: yellow
    [Sun Apr 23 2017 17:53:03 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 17:53:04 GMT+1000 (AUS Eastern Standard Time)] - north: green, south: green, west: red, east: red
    [Sun Apr 23 2017 17:57:35 GMT+1000 (AUS Eastern Standard Time)] - north: yellow, south: yellow, west: red, east: red
    [Sun Apr 23 2017 17:58:06 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 17:58:07 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: green, east: green
    [Sun Apr 23 2017 18:02:38 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: yellow, east: yellow
    [Sun Apr 23 2017 18:03:09 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 18:03:10 GMT+1000 (AUS Eastern Standard Time)] - north: green, south: green, west: red, east: red
    [Sun Apr 23 2017 18:07:41 GMT+1000 (AUS Eastern Standard Time)] - north: yellow, south: yellow, west: red, east: red
    [Sun Apr 23 2017 18:08:12 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 18:08:13 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: green, east: green
    [Sun Apr 23 2017 18:12:44 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: yellow, east: yellow
    [Sun Apr 23 2017 18:13:15 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 18:13:16 GMT+1000 (AUS Eastern Standard Time)] - north: green, south: green, west: red, east: red
    [Sun Apr 23 2017 18:17:47 GMT+1000 (AUS Eastern Standard Time)] - north: yellow, south: yellow, west: red, east: red
    [Sun Apr 23 2017 18:18:18 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 18:18:19 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: green, east: green
    [Sun Apr 23 2017 18:22:50 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: yellow, east: yellow
    [Sun Apr 23 2017 18:23:21 GMT+1000 (AUS Eastern Standard Time)] - north: red, south: red, west: red, east: red
    [Sun Apr 23 2017 18:23:22 GMT+1000 (AUS Eastern Standard Time)] - north: green, south: green, west: red, east: red

Logs Screenshot:

![alt tag](https://raw.githubusercontent.com/ericmackrodt/traffic-lights-sim/master/logs.PNG)

Thank you for the opportunity!