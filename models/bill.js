// extarnal imports
const mongoose = require("mongoose");

//create user schema
const billSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        totalPaid: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// create user model from user schema
const Bill = mongoose.model("bill", billSchema);

// export model
module.exports = Bill;
