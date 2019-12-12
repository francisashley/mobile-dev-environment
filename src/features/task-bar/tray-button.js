import TrayIcon from "../icons/tray";
import classnames from "classnames";
import crel from "crel";

export default ({ children = [], isOpen = true, onClick, ...props } = {}) => {
  props.class = classnames(props.class, isOpen && "active");

  const Button = crel("button", { id: "mde-toggle-log-tray", ...props }, TrayIcon(), ...children);

  if (onClick) Button.addEventListener("click", onClick);

  return Button;
};
