const assert = require('assert');
const User = require('../src/users');

describe('Subdocuments', () => {
    it('can create subdocument', (done) => {
        const oleg = new User({ 
            name: 'Oleg',
            posts: [{ title: 'Title'}]
        });
        oleg.save()
            .then(() => User.findOne({ name: 'Oleg'}))
            .then((user) => {
                assert(user.posts[0].title === 'Title');
                done();
            });
    });
    it('can add subdocuments to existent record', (done) => {
        const oleg = new User({
            name: 'Oleg',
            posts: [],
        });
        oleg.save()
            .then(() => User.findOne({ name: 'Oleg' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                return user.save();
            })
            .then(() => User.findOne({ name: 'Oleg' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });
    it('can remove existing subdocument', (done) => {
        const oleg = new User({ name: 'Oleg', posts: [{ title: 'Post' }]});
        oleg.save()
            .then(() => User.findOne({ name: 'Oleg'}))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Oleg'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});