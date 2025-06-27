export interface Task {
  name?: string;
  description?: string;
  done?: boolean;
  due_date?: string;
  rating?: number;
  recurrence?: string;
  recurrence_interval?: number;
}
