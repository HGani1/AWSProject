
import AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient({
    "region": "eu-west-2"
});

export default async (event) => {

    const table = "TestTable";
    const id = "Yo dude";

    const params = {
        "TableName": table,
        "Item":{
            "IDString": id
        }
    };

    const load = db.put(params).promise();

    await load;

    return {
        "statusCode": 200,
            "body": "Success. Data has been loaded"
    };

};
