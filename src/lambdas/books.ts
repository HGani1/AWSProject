import AWS from "aws-sdk";
import uuid from "uuid";

AWS.config.update({
    "region": "eu-west-2"
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    // const id = event.pathParameters ? event.pathParameters.id : null;
    const { TABLE_NAME } = process.env;

    const putParams = {
        "TableName": "Books",
        "Item":{
            "id": "Test",
            "BookName": "A Test Book"
        }
    };

    const getParams = {
        "TableName": "Books",
        "Key": {
            "id": "Test"
        }
    };

    const updateParams = {
        "TableName": "Books",
        "Key": {
            "id": "Test"
        },
        "UpdateExpression": "SET BookName"
    };

    switch (event.httpMethod) {
        case "POST":
                console.log("Hello");
                db.put(putParams, (err, data) => {
                    if (err) {
                        callback(null, {
                            "statusCode": 400,
                            "headers": {
                                "Access-Control-Allow-Origin": "*"
                            },
                            "body": JSON.stringify({"error": err})
                        });
                    }
                    callback(null, {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": "Success. Data has been loaded"
                    });
                });
                return;
        case "GET":
            db.get(getParams, (err, data) => {
                if (err) {
                    callback(null, {
                        "statusCode": 400,
                        "headers": {
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify({"error": err})
                    });
                }
                callback(null, {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*"
                    },
                    "body": JSON.stringify(AWS.DynamoDB.Converter.unmarshall(data.Item))
                });
            });
            return;
        case "PUT":
            db.update(updateParams, (err, data) => {
                if (err) {
                    callback(null, {
                        "statusCode": 400,
                        "headers": {
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify({"error": err})
                    });
                }
                callback(null, {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*"
                    },
                    "body": JSON.stringify(AWS.DynamoDB.Converter.unmarshall(data.Item))
                });
            });
            return;
        case "DELETE":
        default:
        const message = `Method type ${event.httpMethod} not supported.`;
        createResponse(message, null, callback);
    }

};
