import { useEffect, useState } from "react";
import { UseRequestInterface } from "./type";

const useRequest = <T>(service): UseRequestInterface<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T | null>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await service();

        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, error, data };
};

export default useRequest;
