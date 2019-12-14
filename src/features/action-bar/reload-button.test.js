import ReloadButton from "./reload-button";

test("ReloadButton renders properly", () => {
  const reloadButton = ReloadButton();

  expect(reloadButton.id).toBe("mde-reload");
  expect(!!reloadButton.querySelector("svg")).toBe(true);
});

test("ReloadButton calls onClick", () => {
  const onClickMock = jest.fn();
  const reloadButton = ReloadButton({ onClick: onClickMock });

  reloadButton.click();

  expect(onClickMock).toHaveBeenCalled();
});
