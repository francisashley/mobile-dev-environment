import TaskBar from "./task-bar";

test("TaskBar renders properly", () => {
  const taskBar = TaskBar();

  expect(taskBar.id).toBe("mde-action-bar");
  expect(!!taskBar.querySelector("#mde-reload")).toBe(false);
  expect(!!taskBar.querySelector("#mde-toggle-tray")).toBe(false);
});

test("TaskBar shows reload button", () => {
  const taskBar = TaskBar({ showReload: true });

  expect(!!taskBar.querySelector("#mde-reload")).toBe(true);
});

test("TaskBar shows tray button", () => {
  const taskBar = TaskBar({ showTray: true });

  expect(!!taskBar.querySelector("#mde-toggle-tray")).toBe(true);
});

test("TaskBar tray button displays with `.active` class", () => {
  const taskBar = TaskBar({ showTray: true, trayIsOpen: true });

  expect(!!taskBar.querySelector("#mde-toggle-tray.active")).toBe(true);
});

test("TaskBar tray button displays without `.active` class", () => {
  const taskBar = TaskBar({ showTray: true });

  expect(!!taskBar.querySelector("#mde-toggle-tray.active")).toBe(false);
});

test("TaskBar reloads page when ReloadButton clicked", () => {
  const taskBar = TaskBar({ showReload: true });
  delete window.location;
  const reloadMock = jest.fn();
  window.location = { reload: reloadMock };

  taskBar.querySelector("#mde-reload").click();

  expect(window.location.reload).toHaveBeenCalled();
  expect(reloadMock.mock.calls[0][0]).toBe(undefined);
});

test("TaskBar reloads page and cache when ReloadButton clicked", () => {
  const taskBar = TaskBar({ showReload: true, shouldRefreshCache: true });
  delete window.location;
  const reloadMock = jest.fn();
  window.location = { reload: reloadMock };

  taskBar.querySelector("#mde-reload").click();

  expect(window.location.reload).toHaveBeenCalled();
  expect(reloadMock.mock.calls[0][0]).toBe(true);
});

test("TaskBar calls onToggleTray", () => {
  const onToggleTray = jest.fn();
  const taskBar = TaskBar({ showTray: true, onToggleTray });

  taskBar.querySelector("#mde-toggle-tray").click();

  expect(onToggleTray).toHaveBeenCalled();
});
