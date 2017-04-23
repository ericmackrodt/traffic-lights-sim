(() => {
    QUnit.module('Simulator');

    QUnit.test('should throw exception if instantiated without an intersection', (assert) => {
        assert.throws(
            () => new Simulator(),
            new Error('A simulations cannot be instantiated without an intersection')
        );
    });

    QUnit.test('should be instantiated with an intersection', (assert) => {
        const intersection = new Intersection(new Light('N', true));
        const sut = new Simulator(intersection);
        assert.ok(sut.intersection === intersection);
    });

    QUnit.test('should be instantiated with red as the current color', (assert) => {
        const intersection = new Intersection(new Light('N', true));
        const sut = new Simulator(intersection);
        assert.ok(sut.currentColor.color === constants.colors.RED);
    });
}) ();

(() => {
    QUnit.module('Simulator.updateSimulation');

    let light1;
    let light2;
    let intersection;
    let sut;
    let pubsub;

    QUnit.testStart(() => {
        // Make the duration of all colors 0;
        constants.colorSettings.forEach(s => s.duration = 0);
        light1 = new Light('N', true);
        light2 = new Light('E', false);
        intersection = new Intersection(light1, light2);
        pubsub = new Pubsub();
        sut = new Simulator(intersection, pubsub);
    });

    QUnit.test('should change active light to green', (assert) => {
        sut.updateSimulation();

        assert.ok(light1.color === constants.colors.GREEN);
        assert.ok(light2.color === constants.colors.RED);
        assert.ok(sut.currentColor.color === constants.colors.GREEN);
    });

    QUnit.test('should cycle active light from green to yellow', (assert) => {
        sut.updateSimulation(); // Will be green
        sut.updateSimulation(); // Will be yellow

        assert.ok(light1.color === constants.colors.YELLOW);
        assert.ok(light2.color === constants.colors.RED);
        assert.ok(sut.currentColor.color === constants.colors.YELLOW);
    });

    QUnit.test('should cycle active light from yellow to red', (assert) => {
        sut.updateSimulation(); // Will be green
        sut.updateSimulation(); // Will be yellow
        sut.updateSimulation(); // Will be red

        assert.ok(light1.color === constants.colors.RED);
        assert.ok(light2.color === constants.colors.RED);
        assert.ok(sut.currentColor.color === constants.colors.RED);
    });

    QUnit.test('should activate previously red lights and make them green', (assert) => {
        sut.updateSimulation(); // Will be green
        sut.updateSimulation(); // Will be yellow
        sut.updateSimulation(); // Will be red
        sut.updateSimulation(); // Will activate previous and be green

        assert.ok(light1.color === constants.colors.RED);
        assert.ok(light1.active === false);
        assert.ok(light2.color === constants.colors.GREEN);
        assert.ok(light2.active === true);
        assert.ok(sut.currentColor.color === constants.colors.GREEN);
    });

    QUnit.test('should fire intersection event when changing light', (assert) => {
        pubsub.subscribe('intersection', (data) => assert.ok(data === intersection));
        sut.updateSimulation();
    });

    QUnit.test('should fire a tick event when updating the simulation', (assert) => {
        let tickData;
        pubsub.subscribe('tick', (data) => tickData = data);
        sut.updateSimulation();

        assert.ok(tickData.tick === 0);
        assert.ok(tickData.currentColor === constants.colors.GREEN);
    });
}) ();