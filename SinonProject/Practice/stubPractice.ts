import Sinon from "sinon";
const $ = require("ajax");

//feature to stub
const saveUser = (user: any, callback: any) => {
  $.post(
    "/users",
    {
      first: user.firstname,
      last: user.lastname
    },
    callback
  );
};

const post = Sinon.stub($, "post");
post.yields();

const callback = Sinon.spy();

saveUser({ firstname: "Han", lastname: "Solo" }, callback);

post.restore();

console.log(callback.callCount);

Sinon.assert.calledOnce(callback);
