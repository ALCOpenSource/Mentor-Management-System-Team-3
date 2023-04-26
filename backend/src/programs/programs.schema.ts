// Import required modules
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IProgram } from "./interface/program.interface";

// Define interface for program document
export type ProgramDocument = HydratedDocument<Program> & IProgram;

// Define schema for program
@Schema({
  timestamps: true, // Add createdAt and updatedAt fields
  autoIndex: true, // Automatically create indexes for fields
  toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
  toObject: { virtuals: true }, // Include virtual properties when converting to a plain object
})
export class Program {
  @Prop({
    type: String,
    required: true, // User is a required field
  })
  userId: string; // Reference to the user who the program belongs to (firebase uid)

  @Prop()
  title: string; // Title of the program

  @Prop()
  startDate: Date; // Start date of the program

  @Prop()
  endDate: Date; // End date of the program

  @Prop()
  completedDate: Date; // Date when the program was completed

  @Prop({ default: false })
  isCompleted: boolean; // Flag to indicate whether the subprogram is completed

  @Prop()
  totalTasks: number; // Total number of tasks in the program

  @Prop()
  completedTasks: number; // Number of completed tasks in the program
}

// Create mongoose schema for Program model
export const ProgramSchema = SchemaFactory.createForClass(Program);
