const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(request, response) {
   
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts) {
       
    //     User.find({}, function(err, users) {
    //         return response.render('home', {
    //             title: "Kaido | Home ",
    //             posts: posts,
    //             all_users: users
    //         });
    //     });
        
    // });
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        let users = await User.find({});
        return response.render('home', {
            title: "Kaido | Home",  
            posts: posts,
            all_users: users
        })
    } catch(err) {
        if(err) {
            console.log('error ', err);
            return;
        }
    }
    
}