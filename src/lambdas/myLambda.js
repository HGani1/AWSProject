
exports.lambda = async (event, context) => {

    console.log("Hello");

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'Hey sup dude',
        })
    };
}