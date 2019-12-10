import MobileDevEnvironment from "./mde";

beforeEach(() => {
  const container = document.createElement("div", { id: "mde" });
  container.setAttribute("id", "mde");
  document.body.appendChild(container);
});

afterEach(() => {
  document.getElementById("mde").remove();
});

test("MDE renders to dom without crashing", () => {
  new MobileDevEnvironment();

  expect(!!document.getElementById("mde-controlbar")).toBe(true);
  expect(!!document.getElementById("mde-logtray")).toBe(true);
});
