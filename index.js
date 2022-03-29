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


start();

async function start(){
    console.log("proccessing");

    await scan(argv[0], 0);
    
    let parsed_results = JSON.stringify({results: results});
    fs.writeFile(__dirname + "/urls.txt", parsed_results, err => {
            if (err) {
            console.error(err)
            return
            }
        }
    );
}

async function scan(url, current_depth) {
    if(current_depth > depth){
        return;
    }
    
    console.info({url: url, depth: current_depth});

    await axios.get(url)
    .then(function (response) {
        let image_url,
        str = response.data,
        rex = /<img[^>]+src="([^">]+)/g;

        while ( image_url = rex.exec( str ) ) {
            result = {
                imageUrl: image_url[1],
                sourceUrl: url,
                depth: current_depth
            }
            results.push(result);
        }

        //TODO: split to functions
        a_links = [];

        if(current_depth == depth){
            return;
        }
        
        str = response.data;
        //TODO: current regex only get http links, might want to get local path too and append current url.
        rex = /<a[^>]+href="http([^">]+)/g;

        while ( href_link = rex.exec( str ) ) {
            let link = "http" + href_link[1]; 
            scan(link, ++current_depth);
        }
    })
    .catch(function(error){
        console.error("Failed to get " + main_url);
    });
}
