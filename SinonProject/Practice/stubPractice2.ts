import Sinon from "sinon";
const $ = require("ajax");

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

const expectedUrl = "/users";
const expectedParams = {
  first: "Expected first name",
  last: "Expected last name"
};
const user = {
  firstname: expectedParams.first,
  lastname: expectedParams.last
};

saveUser(user, function() {});
post.restore();

Sinon.assert.calledWith(post, expectedUrl, expectedParams);
