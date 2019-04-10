import Sinon from "sinon";

const foo = (data: string, callback: any) => {
  console.log(data);
  callback();
};

let bar = () => {
  console.log("I am the callback");
};

const mySpy = Sinon.spy(console, "log");

foo("Hello", bar);

console.log(mySpy.callCount);
