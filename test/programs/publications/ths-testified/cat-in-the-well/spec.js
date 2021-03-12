const constraints = async function (t) {
    const cat = t.getSprite('Cat');
    t.assume.ok(typeof cat !== 'undefined', 'Could not find marble.');

    t.addConstraint(() => {
        t.assert.ok(!(cat.x === 31 && cat.y === 29), 'Cat may not fall in the well!');
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
