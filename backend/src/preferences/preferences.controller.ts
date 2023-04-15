import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PreferencesService } from "./preferences.service";
import {
  GeneralNotificationsDto,
  DiscussionNotificationsDto,
  PrivacyPreferencesDto,
} from "./dto/preference.dto";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";
import { PreferenceDocument } from "./preferences.schema";

@Controller("preferences")
@UseGuards(FirebaseAuthGuard)
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  /**
   * This code defines a PATCH endpoint to update general notification preferences for a user identified by the provided user ID.
   */

  @Patch("general")
  async updateGeneralNotifications(
    @Body() generalNotificationsDto: GeneralNotificationsDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.updateGeneralNotifications(
      req.user.sub,
      generalNotificationsDto,
    );
  }
  /**
   * This is a PATCH endpoint for updating discussion notifications preferences.
   * It takes in a DTO containing the new preferences and the user's request object.
   * It returns a Promise with the updated preferences for the user.
   */
  @Patch("discussion")
  async updateDiscussionNotifications(
    @Body() discussionNotificationsDto: DiscussionNotificationsDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.updateDiscussionNotifications(
      req.user.sub,
      discussionNotificationsDto,
    );
  }

  /**
   * This method updates the privacy preferences for a user with the provided data in the request body.
   *  It takes a PrivacyPreferencesDto object and the request object (req) as parameters, and returns an HttpResponseType object.
   */
  @Patch("privacy")
  async updatePrivacyPreferences(
    @Body() privacyPreferencesDto: PrivacyPreferencesDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument>> {
    return this.preferencesService.updatePrivacyPreferences(
      req.user.sub,
      privacyPreferencesDto,
    );
  }

  /**
   * This endpoint is used to retrieve the preferences of the authenticated user.
   *  It returns an HTTP response with the preferences data in the body.
   */
  @Get()
  async getPreferences(
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument[]>> {
    Logger.log("getPreferences");
    return this.preferencesService.getPreferencesByUid(req.user.sub);
  }
}
