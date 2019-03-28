const assert = require('assert');
const User = require('../src/users');

describe('Updating records', () => {
    let oleg;

    beforeEach((done) => {
        oleg = new User({ name: 'Oleg', likes: 0 })
        oleg.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Olezhka');
                done();
            });
    }

    it('instance set and save', (done) => {
        oleg.set('name', 'Olezhka');
        assertName(oleg.save(), done);
            
    });

    it('a model instance can update', (done) => {
        assertName(oleg.update({ name: 'Olezhka' }), done);
    });

    it(' a model class can update', (done) => {
        assertName(
            User.update({ name: 'Oleg' }, { name: 'Olezhka' }),
            done
        );
    });

    it(' a model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Oleg' }, { name: 'Olezhka' }),
            done
        );
    });
    it(' a model class can find a record with id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(oleg._id, { name: 'Olezhka' }),
            done
        );
    });
    it('user can have post count incremented by one', (done) => {
        User.update({ name: 'Oleg' }, { $inc: {likes: 10} })
            .then(() => User.findOne({ name: 'Oleg' }))
            .then((user) => {
                assert(user.likes === 10);
            });
            done();
    });
});