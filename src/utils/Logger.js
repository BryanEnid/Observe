// const socket = new WebSocket("ws://192.168.1.79:4444");
// const socket = new WebSocket("ws://localhost:9090");
// const controller = new AbortController();

// socket.addEventListener("open", (e) => {
//   console.log("[connected] WebSocket connected");
// });
import ReactoTron from "reactotron-react-native";
import "../config/ReactotronConfig";

export class Logger {
  static initialize = () => {
    global.tron = ReactoTron;
  };
}
