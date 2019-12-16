import CustomButton from "src/features/action-bar/custom-button";
import ReloadButton from "src/features/action-bar/reload-button";
import TrayButton from "src/features/action-bar/tray-button";
import crel from "crel";

export default function ActionBar({
  actions = [],
  corner,
  trayIsOpen,
  onToggleTray = () => {}
} = {}) {
  corner = ["tl", "tr"].includes(corner) ? corner : "tl";

  return crel(
    "div",
    { id: "mde-action-bar", "data-corner": corner },
    ...actions.map(action => {
      if (action.action === "reload") {
        return ReloadButton({ onClick: () => location.reload(action.refreshCache) });
      }
      if (action.action === "toggle-tray") {
        return TrayButton({ isActive: trayIsOpen, onClick: onToggleTray });
      }
      if (action.action === "custom") {
        return CustomButton({ content: action.content, onClick: action.onClick });
      }
      return null;
    })
  );
}
