interface Data {
  resource: string | URL | Request;
  middleware: (data: FetchResult) => unknown;
  options?: RequestInit;
}

export type FetchResult<T = any> =
  | {
      data: T;
      status?: number;
      error: null;
    }
  | {
      data: null;
      status?: number;
      error: string;
    };

type InferReturnType<T extends readonly unknown[]> = {
  [K in keyof T]: T[K] extends { middleware: (arg: any) => infer R }
    ? R
    : never;
};

//The order of the data array is preserved
//https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values

//Haven't yet figured out the way to type this properly, but it works as it is now
export async function processRequests<T extends readonly Data[]>(requests: T) {
  return Promise.all(
    requests.map((request) => processRequest(request)),
  ) as Promise<InferReturnType<T>>;
}

async function processRequest<T extends Data>(request: T) {
  const data = await safeFetch(request.resource, request.options);

  return request.middleware(data);
}

export async function safeFetch<T>(
  resource: string | URL | Request,
  options?: RequestInit,
): Promise<FetchResult<T>> {
  try {
    const response = await fetch(resource, options);

    if (!response.ok) {
      const error = `API status ${response.status}: ${response.statusText}`;
      console.error(error);

      return {
        data: null,
        status: response.status,
        error,
      };
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      data: null,
      error: "Network Error: Couldn't connect to the API",
    };
  }
}
