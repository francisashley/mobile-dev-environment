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

test("MDE console.log()'s to tray", () => {
  mobileDevEnvironment();

  console.log("works");

  expect(document.querySelectorAll(".mde-log.mde-log-type-string").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message-single").innerHTML).toBe("works");
});

test("MDE console.error()'s to tray", () => {
  mobileDevEnvironment();

  console.error("works");

  expect(document.querySelectorAll(".mde-log.mde-log-type-error").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message-single").innerHTML).toBe("works");
});

test("MDE console.assert()'s to tray", () => {
  mobileDevEnvironment();

  console.assert(false, "works");

  expect(document.querySelectorAll(".mde-log.mde-log-type-error").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message-single").innerHTML).toBe(
    "Assertion failed: works"
  );

  console.assert(false);

  expect(document.querySelectorAll(".mde-log.mde-log-type-error").length).toBe(2);
  expect(document.querySelectorAll(".mde-log .mde-log-message-single")[1].innerHTML).toBe(
    "Assertion failed: console.assert"
  );
});
