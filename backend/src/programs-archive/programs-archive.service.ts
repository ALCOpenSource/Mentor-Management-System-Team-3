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
import { ProgramsArchiveSearchDto } from "./dto/program-archive-search.dto";
import { FindByProgramIdDto } from "./dto/findbyprogramid.dto";
import { CreateProgramArchiveDto } from "./dto/create-archive.dto";
import { PaginatedProgramArchiveDocuments } from "./interface/paginated-program-archive-documents.interface";

@Injectable()
export class ProgramsArchiveService {
  private readonly logger = new Logger(ProgramsArchiveService.name);

  constructor(
    @InjectModel(ProgramArchive.name)
    private readonly programArchiveModel: Model<ProgramArchiveDocument>,
  ) {}

  /**
   * Get all programs  archive that are  completed.
   * @returns HttpResponseType containing all programs that are  completed.
   */
  async findAll(): Promise<HttpResponseType<ProgramArchiveDocument[]>> {
    const programs = await this.programArchiveModel
      .find({ userId: "rou8idu77Qh0p0kJN2v7hRrBULA2" })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: programs,
    };
  }

  // Create an archive
  async createArchive(
    createProgramArchiveDto: CreateProgramArchiveDto,
  ): Promise<ProgramArchiveDocument> {
    return this.programArchiveModel.create(createProgramArchiveDto);
  }
  // Find program archive document by programId and userId
  async findByProgramId(
    findbyprogramIdDto: FindByProgramIdDto,
    userId: string,
  ): Promise<HttpResponseType<ProgramArchiveDocument>> {
    const programArchives = await this.programArchiveModel
      .findOne({
        programId: findbyprogramIdDto.programId,
        userId,
      })
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
  ): Promise<HttpResponseType<PaginatedProgramArchiveDocuments>> {
    // Calculate the number of documents to skip based on page and perPage
    const skip = (findByUserIdDto.page - 1) * findByUserIdDto.perPage;

    // Query for program archive documents by userId and populate the programId field
    const query = this.programArchiveModel
      .find({ userId })
      .populate("programId")
      .lean({ virtuals: true });

    console.log(await this.programArchiveModel.find({ userId }));

    // Query for the total number of documents that match the userId criteria
    const countQuery = this.programArchiveModel
      .find({ userId })
      .countDocuments();

    // Execute both queries in parallel and await the results
    const [docs, count] = await Promise.all([
      query.skip(skip).limit(findByUserIdDto.perPage),
      countQuery,
    ]);

    // Return an object with the paginated data and the total count of documents
    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: {
        docs,
        count,
      },
    };
  }

  /**
   * Finds programs archives by title.
   * @param userId - The ID of the user.
   * @param page - The page number to retrieve.
   * @param perPage - The number of programs to retrieve per page.
   * @param search - The search query to use.
   * @returns An HttpResponseType object with a status, message, and data field.
   */
  async findByTitle(
    userId: string,
    { page = 1, perPage = 10, search = "" }: ProgramsArchiveSearchDto,
  ): Promise<HttpResponseType<PaginatedProgramArchiveDocuments>> {
    // Calculate the number of documents to skip based on the page and perPage parameters.
    const skip = (page - 1) * perPage;

    // Define an array to hold the stages of the aggregation pipeline.
    const queryPipeline = [];

    // If a search query is provided, add the necessary stages to the pipeline.
    if (search) {
      queryPipeline.push(
        // Use the $lookup stage to join the programs collection and retrieve the program document for each archive document.
        {
          $lookup: {
            from: "programs",
            localField: "programId",
            foreignField: "_id",
            as: "program",
          },
        },
        // Use the $unwind stage to flatten the program array.
        { $unwind: "$program" },
        // Use the $match stage to filter the documents by the program title matching the search query.
        { $match: { "program.title": { $regex: search, $options: "i" } } },
      );
    }

    // Add the remaining stages to the pipeline.
    queryPipeline.push(
      // Use the $match stage to filter the documents by the user ID.
      { $match: { userId } },
      // Use the $facet stage to execute multiple pipelines on the same set of documents.
      {
        $facet: {
          // Use the 'data' pipeline to retrieve the data to be displayed.
          data: [
            { $skip: skip },
            { $limit: perPage },
            { $sort: { createdAt: -1 } },
          ],
          // Use the 'count' pipeline to count the total number of documents that match the query.
          count: [{ $count: "totalCount" }],
        },
      },
    );

    // Execute the aggregation pipeline and retrieve the data and count fields.
    const data = await this.programArchiveModel.aggregate(queryPipeline);

    // If no documents were found, return an error message.
    if (data.length === 0) {
      return {
        status: OperationStatus.ERROR,
        message: "No documents found",
        data: { docs: [], count: 0 },
      };
    }

    // Check if the count array is not empty before accessing the totalCount property.
    const count = data[0]?.count[0]?.totalCount || 0;

    // Return an HttpResponseType object with the retrieved data and count fields.
    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: { docs: data[0].data, count },
    };
  }
}
