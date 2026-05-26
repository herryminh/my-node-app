const mongoose = require('mongoose');
const Client=require('../models/client.js')
const {multipleMongooseToObject, mongooseToObject}= require('../util/mongoose.js')
class ClientController {
    //show khach hang
    storedClient(req, res,next) {
        Client.find({})
            .then(clients =>res.render('client/show',
                {clients:multipleMongooseToObject(clients)

                }))
            .catch(next)
    }  
   
    create(req,res){
        res.render('./client/create')
    }
    store(req, res) {
            const formData = req.body;
            
            // Tạo đối tượng course mới dựa trên formData
            const client = new Client(formData);
    
            client.save()
                .then(() => res.redirect('/client/show'))
                .catch((error) => {
                    // Nên xử lý lỗi hoặc gọi next(error) để middleware xử lý
                    console.error(error);
                    res.status(500).send('Lỗi server khi lưu thuốc');
                });
    }
    //  edit ra project /courses/:id/edit
    
     // edit khách hàng
    edit(req,res,next){
            Client.findById(req.params.id)
    
                .then(client =>res.render('client/edit', {
                    client: mongooseToObject(client)
                }))
                .catch(next)
        } 

    // PUT project
    update(req, res,next) {
        Client.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect('/client/show'))

            .catch(next)
    }
    // delete project
    delete(req, res,next) {
        Client.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }
}

module.exports = new ClientController();