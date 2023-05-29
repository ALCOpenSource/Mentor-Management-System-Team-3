export interface ActiveProgram {
  id?: string;
  name: string;
  route?: string;
  percentage?: number;
  no?: number;
  icon?: any;
  from?: Date;
  to?: Date;
}

export interface ProgramOverview {
  id?: string;
  name: string;
  route?: string;
  percentage?: number;
  no?: number;
  icon?: any;
  from?: Date;
  to?: Date;
}

export interface ReportsOverview {
  id?: string;
  name: string;
  route?: string;
  percentage?: number;
  no?: number;
  by?: string;
  icon?: any;
  from?: Date;
  to?: Date;
}

export interface TasksOverview {
  id?: string;
  name: string;
  route?: string;
  by?: string;
  percentage?: number;
  status?: "In Progress" | "Completed" | "Cancelled";
  no?: number;
  icon?: any;
  from?: Date;
  to?: Date;
}
