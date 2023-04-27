import { Controller, Get, Param, Query, Req } from "@nestjs/common";

import { ProgramsArchiveService } from "./programs-archive.service";
import { FindByUserIdDto } from "./dto/findbyuserid.dto";
import { FindByProgramIdDto } from "./dto/findbyprogramid.dto";
import { ProgramsArchiveSearchDto } from "./dto/program-archive-search.dto";

@Controller("programs-archive")
export class ProgramsArchiveController {
  constructor(
    private readonly programsArchiveService: ProgramsArchiveService,
  ) {}

  @Get()
  async findAll() {
    return this.programsArchiveService.findAll();
  }

  @Get("user")
  async findByUserId(@Query() findbyuserIdDto: FindByUserIdDto, @Req() req) {
    return this.programsArchiveService.findByUserId(
      req.user.sub,
      findbyuserIdDto,
    );
  }

  @Get("search")
  async findByTitle(
    @Query() programArchiveSearchDto: ProgramsArchiveSearchDto,
    @Req() req,
  ) {
    return this.programsArchiveService.findByTitle(
      req.user.sub,
      programArchiveSearchDto,
    );
  }

  @Get(":programId")
  async findByProgramId(
    @Param() findbyprogramIdDto: FindByProgramIdDto,
    @Req() req,
  ) {
    return this.programsArchiveService.findByProgramId(
      findbyprogramIdDto,
      req.user.sub,
    );
  }
}
