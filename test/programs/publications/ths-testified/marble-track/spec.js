const constraints = async function (t) {
    const marble = t.getSprite('Marble');
    t.assume.ok(typeof marble !== 'undefined', 'Could not find marble.');

    t.addConstraint(() => {
        const marbleX = marble.x;
        const marbleY = marble.y;

        const inVerticalTrack = marbleX > -144 && marbleX < -138;
        const inHorizontalTrack = marbleY < 65 && marbleY > 59 && marbleX > -144 && marbleX < 53;
        t.assert.ok(inVerticalTrack || inHorizontalTrack, 'Marble not inside the track!');
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
