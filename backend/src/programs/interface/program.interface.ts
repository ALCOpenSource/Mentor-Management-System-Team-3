export interface IProgram {
  startDate: Date;
  endDate: Date;
  completedDate?: Date;
  totalTasks: number;
  completedTasks: number;
  title: string;
  isCompleted: boolean;
}
