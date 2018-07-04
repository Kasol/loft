const dev_config = require('./config/config-dev');
const test_config = require('./config/config-test');
const pro_config = require('./config/config-pro');
let config;
switch (process.env.NODE_ENV) {  
    case 'pro':
        config = pro_config;
        console.log('------production config is loaded-----');
        break;
    case 'test':
        config = test_config;
        console.log('----test config is loaded-----');
        break;
    default:
        config = dev_config;
        console.log('----development config is loaded----');

}

module.exports = config;