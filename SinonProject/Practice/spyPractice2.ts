import Sinon from "sinon";

const foo = (data: string, callback: any) => {
  console.log(data);
  callback();
};

const callback = Sinon.spy();

foo("Hello", callback);

console.log(callback.callCount);
