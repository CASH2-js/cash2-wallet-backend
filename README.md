# cash2-wallet-backend
## This program acts as a proxy between your wallet application and core processes (simplewallet exec)

## Usage 
```
git clone https://github.com/cash2-js/cash2-wallet-backend && cd cash2-wallet-backend
npm install
mkdir database
cd database 
node ../api
```

generated wallet files will be stored in the database directory.
THIS IS FULLY NON CUSTODIAL, ALL WALLET GENERATED ARE VIEW ONLY AND ENCRYPTED WITH THE USERS PASSWORD.

## Configuration
```javascript 
module.exports = {
    EXEC_PATH: '<path to your simplewallet exec>', // (Make sure it is modified version found at https://github.com/cash2-js/cash2)
    API_PASSWORD: '<password requred for authentication to api endpoints>',
    API_PASSWORD_KEY: '<Key to encrypt api password>'
}
```
