import React, { useState } from "react";
import { Formik, Form } from "formik";
//import "../index.css";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";
import { Notification } from "../../../../services/redux/types/notification";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentNotification, updateAllNotifications, updateNotificationItem } from "../../../../services/redux/slices/notification-slice";


const NotificationPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const obj = useAppSelector(selectCurrentNotification);
  const [currentNotification, setCurrentNotification] = useState(obj);

  const setNotification = async (key: string, value: boolean) => {
    var lastValue = Object.entries(currentNotification)
      .filter(n => n[0] === key && n[1] === value);

    if (lastValue[1])
      return;

    const obj = { ...currentNotification, [key]: value };
    setCurrentNotification(obj);
    await dispatch(updateNotificationItem({ key, value, obj }));
  }

  const handleSubmit = async (values: Notification) => {
    await dispatch(updateAllNotifications(obj));
  };

  const toggleSwitchLabel = "outline-none font-medium p-[2px]";
  return (
    <div>
      <Formik
        initialValues={obj}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full profile-form h-full">          
            <div className="flex flex-col relative p-5">
              <div className="flex w-full">
                <label className="text-[15px] outline-none font-bold p-[2px]">
                  General Notifications
                </label>
              </div>
              <div className="flex w-full">
                <label                  
                  className="text-[15px] outline-none font-bold p-[2px]"
                  style={{ marginLeft: "400px" }}
                >
                  Email
                </label>
                <label
                  className="text-[15px] outline-none font-bold p-[2px]"
                  style={{ marginLeft: "40px" }}
                >
                  In-app
                </label>
              </div>
              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="allNotificationsEmail"
                  >
                    All Notifications
                  </label>
                  <ToggleSwitch
                    id="allNotificationsEmail"
                    onChange={(event) => setNotification("allNotificationsEmail", event)}
                    isChecked={currentNotification.allNotificationsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="allNotificationsInApp"
                    onChange={(event) => setNotification("allNotificationsInApp", event)}
                    isChecked={currentNotification.allNotificationsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="programsEmail"
                  >
                    Programs
                  </label>
                  <ToggleSwitch
                    id="programsEmail"
                    onChange={(event) => setNotification("programsEmail", event)}
                    isChecked={currentNotification.programsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="programsInApp"
                    onChange={(event) => setNotification("programsInApp", event)}
                    isChecked={currentNotification.programsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="tasksEmail"
                  >
                    Tasks
                  </label>
                  <ToggleSwitch
                    id="tasksEmail"
                    onChange={(event) => setNotification("tasksEmail", event)}
                    isChecked={currentNotification.tasksEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="tasksInApp"
                    onChange={(event) => setNotification("tasksInApp", event)}
                    isChecked={currentNotification.tasksInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="approvalRequestsEmail"
                  >
                    Approval Requests
                  </label>
                  <ToggleSwitch
                    id="approvalRequestsEmail"
                    onChange={(event) => setNotification("approvalRequestsEmail", event)}
                    isChecked={currentNotification.approvalRequestsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="allNotificationsInApp"
                    onChange={(event) => setNotification("approvalRequestsInApp", event)}
                    isChecked={currentNotification.approvalRequestsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="reportsEmail"
                  >
                    Reports
                  </label>
                  <ToggleSwitch
                    id="reportsEmail"
                    onChange={(event) => setNotification("reportsEmail", event)}
                    isChecked={currentNotification.reportsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="reportsInApp"
                    onChange={(event) => setNotification("reportsInApp", event)}
                    isChecked={currentNotification.reportsInApp}
                  />
                </div>
              </div>
            </div>

            <div className="flex mt-5 flex-col relative p-5">
              <div className="flex w-full">
                <label className="text-[15px] outline-none font-bold p-[2px]">

                  Discussion Notifications
                </label>
              </div>
              <div className="flex w-full">
                <label
                  className="text-[15px] outline-none font-bold p-[2px]"
                  style={{ marginLeft: "400px" }}
                >

                  Email
                </label>
                <label
                  className="text-[15px] outline-none font-bold p-[2px]"
                  style={{ marginLeft: "40px" }}
                >

                  In-app
                </label>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="commentsOnMyPostsEmail"
                  >
                    Comments on my post
                  </label>
                  <ToggleSwitch
                    id="commentsOnMyPostsEmail"
                    onChange={(event) => setNotification("commentsOnMyPostsEmail", event)}
                    isChecked={currentNotification.commentsOnMyPostsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="commentsOnMyPostsInApp"
                    onChange={(event) => setNotification("commentsOnMyPostsInApp", event)}
                    isChecked={currentNotification.commentsOnMyPostsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="postsEmail"
                  >
                    Posts
                  </label>
                  <ToggleSwitch
                    id="postsEmail"
                    onChange={(event) => setNotification("postsEmail", event)}
                    isChecked={currentNotification.postsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="postsInApp"
                    onChange={(event) => setNotification("postsInApp", event)}
                    isChecked={currentNotification.postsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="commentsEmail"
                  >
                    Comments
                  </label>
                  <ToggleSwitch
                    id="commentsEmail"
                    onChange={(event) => setNotification("commentsEmail", event)}
                    isChecked={currentNotification.commentsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="commentsInApp"
                    onChange={(event) => setNotification("commentsInApp", event)}
                    isChecked={currentNotification.commentsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="mentionsEmail"
                  >
                    Mentions
                  </label>
                  <ToggleSwitch
                    id="mentionsEmail"
                    onChange={(event) => setNotification("mentionsEmail", event)}
                    isChecked={currentNotification.mentionsEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="mentionsInApp"
                    onChange={(event) => setNotification("mentionsInApp", event)}
                    isChecked={currentNotification.mentionsInApp}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className={toggleSwitchLabel}
                    style={{ width: "400px" }}
                    htmlFor="directMessagesEmail"
                  >
                    Direct Messages
                  </label>
                  <ToggleSwitch
                    id="directMessagesEmail"
                    onChange={(event) => setNotification("directMessagesEmail", event)}
                    isChecked={currentNotification.directMessagesEmail}
                  />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch
                    id="directMessagesInApp"
                    onChange={(event) => setNotification("directMessagesInApp", event)}
                    isChecked={currentNotification.directMessagesInApp}
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
