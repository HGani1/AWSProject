
import AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient({
    "region": "eu-west-2"
});

export default async (event) => {

    const params = {
        "TableName": "TestTable",
        "Key":{
            "IDString": "Yo dude"
        }
    };

    const del = db.delete(params).promise();
    await del;

    return {
        "statusCode": 200,
            "body": "Deletion success"
    };
};
