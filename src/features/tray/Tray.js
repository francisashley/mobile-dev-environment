import LogList from "./log-list";
import TrayResizerButton from "./tray-resizer-button";
import crel from "crel";

export default function Tray({ state, onResizeTray } = {}) {
  const className = state.getCache("tray.open") ? "active" : "";
  const height = state.getCache("tray.height");
  const style = `height:${height}px`;
  const log = state.get("log");

  const onDragResizer = offset => onResizeTray(state.getCache("tray.height") + offset);

  return crel(
    "div",
    { id: "mde-log-tray", style, class: className },
    TrayResizerButton({ onDrag: onDragResizer }),
    LogList({ log })
  );
}
