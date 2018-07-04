const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');



function initData() {
    return async (ctx, next) => {
            ctx.commonData = {
                 userName:ctx.session.userName
            };
        await next();
    };
}

module.exports = initData;