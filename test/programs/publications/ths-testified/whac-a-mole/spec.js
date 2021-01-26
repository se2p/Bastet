const constraints = async function (t) {
    const mole = t.getSprite('Mole');
    t.assume.ok(typeof mole !== 'undefined', 'Could not find mole.');

    t.addConstraint(() => {
        const score = mole.getVariable('score');
        t.assert.ok(score !== undefined && score !== null, 'Variable score not defined!');
        t.assert.ok(!(score.value === 2 && mole.sayText !== 'Still here'), 'Game should stop after first score');
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
