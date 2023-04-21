import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ITask } from "./interface/task.interface";

export type TaskDocument = HydratedDocument<Task> & ITask;

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Task {
  @Prop({
    type: String,
    required: true, // userId is a required field
  })
  userId: string; // Reference to the user who the program belongs to (the firebase uid)

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  details: string;

  @Prop({ required: true })
  mentorManagers: string[];

  @Prop({ required: true })
  mentors: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
