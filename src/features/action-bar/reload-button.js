import ReloadIcon from "src/features/icons/reload";
import crel from "crel";

export default function ReloadButton({ onClick = () => {} } = {}) {
  const Button = crel("button", { id: "mde-reload" }, ReloadIcon());

  if (onClick) Button.addEventListener("click", onClick);

  return Button;
}
