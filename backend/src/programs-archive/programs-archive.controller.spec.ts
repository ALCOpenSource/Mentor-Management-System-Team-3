import { Test, TestingModule } from "@nestjs/testing";
import { ProgramsArchiveController } from "./programs-archive.controller";

describe("ProgramsArchiveController", () => {
  let controller: ProgramsArchiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsArchiveController],
    }).compile();

    controller = module.get<ProgramsArchiveController>(
      ProgramsArchiveController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
