var express = require('express')
var app = express()
var createWallet = require('./createWallet')
var getWallet = require('./getWallet')
var config = require('./config')
var CryptoJS = require('crypto-js')

function decryptToken(token){
    try {
        var decoded = decodeURIComponent(token)
    } catch (err) {
        return false
    }
    let bytes = CryptoJS.AES.decrypt(decoded, config.API_PASSWORD_KEY);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData
  }

function auth(pwd, p_mode) {
    if (!p_mode) {
        return true;
    } else {
        try {
            var decrypted = decryptToken(pwd)
        } catch (err) {
            return false
        }
        if (!decrypted) {
            return false
        } else {
            if (decrypted == config.API_PASSWORD) {
                return true
            } else {
                return false
            }
        }
    }
}

module.exports = function(){

    let prduction_mode = typeof process.argv[process.argv.indexOf('-p')] == 'undefined' ? false : true

    if (prduction_mode) {
        console.log("API Running in production mode, password: " + encodeURIComponent(CryptoJS.AES.encrypt(config.API_PASSWORD, config.API_PASSWORD_KEY).toString()), '\n')
    }


    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });

    app.get("/createwallet/:pwd/:data", (req, res, next) => {
        if (auth(req.params.pwd, prduction_mode)) {
            createWallet(JSON.parse(decodeURIComponent(req.params.data)), function(response) {
                res.json(response)
            })
        } else {
            res.json({status: false, message: 'Failed authentication'})
        }
    })

    app.get("/getwallet/:pwd/:data", (req, res, next) => {
        if (auth(req.params.pwd, prduction_mode)) {
            getWallet(JSON.parse(decodeURIComponent(req.params.data)), function(response) {
                res.json(response)
            })
        } else {
            res.json({status: false, message: 'Failed authentication'})
        }
    })

}
