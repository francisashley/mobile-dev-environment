import Tray from "./tray";

test("ResizeHandle renders properly", () => {
  const tray = Tray();

  expect(tray.id).toBe("mde-log-tray");
});

test("Tray calls onResizeTray when resized", () => {
  const onResizeTray = jest.fn();
  const tray = Tray({ onResizeTray });

  const resizeHandle = tray.querySelector("#mde-log-tray-resize-bar");

  resizeHandle.dispatchEvent(new MouseEvent("mousedown", { which: 1 }));
  document.dispatchEvent(new MouseEvent("mousemove", { clientX: 1, clientY: 0 }));

  expect(onResizeTray).toHaveBeenCalled();
});
