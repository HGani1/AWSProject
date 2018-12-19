
import * as data from "../event.json";
import {name} from "./app";

exports.handler = async () => {

    if(name() === "Sabrina" ||  name() === "Hasan" || name() === "James") {
        return {
            "statusCode": 200,
            "body": JSON.stringify({
                "message": "Hi, my name is " + name() + " and I " + data[name()].message
            })
        };
     } else {
        return {
            "statusCode": 500,
            "body": JSON.stringify({
                "message": "The person you are looking for does not exist. Soz"
            })
        };
    }

};
