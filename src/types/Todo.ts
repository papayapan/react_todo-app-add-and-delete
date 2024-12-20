export interface Todo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // isLoading: any;
  id?: number;
  userId?: number;
  title: string;
  completed: boolean;
}
