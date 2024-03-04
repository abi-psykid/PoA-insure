const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// const url = 'mongodb+srv://PG:prasanna123@insurance.jivo8kb.mongodb.net/test?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true'
const url = 'mongodb+srv://Abhishek:prasanna123@insurance.jivo8kb.mongodb.net/test?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true'
// const url = 'http://localhost:2717/'
// const url = 'mongodb://0.0.0.0:2717/abi'
//mongodb+srv://PG:prasanna123@insurance.jivo8kb.mongodb.net/test
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected_user...'))
    .catch((err) => console.log(err))
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    username: {
        type: String, 
    }, 
    aadhaarCardNumber: {
        type: Number,
        unique: true
    },
    address: {
        type: String,
        unique: true
    },
    passwordHash: String,
    type: String,
    insurances: [
        {
            insurer: {
                type: String,
            },
            typeOfInsurance: String,
            premium: String,
            claimStatus: String
        }
    ], 
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User