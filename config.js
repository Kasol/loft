let config;
switch (process.env.NODE_ENV) {  
    case 'pro':
        config = require('./config/config-pro');
        console.log('------production config is loaded-----');
        break;
    case 'test':
        config = require('./config/config-test');
        console.log('----test config is loaded-----');
        break;
    default:
        config = require('./config/config-dev');
        console.log('----development config is loaded----');

}

module.exports = config;