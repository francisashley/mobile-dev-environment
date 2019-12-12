import LogItem from "./log-item";
import crel from "crel";

export default function LogList({ log = [] } = {}) {
  return crel("div", { id: "mde-logs" }, ...log.map(logItem => LogItem(logItem)));
}
