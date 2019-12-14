import TrayButton from "./tray-button";

test("TrayButton renders properly", () => {
  const trayButton = TrayButton();

  expect(trayButton.id).toBe("mde-toggle-tray");
  expect(trayButton.classList.contains("active")).toBe(false);
});

test("TrayButton displays with `.active` class", () => {
  const trayButton = TrayButton({ isActive: true });

  expect(trayButton.classList).toContain("active");
});

test("TrayButton displays without `.active` class", () => {
  const trayButton = TrayButton({ isActive: false });

  expect(trayButton.classList).not.toContain("active");
});

test("ActionBar calls onClick", () => {
  const onClickMock = jest.fn();
  const trayButton = TrayButton({ onClick: onClickMock });

  trayButton.click();

  expect(onClickMock).toHaveBeenCalled();
});
