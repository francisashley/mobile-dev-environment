import mobileDevEnvironment from "./mde";

beforeEach(() => {
  const container = document.createElement("div", { id: "mde" });
  container.setAttribute("id", "mde");
  document.body.appendChild(container);
});

afterEach(() => {
  document.getElementById("mde").remove();
});

test("MDE renders to dom without crashing", () => {
  mobileDevEnvironment();

  expect(!!document.getElementById("mde-control-bar")).toBe(true);
  expect(!!document.getElementById("mde-log-tray")).toBe(true);
});
