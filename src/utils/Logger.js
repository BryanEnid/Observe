const socket = new WebSocket("ws://192.168.1.79:4444");
const controller = new AbortController();

socket.addEventListener("open", (e) => {
  console.log("[connected] WebSocket connected");
});

export class Logger {
  static initialize = () => {
    global.log = this.log;
  };

  static log = (params) => {
    socket.send(params);
  };
}
