const test = require("flug");
const { parseMessage, validateMessage } = require("./index.js");

test("validate null message", ({ eq }) => {
  let msg;
  try {
    validateMessage(null);
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[@gocarta/taip] message is null, but it should be a string");
});

test("validate object message", ({ eq }) => {
  let msg;
  try {
    validateMessage({});
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[@gocarta/taip] message is an object, but it should be a string");
});

test("validate number message", ({ eq }) => {
  let msg;
  try {
    validateMessage(2);
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[@gocarta/taip] message is a number, but it should be a string");
});

test("validate not string message", ({ eq }) => {
  let msg;
  try {
    validateMessage(true);
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[@gocarta/taip] message is not a string");
});

test("parse CP Message with ID", ({ eq }) => {
  const message = ">RCP53000+350572-085269412;ID=0135<";
  const data = parseMessage(message);
  console.dir(data);
  eq(data.qualifier, "R");
  eq(data.subject, "Compact Position");
  eq(data.time, "14:43:20");
  eq(data.latitude, 35.0572);
  eq(data.longitude, -85.2694);
  eq(data.source, "3D Fix");
  eq(data.age, "Fresh");
  eq(data.id, "0135");
});
