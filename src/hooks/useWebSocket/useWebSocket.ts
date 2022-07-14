import { useEffect, useState } from "react";
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
    if (usuario && !rxStompWS[type]) {
      rxStompWS.stomp
        .watch(`${topic}.${usuario?.dadosPessoais?.username}`)
        .subscribe(({ body }) => {
          let responseAsBody = JSON.parse(body) as T;

          setResponse(responseAsBody);

          rxStomp[type] = true;
        });
    }
  }, [usuario]);

  return { response };
};

export default useWebSocket;
