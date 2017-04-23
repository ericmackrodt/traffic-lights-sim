// App entry point;
(() => {
    // Intersection
    const intersection = new Intersection(
        new Light(constants.compass.NORTH, true),
        new Light(constants.compass.SOUTH, true),
        new Light(constants.compass.WEST, false),
        new Light(constants.compass.EAST, false)
    );

    // Event aggregator
    const pubsub = new Pubsub();

    // Simulator instance
    const simulator = new Simulator(intersection, pubsub);

    // Ui Controller instance
    const uiController = new UiController(simulator, pubsub);
}) ();