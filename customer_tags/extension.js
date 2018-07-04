const request = require('request');
const nunjucks = require('nunjucks');
const store = require('../middleware/auto_match').store;
const path = require('path');




function RemoteExtension  () {
    this.tags = ['remote'];
    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // parse the body and possibly the error block, which is optional
        var body = parser.parseUntilBlocks('error', 'endtruncate');
        var errorBody = null;

        if(parser.skipSymbol('error')) {
            parser.skip(lexer.TOKEN_BLOCK_END);
            errorBody = parser.parseUntilBlocks('endremote');
        }

        parser.advanceAfterBlockEnd();

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
    };

    this.run =  function (context, url, body, errorBody,callback)  {
        try{
            let keywords = url.slice(Number(url.lastIndexOf('/'))+1);
            let extName = path.extname(keywords);
            let baseName = path.basename(keywords,extName);
            let real_path = store['hashMap'][baseName][extName.split('.')[1]] || '';
            return  `http://47.94.95.201/${real_path}`;
        }catch(e){
            return  ``;

        }
            

    }
}

module.exports = {
    RemoteExtension:RemoteExtension
}