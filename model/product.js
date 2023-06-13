const mongoose=require("mongoose")
const Schema = mongoose.Schema

const celebritySchema = new Schema(
    {
        "name": String,
        "amount": Number,
        "category": String,
        "Grocery":Number,
        "Medical":Number,
        "Stationary":Number,
        "Petrol":Number,
        "Income":Number,
        "Rent":Number,
        "Miscelleneous":Number,
        "byuser" : String,
        accBalance:Number,
        finalBalance:Number,
        date:Date,
        "deleteid" : String

    },
    { timestamps: true }
)


//collection creation
const test = mongoose.model('Record', celebritySchema) //creates new collection if not exist and if exist then push data 

module.exports = test