export class APIError extends Error {
    constructor(
      message: string,
      public status?: number,
      public code?: string
    ) {
      super(message);
      this.name = 'APIError';
    }
  }
  
  export async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new APIError(
        data.message || 'An error occurred',
        response.status,
        data.code
      );
    }
  
    return data;
  }