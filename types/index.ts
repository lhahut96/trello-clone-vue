type ID = string;

interface Column {
  id: ID;
  title: string;
  tasks: Task[];
}

interface Task {
  id: ID;
  content: string;
  createdAt: Date;
}

export type { Column, Task };
