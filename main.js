let database = require("./src/database/")
database.onConnect(() => {
    

    let BlockChain = require("./src/blockChain")

    let blockChain = new BlockChain()

    let hash = require('object-hash')

    let PROOF = 420

    blockChain.addNewTransaction("William", "Pog", 2)

    console.log("Chain : ", blockChain.chain)

})