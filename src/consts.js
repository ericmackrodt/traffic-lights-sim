// Support constants.
// If we had support to commonjs or es6 imports via node, webpack or browserify
// I probably woudn't have used the revealing pattern here.

const constants = (() => {
    // Intersection loop interval. 1000 = 1s, adjust How fast the program should run.
    const INTERSECTION_INTERVAL = 1000;

    // Constants for colors
    const colors = {
        RED: 'red',
        GREEN: 'green',
        YELLOW: 'yellow'
    };

    // Light Cardinals
    const compass = {
        NORTH: 'north',
        SOUTH: 'south',
        EAST: 'east',
        WEST: 'west'
    };

    // Configuration for the lights
    const colorSettings = [
        { 
            color: colors.GREEN, 
            duration: 270, 
            next: colors.YELLOW, 
            active: false
        },
        { 
            color: colors.YELLOW,
            duration: 30, 
            next: colors.RED, 
            activate: false
        },
        { 
            color: colors.RED, 
            duration: 0, 
            next: colors.GREEN, 
            activate: true
        }
    ];

    return {
        INTERSECTION_INTERVAL,
        colors,
        compass,
        colorSettings
    };
}) ();