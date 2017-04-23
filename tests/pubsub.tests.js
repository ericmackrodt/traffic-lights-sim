(() => {
    QUnit.module('Pubsub.subscribe');

    let sut;

    QUnit.testStart(() => {
        sut = new Pubsub();
    });

    QUnit.test('should throw error if no name is passed', (assert) => {
        assert.throws(
            () => sut.subscribe(),
            new Error('You have to specify a name and a callback for your subscription')
        );
    });

    QUnit.test('should throw error if no function is passed', (assert) => {
        assert.throws(
            () => sut.subscribe('evt'),
            new Error('You have to specify a name and a callback for your subscription')
        );
    });

    QUnit.test('should be able to subscribe to an event', (assert) => {
        sut.subscribe('evt', () => {});

        assert.ok(sut.subscriptions.evt instanceof Array);
        assert.ok(typeof sut.subscriptions.evt[0] === 'function');
    });
}) ();

(() => {
    QUnit.module('Pubsub.publish');

    let sut;

    QUnit.testStart(() => {
        sut = new Pubsub();
    });

    // The only thing this test is doing is checking if it doesn't throw any exceptions;
    QUnit.test('should do nothing if called without subscriptions', (assert) => {
        sut.publish('evt', {});

        assert.ok(Object.keys(sut.subscriptions).length === 0);
    });

    QUnit.test('should publish event', (assert) => {
        let result;
        sut.subscribe('evt', (data) => result = data);

        sut.publish('evt', 'published');
        assert.ok(result === 'published');
    });

    QUnit.test('should publish event with multiple subscriptions', (assert) => {
        let result1;
        let result2;
        sut.subscribe('evt', (data) => result1 = data);
        sut.subscribe('evt', (data) => result2 = data);

        sut.publish('evt', 'published');

        assert.ok(result1 === 'published');
        assert.ok(result2 === 'published');
    });

    QUnit.test('should publish only the event passed', (assert) => {
        let result1;
        let result2;
        sut.subscribe('evt1', (data) => result1 = data);
        sut.subscribe('evt2', (data) => result2 = data);

        sut.publish('evt1', 'published');

        assert.ok(result1 === 'published');
        assert.ok(result2 === undefined);
    });
}) ();