import ResizeHandle from "./resize-handle";

test("ResizeHandle renders properly", () => {
  const resizeHandle = ResizeHandle();

  expect(resizeHandle.id).toBe("mde-log-tray-resize-bar");
});
