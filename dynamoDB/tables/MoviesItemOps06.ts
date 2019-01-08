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
    "TableName":table,
    "Key":{
        "year": year,
        "title": title
    },
    "ConditionExpression":"info.rating <= :val",
    "ExpressionAttributeValues": {
        ":val": 8.0
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
