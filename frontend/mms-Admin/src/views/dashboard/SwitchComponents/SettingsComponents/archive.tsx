import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { object, array, string } from "yup";
import "./archive.css";
import googleIconSVG from "../../../../assets/images/programs/GoogleIcon.svg";
import searchIconSVG from "../../../../assets/images/search.svg";
import Calender from "../../../../assets/images/programs/Calender.svg";
import TimerIn from "../../../../assets/images/programs/TimerIn.svg";
import TimerOut from "../../../../assets/images/programs/TimerOut.svg";
import NavigationFirst from "../../../../assets/images/programs/NavigationFirst.svg";
import NavigationLast from "../../../../assets/images/programs/NavigationLast.svg";
import NavigationNext from "../../../../assets/images/programs/NavigationNext.svg";
import NavigationPrevious from "../../../../assets/images/programs/NavigationPrevious.svg";
import DropdownListIcon from "../../../../assets/images/programs/DropdownListIcon.svg";
import { getShortDate, getShortTime } from "../../../../services/dateFunctions";
import { getRandomInteger } from "../../../../services/mathFunctions";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
//import { getArchivesApiAsync } from "../../../../services/axios/api-services/archives";

interface ProgramProp {
  name: string;
  date: Date;
  icon: any;
}
interface FormValues {
  programs: ProgramProp[];
}

const initialValues: FormValues = {
  programs: [],
};

for (let i = 0; i < 100; i++) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
  initialValues.programs.push({
    name: "Google Africa Scholarship Program " + i,
    date: date,
    icon: googleIconSVG,
  });
}

const App: React.FC = () =>
{
  const token = useAppSelector(selectCurrentUserToken); 

  // useEffect(() =>  {
  // getArchivesApiAsync(token)
  // .then(data => 
  //   console.log("archives", data))
  // .catch(err:any => console.error(err));
  // }, []);

  return (
  <div className="w-full profile-form h-screen">
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues) => console.log(values)}
      validationSchema={object().shape({
        programs: array().of(
          object().shape({
            firstName: string().required("Entering a first name is required"),
          })
        ),
      })}
      render={({ handleSubmit, errors, touched, values }) => (
        <Form className="w-full h-screen">
          <div className="search-box-div">
            <img src={searchIconSVG} style={{ marginTop: "1px" }} alt="search icon" className="m_icon" />
            <Field
              type="text"
              id="searchArchive"
              name="searchArchive"
              placeholder="Search archive"
              className="text-input input-icon-label ms-1 mt-0 ps-7 border-2 border-lightGray-two rounded-[5px] text-[15px] "
            />
            <div className="mt-5">
              <button type="submit" className="navigation-button">
                <img
                  src={NavigationFirst}
                  alt="Attach file icon"
                  className="dropdown-icon"
                />
              </button>

              <button type="submit" className="navigation-button">
                <img
                  src={NavigationPrevious}
                  alt="Attach file icon"
                  className="dropdown-icon"
                />
              </button>
              <label className="text-label" htmlFor="github">
                1 - 10 of 20
              </label>
              <button type="submit" className="navigation-button">
                <img
                  src={NavigationNext}
                  alt="Attach file icon"
                  className="dropdown-icon"
                />
              </button>

              <button type="submit" className="navigation-button">
                <img
                  src={NavigationLast}
                  alt="Attach file icon"
                  className="dropdown-icon"
                />
              </button>
            </div>
          </div>

          <div className="w-full profile-form archives-items-container h-screen">
            <FieldArray
              name="programs"
              render={(helpers) => (
                <div>
                  {values.programs && values.programs.length > 0
                    ? values.programs.map(
                      (
                        program: ProgramProp,
                        index: React.Key | null | undefined
                      ) => (
                        <React.Fragment key={index}>
                          <label htmlFor="pet" className="w-full">
                            <div className="program-border flex flex-row mt-[10px]">
                              <img
                                src={program.icon}
                                alt="profile logo"
                                className="program-icon"
                              />
                              <div className="w-full">
                                <label
                                  className="program-title pt-0"
                                  htmlFor="about"
                                >
                                  {program.name}
                                </label>
                                <div className="flex flex-row mt-2 relative  w-full">
                                  <button
                                    type="submit"
                                    className="calender-button"
                                  >
                                    <img
                                      src={Calender}
                                      alt="Attach file icon"
                                      className="calender-icon"
                                    />
                                  </button>
                                  <label
                                    className="small-text"
                                    htmlFor="about"
                                  >
                                    {getShortDate(program.date)}
                                  </label>

                                  <button
                                    type="submit"
                                    className="timer-button"
                                  >
                                    <img
                                      src={TimerIn}
                                      alt="Attach file icon"
                                      className="calender-icon p-1"
                                      style={{ left: "2px", bottom: "3px" }}
                                    />
                                    <img
                                      src={TimerOut}
                                      alt="Attach file icon"
                                      className="calender-icon"
                                    />
                                  </button>
                                  <label
                                    className="small-text"
                                    style={{ left: "302px" }}
                                    htmlFor="about"
                                  >
                                    {getShortTime(program.date)}
                                  </label>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="dropdown-button"
                              >
                                <img
                                  src={DropdownListIcon}
                                  alt="Attach file icon"
                                  className="dropdown-icon"
                                />
                              </button>
                            </div>
                          </label>
                        </React.Fragment>
                      )
                    )
                    : null}
                </div>
              )}
            />
          </div>
        </Form>
      )}
    ></Formik>
  </div>
)};
export default App;
