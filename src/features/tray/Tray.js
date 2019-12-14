import LogList from "./log-list";
import ResizeHandle from "./resize-handle";
import crel from "crel";

export default function Tray({
  trayIsOpen = true,
  trayHeight = 100,
  log = [],
  onResizeTray = () => {}
} = {}) {
  const className = trayIsOpen ? "active" : "";
  const style = `height:${trayHeight}px`;
  const onDragResizer = offset => onResizeTray(offset);

  return crel(
    "div",
    { id: "mde-tray", style, class: className },
    ResizeHandle({ onDrag: onDragResizer }),
    LogList({ log })
  );
}
