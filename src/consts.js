// Support constants.
const constants = (() => {
    const INTERSECTION_INTERVAL_MS = 1000;

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
            activate: false
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
        INTERSECTION_INTERVAL_MS,
        colors,
        compass,
        colorSettings
    };
}) ();