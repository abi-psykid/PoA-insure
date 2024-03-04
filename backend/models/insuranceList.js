const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = 'mongodb+srv://Abhishek:prasanna123@insurance.jivo8kb.mongodb.net/test?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true'
// const url = 'http://localhost:2717/'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected_list...'))
    .catch((err) => console.log(err))
const insuranceListSchema = new mongoose.Schema({
    policyName: {
        type: String
    }, 
    insurerName: {
        type: String
    },
    insurerEmail: {
        type: String
    },
    insurerAddress: {
        type: String
    },
    sumAssured: {
        type: Number
    },
    premiumPayment: {
        type: Boolean
    },
    policyTerm: {
        type: Number
    },
    paymentTerm: {
        type: Number
    },
    insuranceDescription: {
        type: String
    }
})

insuranceListSchema.plugin(uniqueValidator)
insuranceListSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const InsuranceList = mongoose.model('InsuranceList', insuranceListSchema)
module.exports = InsuranceList