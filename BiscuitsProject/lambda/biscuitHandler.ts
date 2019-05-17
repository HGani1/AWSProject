import { Biscuits } from "./dataContainer";

export default async (event: Biscuits) => {
  const body = JSON.parse(event.body);
  const data = body.biscuitType;
  console.log(data);

  try {
    if (data.biscuit1 === 1) {
      return {
        statusCode: 200,
        body: "Working"
      };
    } else {
      return {
        statusCode: 400,
        body: "Not Working"
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: console.log(e)
    };
  }
};
