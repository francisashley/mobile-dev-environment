import MobileDevEnvironment from "./mde";

// console.log(window.MobileDevEnvironment.toString());
test("MDE renders to dom without crashing", () => {
  new MobileDevEnvironment();

  expect(!!document.getElementById("mde-controlbar")).toBe(true);
  expect(!!document.getElementById("mde-logtray")).toBe(true);
});
