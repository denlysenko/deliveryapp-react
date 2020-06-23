export interface Log {
  action: number;
  userId: number;
  createdAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
