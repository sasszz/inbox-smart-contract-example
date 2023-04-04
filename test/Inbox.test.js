// contract test code will go here
const assert = require("assert");
const ganache = require("ganache");
// Web3 is a constructor, which is why it is capitalized
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

// class Car {
//   park() {
//     return 'stopped';
//   }
// }

// let car;

// beforeEach (() => {
//   car = new Car();
// })

// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped')
//   })
// })

let accounts;
let inbox;
const INITIAL_STRING = "Init Message";
const NEW_STRING = "New Message";
beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log("success");
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("inboxContract", () => {
  it("deploys a contract", () => {
    // assert.ok - is this a defined value? T/F
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage(NEW_STRING).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_STRING);
  });
});
