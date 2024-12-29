interface Data {
  resource: string | URL | Request;
  middleware: (data: any) => unknown;
  options?: RequestInit;
}

type InferReturnType<T extends readonly unknown[]> = {
  [K in keyof T]: InferReturnTypeSingle<T[K]>;
};

type InferReturnTypeSingle<T> = T extends { middleware: (arg: any) => infer R }
  ? R
  : never;

//The order of the data array is preserved
//https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values
export async function processRequests<T extends readonly Data[]>(
  requests: T,
): Promise<InferReturnType<T>> {
  return Promise.all(requests.map((request) => processRequest(request))) as any;
}

async function processRequest(request: Data) {
  const data = await safeFetch(request.resource, request.options);

  return request.middleware(data);
}

async function safeFetch(
  resource: string | URL | Request,
  options?: RequestInit,
): Promise<unknown> {
  try {
    const response = await fetch(resource, options);

    if (!response.ok) {
      throw new Error(
        `Bad response: ${response.status}. ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
