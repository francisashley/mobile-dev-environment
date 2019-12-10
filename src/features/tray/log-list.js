import LogItem from "./log-item";
import crel from "crel";

export default function LogList({ log = [], ...props } = {}) {
  return crel("div", { id: "mde-logs", ...props }, ...log.map(logItem => LogItem(logItem)));
}
