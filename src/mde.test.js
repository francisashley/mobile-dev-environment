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

  expect(!!document.getElementById("mde-action-bar")).toBe(true);
  expect(!!document.getElementById("mde-tray")).toBe(true);
});

test("MDE console.log()'s to tray", () => {
  mobileDevEnvironment();

  console.log("works");

  expect(document.querySelectorAll(".mde-log[data-type=string]").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message").innerHTML).toBe("works");

  console.log("works");

  expect(document.querySelector(".mde-log[data-type=string] .mde-log-amount").innerHTML).toBe("2");
});

test("MDE console.error()'s to tray", () => {
  mobileDevEnvironment();

  console.error("works");

  expect(document.querySelectorAll(".mde-log[data-type=error]").length).toBe(1);
  expect(document.querySelector(".mde-log .mde-log-message").innerHTML).toBe("works");

  console.error("works");

  expect(document.querySelector(".mde-log[data-type=error] .mde-log-amount").innerHTML).toBe("2");
});

test("MDE console.assert()'s to tray", () => {
  mobileDevEnvironment();

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

test("MDE shows correct actions", () => {
  mobileDevEnvironment({
    actions: ["reload", "toggle-tray"]
  });

  expect(document.querySelector("#mde-action-bar #mde-reload")).toBeTruthy();
  expect(document.querySelector("#mde-action-bar #mde-toggle-tray")).toBeTruthy();
});

test("MDE shows actions tray on top right by default", () => {
  mobileDevEnvironment();

  expect(document.querySelector("#mde-action-bar[data-corner=tr]")).toBeTruthy();
});
test("MDE shows actions tray on top left", () => {
  mobileDevEnvironment({ actionsCorner: "tl" });
  expect(document.querySelector("#mde-action-bar[data-corner=tl]")).toBeTruthy();
});
test("MDE shows actions tray on top right", () => {
  mobileDevEnvironment({ actionsCorner: "tr" });

  expect(document.querySelector("#mde-action-bar[data-corner=tr]")).toBeTruthy();
});
