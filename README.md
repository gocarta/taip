# @gocarta/taip
JavaScript Parser of Trimble ASCII Interface Protocol (TAIP) Messages

## install
```sh
npm install @gocarta/taip
```

## usage
```js
const { parseMessage } =  require("@gocarta/taip");

const taip_message = ">RCP53000+350572-085269412;ID=0135<";

parseMessage(taip_message);
{
  qualifier: "R",
  subject: "Compact Position",
  time: "14:43:20",
  latitude: 35.0572,
  longitude: -85.2694,
  source: "3D Fix",
  age: "Fresh",
  id: "0135"
}
```

## known limitations
- Only Compact Position message types are currently supported
