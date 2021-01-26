const constraints = async function (t) {
    const sprite = t.getSprite('Sprite1');
    t.assume.ok(typeof sprite !== 'undefined', 'Could not find sprite.');

    t.addConstraint(() => {
        t.assert.ok(sprite.currentCostume !== 4, 'CEO should not be reachable!');
    });

    // REPLAY_ERROR_WITNESS
    // RANDOM_INPUTS
    t.end();
}

module.exports = [
    {
        test: constraints,
        name: 'Test',
        description: '',
        categories: []
    }
];
