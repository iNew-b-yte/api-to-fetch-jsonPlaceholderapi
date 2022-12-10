const express = require("express");
const https = require("https");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(request,response)=>{
    response.write(<h1>Hello welcome to the test api.</h1>);
    response.write(<h3>To actually see the result, go to '/getdata' route.</h3>);
    response.send();
})

app.get('/getdata', (request, response) => {

    const url = "https://jsonplaceholder.typicode.com/users";
    https.get(url, (res) => {

        let dataUser = "";
        res.on('data', function (data) {
            dataUser += data;

        });

        res.on('end', () => {
            response.send(dataUser);
            console.log(dataUser);
        });

    }).on('error', (e) => {
        console.error(e);
    });

});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})