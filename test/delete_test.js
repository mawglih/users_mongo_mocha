const assert = require('assert');
const User = require('../src/users');

describe('Deleting a user', () => {
    beforeEach((done) => {
        oleg = new User({ name: 'Oleg' });
        oleg.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        oleg.remove()
            .then(() => User.findOne({ name: 'Oleg'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    it('class method remove', (done) => {
        User.deleteMany({ name: 'Oleg'})
        .then(() => User.findOne({ name: 'Oleg'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    }); 
    it('find one and remove', (done) => {
        User.findOneAndRemove({ name: 'Oleg'})
            .then(() => User.findOne({ name: 'Oleg'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    it('find by id and remove', (done) => {
        User.findByIdAndRemove(oleg._id)
            .then(() => User.findOne({ name: 'Oleg' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});
