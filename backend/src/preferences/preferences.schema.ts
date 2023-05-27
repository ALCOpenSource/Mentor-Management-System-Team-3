import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
  IGeneralNotifications,
  IDiscussionNotifications,
  IPrivacyPreferences,
} from "./interfaces/preference.interface";

export type PreferenceDocument = HydratedDocument<Preferences>;

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Preferences {
  @Prop(
    raw({
      enableALLNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableReportsNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableProgramsNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableTaskNotifcations: {
        inApp: Boolean,
        email: Boolean,
      },
      enableApprovalRequestNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
    }),
  )
  generalNotifications: IGeneralNotifications;

  @Prop(
    raw({
      enableCommentsOnMyPostsNotification: {
        inApp: Boolean,
        email: Boolean,
      },
      enablePostsNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableCommentsNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableMentionsNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
      enableDirectMessageNotifications: {
        inApp: Boolean,
        email: Boolean,
      },
    }),
  )
  discussionNotifications: IDiscussionNotifications;

  @Prop(
    raw({
      enableAllSocialLinksVisibility: Boolean,
      enableGithubLinkVisibility: Boolean,
      enableInstagramLinkVisibility: Boolean,
      enableLinkedinLinkVisibility: Boolean,
      enableTwitterLinkVisibility: Boolean,
    }),
  )
  privacyPreferences: IPrivacyPreferences;

  @Prop({ type: String, sparse: true })
  createdBy: string;

  @Prop({ type: String, sparse: true })
  updatedBy: string;
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
