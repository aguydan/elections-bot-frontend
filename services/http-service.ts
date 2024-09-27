export class HTTPService {
  public static async get(url: string): Promise<Response> {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public static async post(url: string, body?: object): Promise<Response> {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public static async put(url: string, body?: object): Promise<Response> {
    return await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public static async delete(url: string, body?: object): Promise<Response> {
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}
