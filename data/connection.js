const mongoose = require("mongoose");

const connect = conn => {
    return mongoose.connect(conn);
}

module.exports = connect;