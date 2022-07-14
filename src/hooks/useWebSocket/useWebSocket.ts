import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { rxStomp } from "../../config/ws/rx-stomp";
import { Usuario } from "../../model/usuario.model";
import { UseWebSocketResponse } from "./type";

const useWebSocket = <T>(
  topic: string,
  usuario: Usuario,
  type: string
): UseWebSocketResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);

  const rxStompWS = rxStomp;

  useEffect(() => {
    let subscription: Subscription;
    if (usuario && !rxStompWS[type]) {
      subscription = rxStompWS.stomp
        .watch(`${topic}.${usuario?.dadosPessoais?.username}`)
        .subscribe(({ body }) => {
          let responseAsBody = JSON.parse(body) as T;

          setResponse(responseAsBody);

          rxStomp[type] = true;
        });
    }
    return () => {
        subscription && subscription.unsubscribe();
    }
  }, [usuario]);

  return { response };
};

export default useWebSocket;
