let hash = require('object-hash')

const TARGET_HASH = hash(420)

let validator = require("./validator")

let mongoose = require("mongoose")

let blockChainModel = mongoose.model("BlockChain")

let chalk = require("chalk")

class BlockChain {
    constructor() {
        //Create
        this.chain = []

        //Transaction
        this.curr_transactions = []
    }

    getLastBlock(callback)  {
        // Get alst block from DB

        return blockChainModel.findOne({}, null, {sort: { _id: -1 }, limit: 1 }, (err, block) => {
            if(err) return console.error("Cannot find last block")
            return callback(block)
        }) 
    }

    addNewBlock(prevHash) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.curr_transactions,
            prevHash: prevHash,
        }

        if(validator.proofOfWork() == TARGET_HASH)  {
            block.hash = hash(block)

            this.getLastBlock((lastBlock) => {
                if(lastBlock) {
                    block.prevHash = lastBlock.hash
                }

                let newBlockChain = new blockChainModel(block)
                newBlockChain.save((err) => {
                    if(err) return console.log(chalk.red("FUCK, cannot save Block on DB", err.message))
                    console.log(chalk.green("Block saved on DB"))
                })
    
                //Hash
                this.hash = hash(block)
     
                //Add to chain
                this.chain.push(block)
                this.curr_transactions = []
                return block
            })       
        }       
    }

    addNewTransaction(sender, recipient, amount) {
        this.curr_transactions.push({sender, recipient, amount})n
    }

    lastBlock() {
        return this.chain.slice(-1)[0]
    }

    isEmpty() {
        return this.chain.lenth == 0
    }
}

module.exports = BlockChain