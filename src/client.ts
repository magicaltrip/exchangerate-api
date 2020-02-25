import { RequestInfo, Response } from "node-fetch";
import {
  ExchangerateApiResponse,
  ExchangerateApiLatestInput,
  ExchangerateApiCache
} from "./types";

type Props = {
  fetch: (url: RequestInfo) => Promise<Response>;
  cache?: ExchangerateApiCache;
};

const apiUri = "https://api.exchangerate-api.com/v4";

export function make({ fetch, cache }: Props) {
  const fetchFromCache = async (base: string) => {
    return cache && cache.get(base);
  };

  const fetchFromApi = async (base: string) => {
    const url = `${apiUri}/latest/${base}`;
    const response = await fetch(url).then<ExchangerateApiResponse>(res =>
      res.json()
    );

    await cache?.put(base, response);

    return response;
  };

  return {
    async latest({ base }: ExchangerateApiLatestInput) {
      return fetchFromCache(base) ? fetchFromApi(base) : null;
    }
  };
}
