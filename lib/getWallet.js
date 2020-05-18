var nexpect = require('nexpect');
var config = require('./config')

var response = {
    locked_balance: 0,
    unlocked_balance: 0,
    transactions: [],
    incoming_transactions: []
}

module.exports = function(data, callback) {
    nexpect.spawn(config.EXEC_PATH)
    .expect("What would you like to do?")
    .sendline(1)
    .expect("Wallet name:")
    .sendline(data.name)
    .expect("Password:")
    .sendline(data.password)
    .expect(`[${data.name}] : `)
    .sendline("balance")
    .wait(`[${data.name}] : `)
    .sendline("all_transactions")
    .wait(`[${data.name}] : `)
    .sendline("incoming_transactions")
    .wait(`[${data.name}] : `)
    .sendline("exit")
    .run(function (err, stdout) {
        if (!err) {
            response.locked_balance = Number(stdout[4])
            response.unlocked_balance = Number(stdout[5])
            response.transactions = stdout[7] == 'No transfers found' ? [] : stdout[7]
            response.incoming_transactions = stdout[9] == 'No incoming transactions' ? [] : stdout[9]
            callback({status: true, res: response})
        }
        else {
            if (err.actual == 'fail_notexist') callback({status: false, message: 'Wallet does not exist'})
            else callback({status: false, message: 'unknown error'})
        }
    });
}
