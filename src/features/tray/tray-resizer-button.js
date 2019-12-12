import crel from "crel";

export default function ResizerButton({ onDrag = () => {}, ...props } = {}) {
  const Button = crel("button", { id: "mde-log-tray-resize-bar", ...props }, "• • •");

  Button.addEventListener("touchstart", e => handleDrag(e));
  Button.addEventListener("mousedown", e => handleDrag(e));

  function handleDrag(e) {
    // Only allow dragging with left click
    if (e.which !== 1) return;
    let lastY = e.type === "touchstart" ? e.changedTouches[0].clientY : e.clientY;

    const handleMove = e => {
      let currentY = e.type === "touchmove" ? e.changedTouches[0].clientY : e.clientY;
      onDrag(lastY - currentY);
      lastY = currentY;
    };

    function handleEnd(e) {
      e.target.removeEventListener("touchmove", handleMove, false);
      e.target.removeEventListener("touchend", handleEnd, false);
      document.removeEventListener("mousemove", handleMove, false);
      document.removeEventListener("mouseup", handleEnd, false);
    }

    e.target.addEventListener("touchmove", handleMove, false);
    e.target.addEventListener("touchend", handleEnd, false);
    document.addEventListener("mousemove", handleMove, false);
    document.addEventListener("mouseup", handleEnd, false);
  }

  /**
   * Render
   */

  return Button;
}
