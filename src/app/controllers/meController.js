
const mongoose = require('mongoose');
const Course = require('../models/course.js') // file định nghĩa data mà tôi đã gửi bạn trước đó 
const { mutipleMongooseToObject}= require('../util/mongoose.js')
class MeController {
    // show ra project
    storedCouses(req,res,next ){
        Course.find({})
            .then(courses =>res.render('me/stored-courses',
            {courses:mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController();
