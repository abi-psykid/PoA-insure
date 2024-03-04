# Proof of Authority Implementation 

The healthcare industry has been revolutionized by technological advancements in the past century, aiming to improve disease diagnosis, medical supplies' quality, and treatment, as well as to establish global prevention plans. However, traditional client/server-based healthcare systems have faced significant challenges with security, privacy, and fragmented medical records, which can cause delays in treatment and require patients to repeat medical tests when transferring to a new hospital. This repetition can lead to side effects due to repeated exposure to X-rays and MRIs, among other things, and increase the cost and time burden on patients. Healthcare organizations also face high costs for infrastructure installation and maintenance, as well as ensuring compliance with Electronic Health Record (EHR) management regulations.

To address these limitations of client-server-based approaches, a promising solution is to leverage blockchain technology and the Proof of Authority (PoA) consensus algorithm to manage healthcare data. Blockchain's decentralized nature allows for secure, tamper-proof storage and sharing of healthcare data, ensuring patient privacy and security. The PoA consensus algorithm, which uses a set of approved nodes to validate transactions, provides a more efficient and cost-effective approach to validating data compared to other consensus algorithms.

By migrating on-premise databases to blockchain-powered cloud solutions that use the PoA algorithm, healthcare organizations can reduce costs while maintaining compliance with EHR regulations. This approach ensures that patients' medical records are securely stored and easily accessible to authorized healthcare providers, reducing the need for repeated medical tests and delays in treatment. Overall, blockchain technology and the PoA algorithm offer an innovative solution to the challenges facing the healthcare industry.

The purpose of the decentralized application is to provide an overview of the challenges facing the healthcare industry with traditional client-server-based approaches to managing healthcare data, such as security and privacy issues, fragmented medical records, and high costs. The DApp also introduces the potential of blockchain technology and the Proof of Authority (PoA) consensus algorithm as a promising solution to these challenges. The abstract explains how using blockchain and PoA can lead to secure, tamper-proof storage and sharing of healthcare data, reduce costs, and ensure compliance with EHR regulations, ultimately improving patient care and outcomes.

## Tools used

Blockchain technology 	            Ethereum
Smart contracts 	                Solidity
Consensus algorithm	                PoA
API development and integration	    Express.js
Data encryption and decryption  	SHA512
Security protocols	                HTTPS
Front-end development frameworks 	React.js
Back-end development frameworks	    Node.js, Web3.js
Database management systems 	    MongoDB

## Working

In order to initiate a new transaction, the transaction data is first hashed by the transaction initiator, which could be an allied health professional or patient. The digital signature of the transaction is then generated through the encryption of the hashed data, a process that involves the use of the transaction initiator's private key. Once the transaction data and its corresponding digital signature have been broadcasted to the network, every validating node in the network processes it by ensuring the transaction initiator's authenticity and the transaction data's integrity. Verification of the authenticity involves successful decryption of the digital signature using the transaction initiator's public key. Verification of integrity is based on whether the hashed data obtained from the decryption operation matches the hash of the transaction data. If the transaction is valid, it is broadcasted within the network to include it in a block. A miner, who generates the block, creates a block of the received valid transactions after verifying each transaction's validity. The selection of a miner that generates a block and the procedure of verifying and appending the generated block to the chain depends on the consensus protocol used by the blockchain network. The consensus protocols in blockchain networks can be classified into compute-intensive-based, capability-based, and voting-based protocols. The selected miner generates the hash of the block, also known as the digital signature, and broadcasts the block in the network. The block's header contains a version that represents the protocol used, a timestamp that represents the block generation time, and a Merkle root that is a single hash value obtained from iterative pair-wise hashing of the transactions in the block data. Each validating node will update their ledger copy by adding the block if it is valid.

 
SYSTEM FEATURES
A.	User
The user is one of the primary stakeholders in this project, who can apply for insurance and file insurance claims. The user has access to basic system features such as registration, login, and profile management. They can also view their insurance policy, update their personal information, and make payments using the integrated payment gateway. The blockchain aspect comes into play when the user submits a claim for processing. The user's medical data and history are stored on the blockchain securely and transparently, making it easy for the insurance company to process the claim without the need for manual verification.

B.	Insurance Company
The insurance company is responsible for creating new insurance policies and processing claims filed by the user. The insurance company has access to the same basic system features as the user, along with additional features such as policy creation, claim management, and data analytics. The insurance company can analyze the user's medical data stored on the blockchain to determine the legitimacy of the claim and process it accordingly. The blockchain also enables the insurance company to track the status of the claim transparently and accurately, reducing the likelihood of fraudulent claims.

C.	Bank
The bank is a stakeholder in the project as it is connected to the user and provides assistance with insurance-related transactions. The bank has access to the same basic system features as the user, along with additional features such as payment processing and financial analytics. The blockchain aspect comes into play when the user makes a payment towards their insurance policy. The payment transaction is recorded on the blockchain transparently and immutably, making it easy for the insurance company to verify the payment without the need for manual verification.

D.	Hospital
The hospital is responsible for initiating insurance claims on behalf of the user for medical reasons. The hospital has access to the same basic system features as the user, along with additional features such as claim initiation and medical data management. The blockchain aspect comes into play when the hospital initiates a claim on behalf of the user. The medical data related to the claim is stored on the blockchain securely and transparently, making it easy for the insurance company to verify the claim and process it accordingly. Additionally, the hospital can update the user's medical data on the blockchain in real-time, ensuring that the insurance policy reflects the user's current medical condition.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Status

The future scope of the project involves expanding the application's functionality to include smart contracts for automated insurance claims processing and AI-powered predictive analysis of patient health records. The application could also integrate with wearable devices and IoT sensors to generate real-time patient health data, facilitating remote monitoring of patients. With continuous advancements in blockchain technology, the application could potentially revolutionize the healthcare industry by ensuring data privacy and security while promoting collaboration between healthcare stakeholders.