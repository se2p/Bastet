const constraints = async function (t) {
    const beetle = t.getSprite('Beetle');
    t.assume.ok(typeof beetle !== 'undefined', 'Could not find beetle.');

    t.addConstraint(() => {
        t.assert.ok(!beetle.visible, 'Beetle should stay invisible!');
    });

    // REPLAY_ERROR_WITNESS
    // RANDOM_INPUTS
    t.end();
};

module.exports = [
    {
        test: constraints,
        name: 'Test',
        description: '',
        categories: []
    }
];
