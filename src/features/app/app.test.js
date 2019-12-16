import App from "./app";
import crel from "crel";

beforeEach(() => crel(document.body, crel("div", { id: "mde" })));
afterEach(() => document.getElementById("mde").remove());

const generateApp = options => {
  return App({
    root: document.getElementById("mde"),
    stateId: "global",
    actions: [{ action: "reload" }, { action: "toggle-tray" }],
    actionsCorner: "tr",
    ...options
  });
};

test("App renders without crashing", () => {
  generateApp();

  expect(!!document.getElementById("mde-action-bar")).toBe(true);
  expect(!!document.getElementById("mde-tray")).toBe(true);
});

test("MDE console logs to tray", () => {
  generateApp();

  console.log("works");

  expect(document.querySelectorAll(".mde-log[data-type=string]").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message").innerHTML).toBe("works");

  console.log("works");

  expect(document.querySelector(".mde-log[data-type=string] .mde-log-amount").innerHTML).toBe("2");
});

test("MDE console errors to tray", () => {
  generateApp();

  console.error("works");

  expect(document.querySelectorAll(".mde-log[data-type=error]").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message").innerHTML).toBe("works");

  console.error("works");

  expect(document.querySelector(".mde-log[data-type=error] .mde-log-amount").innerHTML).toBe("2");
});

test("MDE console asserts to tray", () => {
  generateApp();

  console.assert(false, "works");

  expect(document.querySelectorAll(".mde-log[data-type=error]").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message").innerHTML).toBe(
    "Assertion failed: works"
  );

  console.assert(false);

  expect(document.querySelectorAll(".mde-log[data-type=error]").length).toBe(2);
  expect(document.querySelectorAll(".mde-log .mde-log-message")[1].innerHTML).toBe(
    "Assertion failed: console.assert"
  );

  console.assert(false);

  expect(
    document.querySelectorAll(".mde-log[data-type=error]")[1].querySelector(".mde-log-amount")
      .innerHTML
  ).toBe("2");
});
