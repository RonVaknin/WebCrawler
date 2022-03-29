const axios = require('axios');
const fs = require('fs');

const argv = process.argv.slice(2);
const main_url = argv[0];
const depth = argv[1] ?? 3;
const image_reg = new RegExp(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/, 'g');

let results = [];

//TODO:: validate url?

if(isNaN(depth)) {
    console.log("Second input must be an integer");
}


scan(argv[0], 0);

async function start(){
    await scan(argv[0], 0);
    console.log(results);
}

async function scan(url, current_depth) {
    if(current_depth >= depth){
        return;
    }

    await axios.get(url)
    .then(function (response) {
        console.log("proccessing");
        var m,
        urls = [], 
        str = response.data,
        rex = /<img[^>]+src="([^">]+)/g;

        while ( m = rex.exec( str ) ) {
            result = {
                imageUrl: m[1],
                sourceUrl: url,
                depth: current_depth
            }
            urls.push(result);
        }
        return JSON.stringify(urls);
    })
    .then(function (urls) {
        //TODO: generate hashfile or date filename for every result
        fs.writeFile(__dirname + "/urls.txt", urls, err => {
            if (err) {
            console.error(err)
            return
            }
        }
    )});
    // .catch(function(error){
    //     console.error("Failed to get " + main_url);
    // });
}
