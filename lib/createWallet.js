var nexpect = require('nexpect');
var config = require('./config')

module.exports = function(data, callback) {
    nexpect.spawn(config.EXEC_PATH)
    .expect("What would you like to do?")
    .sendline(3)
    .expect("Wallet name:")
    .sendline(data.name)
    .expect("Password:")
    .sendline(data.password)
    .expect("Spend public key:")
    .sendline(data.spk)
    .expect("View private key:")
    .sendline(data.vpk)
    .expect("success")
    .run(function (err) {
        if (!err) {
            callback({status: true})
        }
        else {
            if (err.actual == 'fail_restore') callback({status: false, message: 'Failed to restore wallet'})
            if (err.actual == 'fail_exists') callback({status: false, message: 'Wallet already exists'})
            else callback({status: false, message: 'unknown error'})
        }
    });
}
