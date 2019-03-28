const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of database', () => {
    let oleg;
    beforeEach((done) => {
        oleg = new User({ name: 'Oleg'});
        alex = new User({ name: 'Alex'});
        maria = new User({ name: 'Maria'});
        amilia = new User({ name: 'Amilia'});
        Promise.all([
            oleg.save(),
            alex.save(),
            maria.save(),
            amilia.save()
        ])
            .then(() => done());
    });
    it('finds all users with a name oleg', (done) => {
        User.find({ name: 'Oleg' })
            .then((users) => {
                assert(users[0]._id.toString() === oleg._id.toString());
                done();
            });
    });
    it('finds user with particular id' , (done) => {
        User.findOne({ _id: oleg._id })
            .then((user) => {
                assert(user.name === 'Oleg');
                done();
            });
    });
    it('can skip limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((result) => {
                console.log(result);
                assert(result.length === 2);
                assert(result[0].name === 'Amilia');
                assert(result[1].name === 'Maria');
                done();
            })
    });
});