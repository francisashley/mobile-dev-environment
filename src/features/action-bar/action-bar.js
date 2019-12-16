import ReloadButton from "src/features/action-bar/reload-button";
import TrayButton from "src/features/action-bar/tray-button";
import crel from "crel";

export default function ActionBar({
  actions = [],
  corner,
  shouldRefreshCache,
  trayIsOpen,
  onToggleTray = () => {}
} = {}) {
  corner = ["tl", "tr"].includes(corner) ? corner : "tl";

  return crel(
    "div",
    { id: "mde-action-bar", "data-corner": corner },
    ...actions.map(action => {
      if (action === "reload") {
        return ReloadButton({ onClick: () => location.reload(shouldRefreshCache) });
      }
      if (action === "toggle-tray") {
        return TrayButton({ isActive: trayIsOpen, onClick: onToggleTray });
      }
      return null;
    })
  );
}
