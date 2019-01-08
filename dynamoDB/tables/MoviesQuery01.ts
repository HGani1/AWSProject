let AWS = require("aws-sdk");

AWS.config.update({
  "region": "us-west-2",
  "endpoint": "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

let params = {
    "TableName" : "Movies",
    "KeyConditionExpression": "#yr = :yyyy",
    "ExpressionAttributeNames":{
        "#yr": "year"
    },
    "ExpressionAttributeValues": {
        ":yyyy": 1980
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function (item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
