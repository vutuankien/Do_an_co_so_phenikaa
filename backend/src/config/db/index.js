const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL
        );
        console.log('✅ Connected to database successfully!');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error.message);
    }
}

module.exports = { connect };
