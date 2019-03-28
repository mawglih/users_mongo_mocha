const mongoose = require('mongoose')
const assert = require('assert');
const User = require('../src/users');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let oleg, blogPost, comment;
    beforeEach((done) => {
        oleg = new User({ name: 'Oleg'});
        blogPost = new BlogPost({ title: 'Js is js', content: 'Sure' });
        comment = new Comment({ content: 'Here is a content'});

        oleg.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = oleg;

        Promise.all([oleg.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves relation between user and post', (done) => {
        User.findOne({ name: 'Oleg' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'Js is js' );
                done();
            });
    });
    it('saves full relation tree', (done) => {
        User.findOne({ name: 'Oleg' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Oleg');
                assert(user.blogPosts[0].title === 'Js is js');
                assert(user.blogPosts[0].comments[0].content === 'Here is a content');
                assert(user.blogPosts[0].comments[0].user.name === 'Oleg');
            })
    })
}); 