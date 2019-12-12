import LogList from "./log-list";

test("LogList renders properly", () => {
  const logList = LogList();

  expect(logList.id).toBe("mde-logs");
  expect(logList.querySelectorAll(".mde-log").length).toBe(0);
});
