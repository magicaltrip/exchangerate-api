import { ExchangerateApiResponse, ExchangerateApiCache } from "./types";

/*

https://www.exchangerate-api.com/#faq_anchor

## How Often Do The Exchange Rates Update?

Our free exchange rate data is updated once every 24 hours.
Each response served shows the epoch time of the most recent data update.

*/

const DEFAULT_TTL_IN_SECONDS = 24 * 60 * 60;

type Props = {
  cacheTTLInSeconds?: number;
};

export function make({
  cacheTTLInSeconds = DEFAULT_TTL_IN_SECONDS
}: Props): ExchangerateApiCache {
  const cache = new Map<string, ExchangerateApiResponse>();

  return {
    async get(base: string) {
      const cachedValue = cache.get(base);

      if (cachedValue) {
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const diff = currentUnixTimestamp - cachedValue.time_last_updated;

        if (diff >= cacheTTLInSeconds) {
          return undefined;
        }
      }

      return cachedValue;
    },

    async put(base: string, response: ExchangerateApiResponse) {
      cache.set(base, response);
    }
  };
}
