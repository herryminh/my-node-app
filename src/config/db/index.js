const mongoose = require('mongoose');

async function connect() {
    try {
        console.log(process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log('connect success !!!!');
    } catch (error) {
        console.error('connect fail !!!:', error);
    }
}

module.exports = { connect };