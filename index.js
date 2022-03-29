const axios = require('axios');

const myArgs = process.argv.slice(2);
const main_url = myArgs[0];
const depth = myArgs[1] ?? 3;
const image_reg = new RegExp(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/, 'g');

let current_depth = 0;
//TODO:: validate url?

if(isNaN(depth)) {
    console.log("Second input must be an integer");
}

axios.get(myArgs[0])
    .then(function (response) {
        console.log("proccessing");
        var m,
        urls = [], 
        str = response.data,
        rex = /<img[^>]+src="([^">]+)/g;
    
        while ( m = rex.exec( str ) ) {
            urls.push( m[1] );
        }
    
        console.log( urls ); 
    })
    .catch(function(error){
        console.error("Failed to get " + main_url);
    });

