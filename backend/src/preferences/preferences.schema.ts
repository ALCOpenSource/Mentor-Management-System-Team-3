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
      enableReportsNotifications: Boolean,
      enableProgramsNotifications: Boolean,
      enableTaskNotifcations: Boolean,
      enableApprovalRequestNotifications: Boolean,
    }),
  )
  generalNotifications: IGeneralNotifications;

  @Prop(
    raw({
      enableCommentsOnMyPostsNotification: Boolean,
      enablePostsNotifications: Boolean,
      enableCommentsNotifications: Boolean,
      enableMentionsNotifications: Boolean,
      enableDirectMessageNotifications: Boolean,
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
