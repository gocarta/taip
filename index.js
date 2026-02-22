function parseMessage(message) {
  const qualifier = message.slice(1, 2);
  const subject = message.slice(2, 4);
  if (subject !== "CP") throw Error("[@gocarta/taip] only compact position (CP) messages are currently supported");

  // total number of seconds since midnight
  const gps_time = Number(message.slice(4, 9));

  // calculate hours (3600 seconds in an hour)
  const hours = Math.floor(gps_time / 3600);

  // calculate minutes (remainder of hours divided by 60)
  const minutes = Math.floor((gps_time % 3600) / 60);

  // remainder in seconds when divide seconds by minutes
  const seconds = gps_time % 60;

  const time = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

  const latitude_sign = message.slice(9, 10);
  const latitude_int = message.slice(10, 12);
  const latitude_decimal = message.slice(12, 16);
  const latitude = Number(latitude_sign + latitude_int + "." + latitude_decimal);

  const longitude_sign = message.slice(16, 17);
  const longitude_int = message.slice(17, 20);
  const longitude_decimal = message.slice(20, 24);
  const longitude = Number(longitude_sign + longitude_int + "." + longitude_decimal);

  const sources = {
    0: "2D Fix",
    1: "3D Fix",
    2: "2D Differential Fix",
    3: "3D Differential Fix",
    4: "High Sensitivity Mode / Reserved",
    5: "Re-acquisition",
    6: "Dead Reckoning",
    7: "Manual Input",
    8: "Degraded Fix",
    9: "Not Available"
  };

  const source = Number(message.slice(24, 25));

  const ages = {
    2: "Fresh",
    1: "Old",
    0: "Stale"
  };

  const age = Number(message.slice(25, 26));

  const result = {
    qualifier,
    subject: "Compact Position",
    time,
    latitude,
    longitude,
    source: sources[source] || "Unknown",
    age: ages[age] || "Unknown"
  };

  // check if vehicle id included
  if (message.slice(26, 30).toUpperCase() === ";ID=") {
    result.id = message.slice(30, 34);
  }

  return result;
}

function validateMessage(message) {
  if (message === null) throw Error("[@gocarta/taip] message is null, but it should be a string");
  if (typeof message === "object") throw Error("[@gocarta/taip] message is an object, but it should be a string");
  if (typeof message === "number") throw Error("[@gocarta/taip] message is a number, but it should be a string");
  if (typeof message !== "string") throw Error("[@gocarta/taip] message is not a string");
  if (!message.startsWith(">")) throw Error("[@gocarta/taip] message does not start with >");
  if (!message.endsWith("<")) throw Error("[@gocarta/taip] message does not end with <");
}

if (typeof window === "object") {
  window["@gocarta/taip"] = { parseMessage, validateMessage };
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return { parseMessage, validateMessage };
  });
}

if (typeof module === "object" && module.exports) {
  module.exports = { parseMessage, validateMessage };
}
