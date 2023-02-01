
export const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> => fetch(...args).then((res) => res.json())
