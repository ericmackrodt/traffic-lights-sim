(() => {
    QUnit.module('Light');

    QUnit.test('should throw error if no id is set', (assert) => {
        assert.throws(
            () => new Light(),
            new Error('A light cannot be instantiated without an id')
        );
    });

    QUnit.test('should be instantiated with id only', (assert) => {
        const sut = new Light('id');
        assert.ok(sut.id === 'id');
        assert.ok(sut.color === constants.colors.RED);
        assert.ok(!sut.active);
    });

    QUnit.test('should be instantiated with active flag', (assert) => {
        const sut = new Light('id', true);
        assert.ok(sut.id === 'id');
        assert.ok(sut.color === constants.colors.RED);
        assert.ok(sut.active === true);
    });
}) ();