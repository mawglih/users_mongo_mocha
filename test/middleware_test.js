const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let oleg, blogPost;
    beforeEach((done) => {
        oleg = new User({ name: 'Oleg'});
        blogPost = new BlogPost({ title: 'Js is js', content: 'Sure' });

        oleg.blogPosts.push(blogPost);
    

        Promise.all([oleg.save(), blogPost.save()])
            .then(() => done());
    });
    it('users clean up blockpost on delete', (done) => {
        oleg.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count) === 0;
                done();
            });
    });
});