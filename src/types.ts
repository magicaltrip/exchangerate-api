export type ExchangerateApiResponse = {
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
  time_last_updated: number;
};

export type ExchangerateApiLatestInput = {
  base: string;
};

export interface ExchangerateApiCache {
  get(base: string): Promise<ExchangerateApiResponse | undefined>;
  put(base: string, response: ExchangerateApiResponse): Promise<void>;
}
