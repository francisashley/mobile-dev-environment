import ReloadIcon from "../icons/reload";
import crel from "crel";

export default function ReloadButton({ children = [], onClick, ...props } = {}) {
  const Button = crel("button", { id: "mde-reload", ...props }, ReloadIcon(), ...children);

  if (onClick) Button.addEventListener("click", onClick);

  return Button;
}
