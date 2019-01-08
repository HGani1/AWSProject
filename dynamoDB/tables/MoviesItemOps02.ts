
let AWS = require("aws-sdk");

AWS.config.update({
  "region": "us-west-2",
  "endpoint": "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

let table = "Movies";

let year = 2015;
let title = "The Big New Movie";

let params = {
    "TableName": table,
    "Key":{
        "year": year,
        "title": title
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
