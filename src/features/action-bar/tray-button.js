import TrayIcon from "src/features/icons/tray";
import crel from "crel";

export default function TrayButton({ isActive = false, onClick } = {}) {
  const className = isActive ? "active" : "";

  const Button = crel("button", { id: "mde-toggle-tray", class: className }, TrayIcon());

  if (onClick) Button.addEventListener("click", onClick);

  return Button;
}
