import { RxStomp } from "@stomp/rx-stomp";

class RxStompService {
  private _stomp: RxStomp;

  private _avisosState: boolean;

  private _chatState: boolean;

  private _conversasState: boolean;

  constructor() {
    this._avisosState = false;
    this._chatState = false;
    this._conversasState = false;

    this._stomp = new RxStomp();

    this._stomp.configure({
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
    this.stomp.activate();
  }

  get stomp() {
    return this._stomp;
  }

  get avisosState() {
    return this._avisosState;
  }

  get chatState() {
    return this._chatState;
  }

  get conversasState() {
    return this._conversasState;
  }

  set avisosState(state: boolean) {
    this._avisosState = state;
  }

  set chatState(state: boolean) {
    this._chatState = state;
  }

  set conversasState(state: boolean) {
    this._conversasState = state;
  }
}

export const rxStomp = new RxStompService();
