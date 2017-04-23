(() => {
    QUnit.module('Intersection');

    QUnit.test('should throw error if instantiated without lights', (assert) => {
        assert.throws(
            () => new Intersection(),
            new Error('Cannot instantiate intersection without lights.')
        );
    });

    QUnit.test('should be instantiated with one light', (assert) => {
        const light = new Light('N', true);
        const sut = new Intersection(light);
        assert.ok(sut.lights.length === 1);
        assert.ok(sut.lights[0] === light);
    });

    QUnit.test('should be instantiated with multiple lights', (assert) => {
        const light1 = new Light('N', true);
        const light2 = new Light('E', false);
        const sut = new Intersection(light1, light2);
        assert.ok(sut.lights.length === 2);
        assert.ok(sut.lights[0] === light1);
        assert.ok(sut.lights[1] === light2);
    });
}) ();

(() => {
    QUnit.module('Intersection.updateActiveLights');

    let light1;
    let light2;
    let sut;

    QUnit.testStart(() => {
        light1 = new Light('N', true);
        light2 = new Light('E', false);
        sut = new Intersection(light1, light2);
    });

    QUnit.test('should throw error if no color is passed', (assert) => {
        assert.throws(
            () => sut.updateActiveLights(),
            new Error('Cannot update lights without a color')
        );
    });

    QUnit.test('should update active lights only', (assert) => {
        sut.updateActiveLights(constants.colors.GREEN);
        assert.ok(light1.color === constants.colors.GREEN);
        assert.ok(light2.color === constants.colors.RED);
    });

    QUnit.test('should update multiple active lights', (assert) => {
        const light3 = new Light('S', true);
        const light4 = new Light('W', false);
        sut = new Intersection(light1, light2, light3, light4);

        sut.updateActiveLights(constants.colors.GREEN);

        assert.ok(light1.color === constants.colors.GREEN);
        assert.ok(light2.color === constants.colors.RED);
        assert.ok(light3.color === constants.colors.GREEN);
        assert.ok(light4.color === constants.colors.RED);
    });
}) ();

(() => {
    QUnit.module('Intersection.activateOppositeLights');

    let light1;
    let light2;
    let sut;

    QUnit.testStart(() => {
        light1 = new Light('N', true);
        light2 = new Light('#', false);
        sut = new Intersection(light1, light2);
    });

    QUnit.test('should activate opposite lights', (assert) => {
        sut.activateOppositeLights();
        assert.ok(light1.active === false);
        assert.ok(light2.active === true);
    });

    QUnit.test('should activate multiple opposite lights', (assert) => {
        const light3 = new Light('S', true);
        const light4 = new Light('W', false);
        sut = new Intersection(light1, light2, light3, light4);

        sut.activateOppositeLights();

        assert.ok(light1.active === false);
        assert.ok(light2.active === true);
        assert.ok(light3.active === false);
        assert.ok(light4.active === true);
    });
}) ();