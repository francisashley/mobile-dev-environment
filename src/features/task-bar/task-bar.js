import ReloadButton from "../task-bar/reload-button";
import TrayButton from "../task-bar/tray-button";
import classnames from "classnames";
import crel from "crel";

export default function TaskBar({
  corner,
  showReload,
  showTray,
  shouldRefreshCache,
  trayIsOpen,
  onToggleTray = () => {}
} = {}) {
  const className = classnames(corner && "mde-control-bar-" + corner);

  return crel(
    "div",
    { id: "mde-control-bar", class: className },
    showReload ? ReloadButton({ onClick: () => location.reload(shouldRefreshCache) }) : null,
    showTray ? TrayButton({ isActive: trayIsOpen, onClick: onToggleTray }) : null
  );
}
