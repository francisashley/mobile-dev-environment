import ReloadButton from "../action-bar/reload-button";
import TrayButton from "../action-bar/tray-button";
import classnames from "classnames";
import crel from "crel";

export default function ActionBar({
  corner,
  showReload,
  showTray,
  shouldRefreshCache,
  trayIsOpen,
  onToggleTray = () => {}
} = {}) {
  const className = classnames(corner && "mde-action-bar-" + corner);

  return crel(
    "div",
    { id: "mde-action-bar", class: className },
    showReload ? ReloadButton({ onClick: () => location.reload(shouldRefreshCache) }) : null,
    showTray ? TrayButton({ isActive: trayIsOpen, onClick: onToggleTray }) : null
  );
}
