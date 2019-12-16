import CustomButton from "./custom-button";

test("Custom button renders without crashing", () => {
  expect(!!CustomButton()).toBe(true);
});
test("Custom button calls onClick", () => {
  const onClick = jest.fn();
  const customButton = CustomButton({ onClick });

  customButton.click();

  expect(onClick).toHaveBeenCalled();
});
test("Custom button accepts string content", () => {
  const customButton = CustomButton({ content: "Hiya!" });

  expect(customButton.innerHTML).toBe("Hiya!");
});
test("Custom button accepts element content", () => {
  const content = document.createElement("i");
  content.innerHTML = "Hiya!";
  const customButton = CustomButton({ content });

  expect(customButton.innerHTML).toBe("<i>Hiya!</i>");
  expect(customButton.querySelector("i").tagName).toBe("I");
  expect(customButton.querySelector("i").innerHTML).toBe("Hiya!");
});
