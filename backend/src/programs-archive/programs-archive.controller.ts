import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";

import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";
import { ProgramsArchiveService } from "./programs-archive.service";
import { FindByUserIdDto } from "./dto/findbyuserid.dto";

@Controller("programs-archive")
export class ProgramsArchiveController {
  constructor(
    private readonly programsArchiveService: ProgramsArchiveService,
  ) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async findByUserId(@Query() findbyuserIdDto: FindByUserIdDto, @Req() req) {
    return this.programsArchiveService.findByUserId(
      req.user.sub,
      findbyuserIdDto,
    );
  }

  @Get(":id")
  @UseGuards(FirebaseAuthGuard)
  async findByProgramId(@Param("programId") programId: string, @Req() req) {
    return this.programsArchiveService.findByProgramId(programId, req.user.sub);
  }
}
