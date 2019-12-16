import crel from "crel";

export default function CustomButton({ content, onClick } = {}) {
  const Button = crel("button", content);

  if (onClick) Button.addEventListener("click", onClick);

  return Button;
}
