const axios = require('axios');

const myArgs = process.argv.slice(2);
const main_url = myArgs[0];
const depth = myArgs[1] ?? 3;
const image_reg = /<img ([\w\W]+?)\/>/g;

let current_depth = 0;
//TODO:: validate url?

if(isNaN(depth)) {
    console.log("Second input must be an integer");
}

axios.get(myArgs[0])
    .then(function (response) {
        console.log("proccessing");
        let body = response.data.split(image_reg);
        console.log(body[1]);
    });
    // .catch(function(error){
    //     console.error("Failed to get " + main_url);
    // });

