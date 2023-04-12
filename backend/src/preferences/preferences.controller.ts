import { Controller } from "@nestjs/common";
import { PreferencesService } from "./preferences.service";

@Controller("preferences")
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}
}
