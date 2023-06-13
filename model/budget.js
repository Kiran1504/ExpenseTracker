const mongoose=require("mongoose")
const Schema = mongoose.Schema

const budgetSchema = new Schema(
    {
        "GroceryB":{
            type : Number,
            default: 0,
            require: true
        },
        "MedicalB":{
            type : Number,
            default: 0,
            require: true
        },
        "StationaryB":{
            type : Number,
            default: 0,
            require: true
        },
        "PetrolB":{
            type : Number,
            default: 0,
            require: true
        },
        "RentB":{
            type : Number,
            default: 0,
            require: true
        },
        "MiscelleneousB":{
            type : Number,
            default: 0,
            require: true
        },
        "Bcategory":{
            type: String,
            require : true
        },
        "Bamount" : {
            type : Number,
            require : true
        },
        "byuser"  : String

    }
    // { timestamps: true }
)


//collection creation
const budget = mongoose.model('Budget', budgetSchema) //creates new collection if not exist and if exist then push data 

module.exports = budget