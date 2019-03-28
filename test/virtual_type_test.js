const assert = require('assert');
const User = require('../src/users');

describe('Virtual types', () => {
    it('postcount returns number of posts', (done) => {
        const oleg = new User({
            name: 'Oleg',
            posts: [{ title: 'Post' }]
        });
        oleg.save()
            .then(() => User.findOne({ name: 'Oleg' }))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});