const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://vutuankien2004:sIXKGKaNANkYky8e@doancoso.dvff2.mongodb.net/do_an_co_so',
        );
        console.log('✅ Connected to database successfully!');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error.message);
    }
}

module.exports = { connect };
