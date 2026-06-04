const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hoangminh_Academy_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connect success !!!!');
    } catch (error) {
        console.error('connect fail !!!:', error);
    }
   
}

module.exports = { connect };
