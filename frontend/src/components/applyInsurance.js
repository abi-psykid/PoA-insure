import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { RPC_URL } from '../res/string'

import Web3 from 'web3'
import BlockSecureDeployer from '../abi/BlockSecureDeployer.json'

const listUrl = 'http://localhost:3001/api/insurance-list'
const insUrl = 'http://localhost:3001/api/insurances'

const ApplicationForm = ({ aadhaar, setAadhaar, name, setName, gender, setGender, pan, setPan, bankuw, setBankuw, meduw, setMeduw, insurance, account, setAccount, currentUser, setAppliedSuccessfully, setSuccessMessage }) => {

    const [deployerContract, setDeployerContract] = useState(null)
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
      const loadWeb3 = async () => {
      const web3 = new Web3(Web3.givenProvider || RPC_URL);
      web3.eth.getAccounts().then(console.log);
      console.log(web3, 'settled')
      console.log('loaded web3')
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        console.log(accounts, 'here here here')
        setAccounts(accounts)
        const networkId = await web3.eth.net.getId()
        const networkData = BlockSecureDeployer.networks[networkId]
        if (networkData) {
          const deployedContract = new web3.eth.Contract(BlockSecureDeployer.abi, networkData.address)
        //   console.log(deployedContract, 'deployed now')
          if(deployerContract===null) {setDeployerContract(deployedContract)}
          console.log(deployerContract, 'deployer idk inside application')
          console.log(currentUser.user.address, 'sender address here')
          console.log("Contract Address:",networkData.address)
        }
      }
    }
    loadWeb3()
    }, [deployerContract])
    const handleAadhaar = (e) => {
        setAadhaar(e.target.value)
        console.log(aadhaar, 'set aadhar')
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleGender = (e) => {
        setGender(e.target.value)
    }
    const handlePan = (e) => {
        setPan(e.target.value)
    }
    const handleBankUW = (e) => {
        setBankuw(e.target.value)
    }
    const handleMedUW = (e) => {
        setMeduw(e.target.value)
    }
    const handleAccount = (e) => {
        setAccount(e.target.value)
    }
    const handleTransact = async (e) => {
        const Web3 = require('web3');
        const web3 = new Web3(Web3.givenProvider || RPC_URL);
            // const web3 = new Web3('http://localhost:8545'); // replace with your local network

            // ABI and contract address for SecureInsuranceContract
            // const abi = [/* Insert ABI here */];
            // const contractAddress = '0x...'; // Insert contract address here

        // Create an instance of the SecureInsuranceContract
        const networkId = await web3.eth.net.getId()
        const networkData = BlockSecureDeployer.networks[networkId]
        const contractInstance = new web3.eth.Contract(BlockSecureDeployer.abi, networkData.address)

        // Set the values for the new policy
        const policyValues = {
        aadhaarCardNumber: 123456789012, // Replace with your own values
        sex: 'M',
        bankName: '0x735d2101B790F1444C4e69Bd88f8406946Ce79c7',
        accountNumber: 1234567890,
        insurerName: '0xD99f6128F0411DF8195750A885d156D0A03b6cCC',
        policyName: 'My Policy',
        hospitalName: '0x0189e7245e3F67e63bD240A1989e4f7c83c27095',
        pan: 'ABCDE1234F',
        policy1: 100000,
        policy2: 10,
        policy3: 1, // sumAssured, policyTerm, paymentTerm
        premiumPayment: true
        };

        // Create a new policy using the contract method
        contractInstance.methods
        .ApplyForInsurance(policyValues.aadhaarCardNumber, policyValues.sex, policyValues.bankName, policyValues.accountNumber, policyValues.insurerName, policyValues.policyName, policyValues.hospitalName, policyValues.pan, policyValues.policy1,policyValues.policy2, policyValues.policy3, policyValues.premiumPayment)
        .send({
            from: currentUser.user.address, // Replace with your own account
            gas: 3000000
        })
        .then((receipt) => {
            console.log('Policy created successfully with transaction hash:', receipt.transactionHash);
        })
        .catch((error) => {
            console.error('Error creating policy:', error);
        });

        const currentIdx = await deployerContract.methods.insuranceCounter().call()
        // Update the policy values using the contract method

        contractInstance.methods
        .UpdateMedicalHealth(currentIdx, true, 80, true, 'Medical report is good')
        .send({
            from: currentUser.user.address, // Replace with your own account
            gas: 3000000
        })
        .then((receipt) => {
            console.log('Policy updated successfully with transaction hash:', receipt.transactionHash);
        })
        .catch((error) => {
            console.error('Error updating policy:', error);
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const web3 = new Web3(Web3.givenProvider || RPC_URL)
        console.log(aadhaar, pan, name, gender, bankuw, meduw, insurance.policyName, insurance.policyTerm, insurance.insurerName, insurance.insurerAddress, insurance.sumAssured, 'submitted')
        console.log(currentUser.user.address, 'sender address here')
        // on successful submission, add it to blockchain, update in db, reroute to profile home
        // on failure, send the message, re - route to home
        const id = await deployerContract.methods.ApplyForInsurance(Number(aadhaar), gender, bankuw, Number(account), insurance.insurerAddress, insurance.policyName, meduw, pan, insurance.sumAssured, insurance.policyTerm, 10, true ).send({from: currentUser.user.address,gas: 3000000})
        // fetch the same insurance and return the id inside the function
        console.log(id, 'id here')
        const currentIdx = await deployerContract.methods.insuranceCounter().call()
        const awaitedInsurance = await deployerContract.methods.FetchInsuranceByIndex(currentIdx-1).call({from: currentUser.user.address})
        // we need to map each insurance with it's idx into the database

        console.log(awaitedInsurance, 'here')
        axios.post(insUrl, {
            userAddress: currentUser.user.address,
            id: currentIdx,
            name: name,
            aadhaarNumber: Number(aadhaar),
            accountNumber: Number(account),
            PAN: pan,
            gender: gender,
            state: 0,
            insurerAddress:insurance.insurerAddress, 
            insurerName: insurance.insurerName,
            bankUWAddress: bankuw,
            medUWAddress: meduw,
            policyName: insurance.policyName,
            sumAssured: insurance.sumAssured,
            policyTerm: insurance.policyTerm,
            paymentTerm: insurance.paymentTerm,
            premium: true
        })
        .then((response) => {
            console.log(response.data)
            setSuccessMessage('Success!!')
            setTimeout(() => {
                setSuccessMessage('')
                setAppliedSuccessfully(true)
            }, 1500)
        })
        .catch((err) => {
            setAppliedSuccessfully(false)
        })
        console.log(currentUser.user.address, "logging user address")
    }
    return (
    <div style={{color: 'gray'}}>
        <form>
        <div className="form-group">
            <label for="inputName">Name</label>
            <input type="text" className="form-control" id="exampleName" value={name} placeholder="Enter Name" onChange={handleName}/>
        </div>
        <div className="form-group">
            <label for="aadhaar"><bold>Aadhaar Number</bold></label>
            <input type="text" className="form-control" id="InputAadhaar" value={aadhaar} aria-describedby="aadhaarHelp" placeholder="Enter aadhaar number" onChange={handleAadhaar}/>
            <small id="aadhaarHelp" className="form-text text-muted">We'll never share your aadhaar with anyone else.</small>
        </div>
        <div className="form-group">
            <label for="account"><bold>Account Number</bold></label>
            <input type="text" className="form-control" id="InputAccounts" value={account} placeholder="Enter account number" onChange={handleAccount}/>
        </div>
        <div className="form-group">
            <label for="inputName">Gender</label>
            <input type="text" className="form-control" id="exampleGender" value={gender} placeholder="Specify Gender" onChange={handleGender}/>
        </div>
        <div className="form-group">
            <label for="pan"><bold>PAN</bold></label>
            <input type="text" className="form-control" id="InputPAN" value={pan} placeholder="Enter PAN number" onChange={handlePan}/>
        </div>
        <div className="form-group">
            <label for="exampleInputAddress">Bank UW Ethereum Address</label>
            <input type="text" className="form-control" id="exampleInputAddress" value={bankuw} placeholder="Bank UW Address" onChange={handleBankUW}/>
        </div>
        <div className="form-group">
            <label for="exampleInputAddress">Medical UW Ethereum Address</label>
            <input type="text" className="form-control" id="exampleInputAddress" value={meduw} placeholder="Medical UW Address" onChange={handleMedUW}/>
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/ >
            <label className="form-check-label text-muted" for="exampleCheck1">I acknowledge the data is true to the best of my knowledge.</label>
        </div>
    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
    <button type="button" class="btn btn-primary" onClick={handleTransact}>Transact</button>
        </form>
    </div>
)
}
const SuccessMessage = ({successMessage}) => {
    <div>{successMessage}</div>
}
const Apply = () => {
    const [insurance, setInsurance] = useState([])
    const [aadhaar, setAadhaar] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [pan, setPan] = useState('')
    const [bankuw, setBankuw] = useState('')
    const [meduw, setMeduw] = useState('')
    const [account, setAccount] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [appliedSuccessfully, setAppliedSuccessfully] = useState(false)

    const id = useParams().id
    useEffect(() => {
        axios.get(listUrl).then((response)=>{
            const insurances = response.data
            const insurance = insurances.find(ins => ins.id === id)
            setInsurance(insurance)
            console.log(insurance, 'hey its the insurance')
        })
    }, [])
    const { user: currentUser } = useSelector((state) => state.authReducer)
    console.log(currentUser, 'current user here')
    if (!currentUser) {
        return <Redirect to="/login" />
    } else {
        console.log('logged in!')
    } 
    if (appliedSuccessfully) return <Redirect to="/profilehome" />
    return (
        <div style={{color: 'white'}}>
        <div>
        <span><bold>{insurance.policyName}</bold> Insured By: {insurance.insurerName} Address: {insurance.insurerAddress} Sum Assured: {insurance.sumAssured} Term: {insurance.policyTerm}</span>
        </div>
        <div>
        Address: 0xABCDEF..
        Form Here Add to the contract here!! 
        </div>
        <ApplicationForm aadhaar={aadhaar} setAadhaar={setAadhaar} name={name} setName={setName} gender={gender} setGender={setGender} pan={pan} setPan={setPan} bankuw={bankuw} setBankuw={setBankuw} meduw={meduw} setMeduw={setMeduw} insurance={insurance} account={account} setAccount={setAccount} currentUser={currentUser} setAppliedSuccessfully={setAppliedSuccessfully} setSuccessMessage={setSuccessMessage}/>
        {appliedSuccessfully&&<SuccessMessage successMessage={successMessage}/>}
        </div>
    )
}

export default Apply