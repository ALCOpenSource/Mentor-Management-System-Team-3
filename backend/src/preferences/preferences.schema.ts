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
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableReportsNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableProgramsNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableTaskNotifcations: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableApprovalRequestNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
    }),
  )
  generalNotifications: IGeneralNotifications;

  @Prop(
    raw({
      enableCommentsOnMyPostsNotification: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enablePostsNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableCommentsNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableMentionsNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
      enableDirectMessageNotifications: {
        inApp: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
    }),
  )
  discussionNotifications: IDiscussionNotifications;

  @Prop(
    raw({
      enableShowContactInfo: {
        type: Boolean,
        default: true,
      },
      enableGithubLinkVisibility: {
        type: Boolean,
        default: true,
      },
      enableInstagramLinkVisibility: {
        type: Boolean,
        default: true,
      },
      enableLinkedinLinkVisibility: {
        type: Boolean,
        default: true,
      },
      enableTwitterLinkVisibility: {
        type: Boolean,
        default: true,
      },
    }),
  )
  privacyPreferences: IPrivacyPreferences;

  @Prop({ type: String, sparse: true })
  createdBy: string;

  @Prop({ type: String, sparse: true })
  updatedBy: string;
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
