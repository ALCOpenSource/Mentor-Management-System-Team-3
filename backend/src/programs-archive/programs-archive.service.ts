import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ProgramArchive,
  ProgramArchiveDocument,
} from "./programs-archive.schema";
import { Model } from "mongoose";
import { OperationStatus } from "../filters/interface/response.interface";
import { HttpResponseType } from "../types/http-response.type";
import { FindByUserIdDto } from "./dto/findbyuserid.dto";

@Injectable()
export class ProgramsArchiveService {
  private readonly logger = new Logger(ProgramsArchiveService.name);

  constructor(
    @InjectModel(ProgramArchive.name)
    private readonly programArchiveModel: Model<ProgramArchiveDocument>,
  ) {}

  // Find program archive document by programId and userId
  async findByProgramId(
    programId: string,
    userId: string,
  ): Promise<HttpResponseType> {
    const programArchives = await this.programArchiveModel
      .findOne({ programId, userId })
      .populate("programId")
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: programArchives,
    };
  }

  // Find program archive documents by userId and paginate the results
  async findByUserId(
    userId: string,
    findByUserIdDto: FindByUserIdDto,
  ): Promise<HttpResponseType> {
    // Calculate the number of documents to skip based on page and perPage
    const skip = (findByUserIdDto.page - 1) * findByUserIdDto.perPage;

    // Query for program archive documents by userId and populate the programId field
    const query = this.programArchiveModel
      .find({ userId })
      .populate("programId");

    // Query for the total number of documents that match the userId criteria
    const countQuery = this.programArchiveModel
      .find({ userId })
      .countDocuments();

    // Execute both queries in parallel and await the results
    const [data, count] = await Promise.all([
      query.skip(skip).limit(findByUserIdDto.perPage).exec(), // Apply pagination to the query
      countQuery.exec(), // Get the total count of matching documents
    ]);

    // Return an object with the paginated data and the total count of documents
    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: { ...data, count },
    };
  }
}
