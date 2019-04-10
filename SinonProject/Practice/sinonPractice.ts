import Sinon from "sinon";
import chai from "chai";

const expect = chai.expect;

const myAPI: any = {
  Yo: function() {}
};

const tmp = () => {
  console.log("some stuff");
};

const data = {
  message: "Fake Test Msg :)"
};

describe.only("Sinon Practice", () => {
  let student: any;
  let mySpy: any;
  beforeEach(() => {
    student = {
      dropClass: function(classId: number, callback: any) {
        console.log(classId);
        callback();
      }
    };
    mySpy = Sinon.spy();
  });

  afterEach(() => {
    Sinon.restore();
  });

  context("Spying shit", () => {
    it("Should spy anonymously", () => {
      student.dropClass(3, mySpy);
      Sinon.assert.calledOnce(mySpy);
    });

    it("Should spy on method", () => {
      let mySpy = Sinon.spy(student, "dropClass");
      student.dropClass(6, function() {});
      Sinon.assert.calledOnce(mySpy);
    });

    it("Should spy on function", () => {
      let mySpy = Sinon.spy(tmp);
      student.dropClass(2, mySpy);
      Sinon.assert.calledOnce(mySpy);
    });
  });

  context("Stubbing shit", () => {
    it("Stubs shit once", () => {
      Sinon.stub(myAPI, "Yo");
      myAPI.Yo();
      Sinon.assert.calledOnce(myAPI.Yo);
    });

    it("Stubs shit twice", () => {
      Sinon.stub(myAPI, "Yo");
      myAPI.Yo();
      myAPI.Yo();
      Sinon.assert.calledTwice(myAPI.Yo);
    });

    it("Stub returns", () => {
      Sinon.stub(myAPI, "Yo").returns({
        message: "Fake Test Msg :)"
      });
      expect(myAPI.Yo()).to.deep.equal(data);
    });
  });
});
