import ReloadButton from "../action-bar/reload-button";
import TrayButton from "../action-bar/tray-button";
import crel from "crel";

export default function ActionBar({
  corner,
  showReload,
  showTray,
  shouldRefreshCache,
  trayIsOpen,
  onToggleTray = () => {}
} = {}) {
  corner = ["tl", "tr"].includes(corner) ? corner : "tl";

  return crel(
    "div",
    { id: "mde-action-bar", "data-corner": corner },
    showReload ? ReloadButton({ onClick: () => location.reload(shouldRefreshCache) }) : null,
    showTray ? TrayButton({ isActive: trayIsOpen, onClick: onToggleTray }) : null
  );
}
