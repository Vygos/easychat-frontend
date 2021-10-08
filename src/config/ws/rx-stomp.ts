import { RxStomp } from "@stomp/rx-stomp";

const rxStomp = new RxStomp();
rxStomp.configure({
  brokerURL: "ws://localhost:8080/ws",
  connectHeaders: {
    login: "guest",
    passcode: "guest",
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 10000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
});

export { rxStomp };
