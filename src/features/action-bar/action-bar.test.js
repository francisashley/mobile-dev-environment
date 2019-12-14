import ActionBar from "./action-bar";

test("ActionBar renders properly", () => {
  const actionBar = ActionBar();

  expect(actionBar.id).toBe("mde-action-bar");
  expect(!!actionBar.querySelector("#mde-reload")).toBe(false);
  expect(!!actionBar.querySelector("#mde-toggle-tray")).toBe(false);
});

test("ActionBar shows reload button", () => {
  const actionBar = ActionBar({ showReload: true });

  expect(!!actionBar.querySelector("#mde-reload")).toBe(true);
});

test("ActionBar shows tray button", () => {
  const actionBar = ActionBar({ showTray: true });

  expect(!!actionBar.querySelector("#mde-toggle-tray")).toBe(true);
});

test("ActionBar tray button displays with `.active` class", () => {
  const actionBar = ActionBar({ showTray: true, trayIsOpen: true });

  expect(!!actionBar.querySelector("#mde-toggle-tray.active")).toBe(true);
});

test("ActionBar tray button displays without `.active` class", () => {
  const actionBar = ActionBar({ showTray: true });

  expect(!!actionBar.querySelector("#mde-toggle-tray.active")).toBe(false);
});

test("ActionBar reloads page when ReloadButton clicked", () => {
  const actionBar = ActionBar({ showReload: true });
  delete window.location;
  const reloadMock = jest.fn();
  window.location = { reload: reloadMock };

  actionBar.querySelector("#mde-reload").click();

  expect(window.location.reload).toHaveBeenCalled();
  expect(reloadMock.mock.calls[0][0]).toBe(undefined);
});

test("ActionBar reloads page and cache when ReloadButton clicked", () => {
  const actionBar = ActionBar({ showReload: true, shouldRefreshCache: true });
  delete window.location;
  const reloadMock = jest.fn();
  window.location = { reload: reloadMock };

  actionBar.querySelector("#mde-reload").click();

  expect(window.location.reload).toHaveBeenCalled();
  expect(reloadMock.mock.calls[0][0]).toBe(true);
});

test("ActionBar calls onToggleTray", () => {
  const onToggleTray = jest.fn();
  const actionBar = ActionBar({ showTray: true, onToggleTray });

  actionBar.querySelector("#mde-toggle-tray").click();

  expect(onToggleTray).toHaveBeenCalled();
});
