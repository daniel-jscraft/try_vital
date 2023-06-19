const express = require('express')
const http = require("https");

let data = ''

const options = {
  "method": "GET",
  "hostname": "api.sandbox.tryvital.io",
  "port": null,
  "path": "/v3/lab_tests/markers",
  "headers": {
    "x-vital-api-key": "sk_us_LIErP9tIywH9653CXtPB50XjCpYo-M0CYL0Ewjfs0T0"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    data = JSON.parse(body.toString())
  });
});

req.end();


const app = express();
const PORT = 8081

app.get('/api', (req, res)=>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({data})
});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);