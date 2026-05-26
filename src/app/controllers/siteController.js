const Course = require('../models/course.js') // file định nghĩa data mà tôi đã gửi bạn trước đó 
const UserAccount= require('../models/user.js')
const {multipleMongooseToObject}= require('../util/mongoose.js')
class SiteController {

    index(req,res,next){
        Course.find({})
            .then(courses =>{
                res.render('home',{courses : multipleMongooseToObject(courses)})
            })
            .catch(next)
    }
    // GET search
    search(req,res,next){
        res.render('search')
    }
    
}

module.exports = new SiteController();
