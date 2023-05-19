import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { IProgram } from "./interface/program.interface";

export class CreateProgramDto implements IProgram {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  @IsDateString()
  completedDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  totalTasks: number;

  @IsNumber()
  @IsNotEmpty()
  completedTasks: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;

  constructor(data: IProgram) {
    Object.assign(this, data);
  }
}
