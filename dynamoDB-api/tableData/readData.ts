
import AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient({
    "region": "eu-west-2"
});

export default async (event) => {

    const params = {
        "TableName" : "TestTable",
        "KeyConditionExpression": "#id = :value",
        "ExpressionAttributeNames":{
            "#id": "IDString"
        },
        "ExpressionAttributeValues": {
            ":value": "Yo dude"
        }
    };

    const query = db.query(params).promise();

    return {
        "statusCode": 200,
            "body": JSON.stringify(await query)
    };
};
