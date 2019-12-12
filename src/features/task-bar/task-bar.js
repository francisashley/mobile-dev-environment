import ReloadButton from "../task-bar/reload-button";
import TrayButton from "../task-bar/tray-button";
import classnames from "classnames";
import crel from "crel";

export default function ControlBar({ state, onToggleTray } = {}) {
  const corner = state.get("task-bar.corner");
  const showReload = state.get("features").includes("reload");
  const showTray = state.get("features").includes("tray");
  const shouldRefreshCache = state.get("reload.refreshCache");
  const trayIsOpen = state.get("tray.open");
  const className = classnames(corner && "mde-control-bar-" + corner);

  return crel(
    "div",
    { id: "mde-control-bar", class: className },
    showReload ? ReloadButton({ onClick: () => location.reload(shouldRefreshCache) }) : null,
    showTray ? TrayButton({ isOpen: trayIsOpen, onClick: onToggleTray }) : null
  );
}
