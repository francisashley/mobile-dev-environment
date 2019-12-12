import LogItem from "./log-item";

test("LogItem renders properly", () => {
  const logItem = LogItem();

  expect(logItem.classList).toContain("mde-log");
  expect(logItem.classList).toContain("mde-log-type-undefined");
  expect(logItem.querySelector("div.mde-log-amount")).toBeTruthy();
  expect(logItem.querySelector("div.mde-log-message-single")).toBeTruthy();
  expect(logItem.querySelector("a.mde-log-trace")).toBeTruthy();
  expect(logItem.querySelector("pre.mde-log-message-full")).toBeTruthy();
});

test("LogItem renders an error properly", () => {
  const logItem = LogItem({
    message: "Uncaught ReferenceError: intentional_error is not defined",
    filePath: "file:///Users/snoke/Code/mobile-dev-environment/example/index.html",
    fileName: "index.html",
    lineNumber: 25,
    type: "error"
  });

  expect(logItem.classList).toContain("mde-log-type-error");
  expect(logItem.querySelector(".mde-log-message-single").innerHTML).toBe(
    "Uncaught ReferenceError: intentional_error is not defined"
  );
  expect(logItem.querySelector(".mde-log-trace").innerHTML).toBe("index.html:25");
  expect(logItem.querySelector(".mde-log-message-full").innerHTML).toBe(
    "Uncaught ReferenceError: intentional_error is not defined"
  );
});

test("LogItem toggles body when clicked", () => {
  const logItem = LogItem({
    message: "Uncaught ReferenceError: intentional_error is not defined",
    filePath: "file:///Users/snoke/Code/mobile-dev-environment/example/index.html",
    fileName: "index.html",
    lineNumber: 25,
    type: "error"
  });

  expect(logItem.classList).not.toContain("mde-log-open");

  logItem.querySelector(".mde-log-message-single").click();

  expect(logItem.classList).toContain("mde-log-open");
});
