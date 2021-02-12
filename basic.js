const os = require("os");
const chance = require("chance");

const mychance = new chance();

console.log("hi");

console.log("It looks like you're running a " + os.platform() + " machine")

console.log("Your new fake name is " + mychance.name());