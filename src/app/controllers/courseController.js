
const mongoose = require('mongoose');
const Course = require('../models/course.js') // file định nghĩa data mà tôi đã gửi bạn trước đó 
const {mongooseToObject}= require('../util/mongoose.js')
class CourseController {
    // show ra project
    show(req,res,next){
        Course.findOne({slug : req.params.slug})
        
        .then(course => {
            res.render('courses/show', {course: mongooseToObject(course)} )
        })
        .catch (next)
    }
    
    // show ra project
   create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res) {
        const formData = req.body;
        
        // Tạo đối tượng course mới dựa trên formData
        const course = new Course(formData);

        course.save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                // Nên xử lý lỗi hoặc gọi next(error) để middleware xử lý
                console.error(error);
                res.status(500).send('Lỗi server khi lưu thuốc');
            });
    }
    //  edit ra project /courses/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)

            .then(course =>res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }
    // PUT project
    update(req, res,next) {
        Course.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect('/me/stored'))

            .catch(next)
    }
    // delete project
    delete(req, res,next) {
        Course.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
