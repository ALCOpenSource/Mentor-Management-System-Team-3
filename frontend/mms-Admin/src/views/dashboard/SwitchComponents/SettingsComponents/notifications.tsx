import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./index.css";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";

interface FormValues {
  userId: string;
  allNotificationsEmail: boolean;
  programsEmail: boolean;
  tasksEmail: boolean;
  approvalRequestsEmail: boolean;
  reportsEmail: boolean;
  commentsOnMyPostsEmail: boolean;
  postsEmail: boolean;
  commentsEmail: boolean;
  mentionsEmail: boolean;
  directMessagesEmail: boolean;
  allNotificationsInApp: boolean;
  programsInApp: boolean;
  tasksInApp: boolean;
  approvalRequestsInApp: boolean;
  reportsInApp: boolean;
  commentsOnMyPostsInApp: boolean;
  postsInApp: boolean;
  commentsInApp: boolean;
  mentionsInApp: boolean;
  directMessagesInApp: boolean;
}

const NotificationPage: React.FC = () => {
  const initialValues: FormValues = {
    userId: "",
    allNotificationsEmail: true,
    programsEmail: true,
    tasksEmail: true,
    approvalRequestsEmail: false,
    reportsEmail: true,
    commentsOnMyPostsEmail: false,
    postsEmail: true,
    commentsEmail: true,
    mentionsEmail: true,
    directMessagesEmail: false,
    allNotificationsInApp: false,
    programsInApp: true,
    tasksInApp: false,
    approvalRequestsInApp: true,
    reportsInApp: true,
    commentsOnMyPostsInApp: true,
    postsInApp: true,
    commentsInApp: true,
    mentionsInApp: true,
    directMessagesInApp: true,
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full profile-form  h-screen">
            <div className="flex flex-col relative p-5">
              <div className="flex w-full">
                <label className="text-[15px] strong-text">
                  {" "}
                  General Notifications{" "}
                </label>
              </div>
              <div className="flex w-full">
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "400px" }}
                >
                  {" "}
                  Email{" "}
                </label>
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "40px" }}
                >
                  {" "}
                  In-app{" "}
                </label>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="allNotificationsEmail"
                  >
                    All Notifications
                  </label>
                  <ToggleSwitch
                    id="allNotificationsEmail"
                    isChecked={initialValues.allNotificationsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="allNotificationsInApp"
                    isChecked={initialValues.allNotificationsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="programsEmail"
                  >
                    Programs
                  </label>
                  <ToggleSwitch
                    id="programsEmail"
                    isChecked={initialValues.programsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="programsInApp"
                    isChecked={initialValues.programsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="tasksEmail"
                  >
                    Tasks
                  </label>
                  <ToggleSwitch
                    id="tasksEmail"
                    isChecked={initialValues.tasksEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="tasksInApp"
                    isChecked={initialValues.tasksInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="approvalRequestsEmail"
                  >
                    Approval Requests
                  </label>
                  <ToggleSwitch
                    id="approvalRequestsEmail"
                    isChecked={initialValues.approvalRequestsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="allNotificationsInApp"
                    isChecked={initialValues.allNotificationsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="reportsEmail"
                  >
                    Reports
                  </label>
                  <ToggleSwitch
                    id="reportsEmail"
                    isChecked={initialValues.reportsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="reportsInApp"
                    isChecked={initialValues.reportsInApp}
                  />
                </div>
              </div>
            </div>

            <div className="flex mt-5 flex-col relative p-5">
              <div className="flex w-full">
                <label className="text-[15px] strong-text">
                  {" "}
                  Discussion Notifications{" "}
                </label>
              </div>
              <div className="flex w-full">
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "400px" }}
                >
                  {" "}
                  Email{" "}
                </label>
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "40px" }}
                >
                  {" "}
                  In-app{" "}
                </label>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="commentsOnMyPostsEmail"
                  >
                    Comments on my post
                  </label>
                  <ToggleSwitch
                    id="commentsOnMyPostsEmail"
                    isChecked={initialValues.commentsOnMyPostsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="commentsOnMyPostsInApp"
                    isChecked={initialValues.commentsOnMyPostsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="postsEmail"
                  >
                    Posts
                  </label>
                  <ToggleSwitch
                    id="postsEmail"
                    isChecked={initialValues.postsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="postsInApp"
                    isChecked={initialValues.postsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="commentsEmail"
                  >
                    Comments
                  </label>
                  <ToggleSwitch
                    id="commentsEmail"
                    isChecked={initialValues.commentsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="commentsInApp"
                    isChecked={initialValues.commentsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="mentionsEmail"
                  >
                    Mentions
                  </label>
                  <ToggleSwitch
                    id="mentionsEmail"
                    isChecked={initialValues.mentionsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="mentionsInApp"
                    isChecked={initialValues.mentionsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="directMessagesEmail"
                  >
                    Direct Messages
                  </label>
                  <ToggleSwitch
                    id="directMessagesEmail"
                    isChecked={initialValues.directMessagesEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="directMessagesInApp"
                    isChecked={initialValues.directMessagesInApp}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationPage;
