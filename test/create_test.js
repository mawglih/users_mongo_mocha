const assert = require('assert');
const User = require('../src/users');

describe('Creating record', () => {
    it('saves a user', (done) => {
        const oleg = new User({ name: 'Oleg' });
        oleg.save()
            .then(() => {
                assert(!oleg.isNew);
                done();
            });
    });
});