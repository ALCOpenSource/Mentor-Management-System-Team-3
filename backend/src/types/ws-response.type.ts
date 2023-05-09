export type WebsocketResponseType<T> = {
  success: boolean;
  error?: string;
  data?: T;
};
