import crel from "crel";
import mobileDevEnvironment from "./index";

beforeEach(() => crel(document.body, crel("div", { id: "mde" })));
afterEach(() => document.getElementById("mde").remove());

const generateMDE = options => {
  return mobileDevEnvironment({
    root: document.getElementById("mde"),
    ...options
  });
};

test("MobileDevEnvironment renders without crashing", () => {
  generateMDE();

  expect(!!document.getElementById("mde-action-bar")).toBe(true);
  expect(!!document.getElementById("mde-tray")).toBe(true);
});

test("MobileDevEnvironment throws an error if initiated without a valid `root` DOM element", () => {
  try {
    mobileDevEnvironment();
    expect(false).toBe(true);
  } catch (error) {
    expect(error).toBe(
      "Could not start MDE because MDE requires a `root` element to attach to the DOM."
    );
  }
});

test("MobileDevEnvironment displays `toggle-tray` and `reload` actions correctly", () => {
  generateMDE({ actions: ["toggle-tray", "reload"] });

  expect(document.querySelectorAll("#mde-action-bar button")[0].id).toBe("mde-toggle-tray");
  expect(document.querySelectorAll("#mde-action-bar button")[1].id).toBe("mde-reload");
});

test("MobileDevEnvironment displays empty actions bar correctly", () => {
  generateMDE({ actions: [] });

  expect(document.querySelectorAll("#mde-action-bar > button").length).toBe(0);
});

test("MobileDevEnvironment actions appear on top right by default", () => {
  generateMDE();

  expect(document.querySelector("#mde-action-bar[data-corner=tr]")).toBeTruthy();
});

test("MobileDevEnvironment actions can be configured to appear on top left", () => {
  generateMDE({ actionsCorner: "tl" });

  expect(document.querySelector("#mde-action-bar[data-corner=tl]")).toBeTruthy();
});

test("MobileDevEnvironment actions can be configured to appear on top right", () => {
  generateMDE({ actionsCorner: "tr" });

  expect(document.querySelector("#mde-action-bar[data-corner=tr]")).toBeTruthy();
});
