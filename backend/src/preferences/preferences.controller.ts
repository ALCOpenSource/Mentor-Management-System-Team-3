import { Body, Controller, Get, Logger, Patch, Req } from "@nestjs/common";
import { PreferencesService } from "./preferences.service";
import {
  GeneralNotificationsDto,
  DiscussionNotificationsDto,
  PrivacyPreferencesDto,
} from "./dto/preference.dto";
import { HttpResponseType } from "../types/http-response.type";
import { PreferenceDocument } from "./preferences.schema";

@Controller("preferences")
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  /**
   * This code defines a PATCH endpoint to update general notification preferences for a user identified by the provided user ID.
   */

  @Patch("general")
  async updateGeneralNotifications(
    @Body() generalNotifications: GeneralNotificationsDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.updateGeneralNotifications(
      req.user.sub,
      generalNotifications,
    );
  }
  /**
   * This is a PATCH endpoint for updating discussion notifications preferences.
   * It takes in a DTO containing the new preferences and the user's request object.
   * It returns a Promise with the updated preferences for the user.
   */
  @Patch("discussion")
  async updateDiscussionNotifications(
    @Body() discussionNotifications: DiscussionNotificationsDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.updateDiscussionNotifications(
      req.user.sub,
      discussionNotifications,
    );
  }

  /**
   * This method updates the privacy preferences for a user with the provided data in the request body.
   *  It takes a PrivacyPreferencesDto object and the request object (req) as parameters, and returns an HttpResponseType object.
   */
  @Patch("privacy")
  async updatePrivacyPreferences(
    @Body() privacy: PrivacyPreferencesDto,
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.updatePrivacyPreferences(
      req.user.sub,
      privacy,
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
  @Get("privacy")
  async getPrivacyPreferences(
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.getPrivacyPreferencesByUid(req.user.sub);
  }
  @Get("general")
  async getGeneralPreferences(
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.getPreferencesByUid(req.user.sub);
  }
  @Get("discussion")
  async getDiscussionPreferences(
    @Req() req,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    return this.preferencesService.getDiscussionNotificationsByUid(
      req.user.sub,
    );
  }
}
