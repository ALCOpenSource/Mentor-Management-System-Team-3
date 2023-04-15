import { Test, TestingModule } from "@nestjs/testing";
import { ProgramsArchiveService } from "./programs-archive.service";

describe("ProgramsArchiveService", () => {
  let service: ProgramsArchiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramsArchiveService],
    }).compile();

    service = module.get<ProgramsArchiveService>(ProgramsArchiveService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
