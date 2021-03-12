let database = require("./src/database/")
database.onConnect(() => {
    

    let BlockChain = require("./src/blockChain")

    let blockChain = new BlockChain()

    let hash = require('object-hash')

    let PROOF = 420

    // if(proofOfWork() === PROOF) {
    //     blockChain.addNewTransaction("William", "Plug", 1)
    //     let prevHash = blockChain.lastBlock() ? blockChain.lastBlock.hash : null
    //     blockChain.addNewBlock(prevHash)
    // }

    blockChain.addNewTransaction("William", "Plug", 2)
    blockChain.addNewBlock(null)

    console.log("Chain : ", blockChain.chain)

})