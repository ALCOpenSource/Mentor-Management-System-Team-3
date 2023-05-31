import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { getArchivesApiAsync } from "../../../../services/axios/api-services/archives";
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { object, array, string } from 'yup';
import googleIconSVG from '../../../../assets/images/programs/GoogleIcon.svg';
import searchIconSVG from '../../../../assets/images/search.svg';
import Calender from '../../../../assets/images/programs/Calender.svg';
import TimerIn from '../../../../assets/images/programs/TimerIn.svg';
import TimerOut from '../../../../assets/images/programs/TimerOut.svg';
import NavigationFirst from '../../../../assets/images/programs/NavigationFirst.svg';
import NavigationLast from '../../../../assets/images/programs/NavigationLast.svg';
import NavigationNext from '../../../../assets/images/programs/NavigationNext.svg';
import NavigationPrevious from '../../../../assets/images/programs/NavigationPrevious.svg';
import DropdownListIcon from '../../../../assets/images/programs/DropdownListIcon.svg';
import { getShortDate, getShortTime } from '../../../../services/dateFunctions';
import { getRandomInteger } from '../../../../services/mathFunctions';
import SearchBox from "../../../../components/search-box";

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
    name: 'Google Africa Scholarship Program ' + i,
    date: date,
    icon: googleIconSVG,
  });
}

const App: React.FC = () => {
  const token = useAppSelector(selectCurrentUserToken);

  useEffect(() => {
    getArchivesApiAsync(token)
      .then(data =>
        console.log("archives", data))
      .catch(err => console.error(err));
  });

  return (
    <div className="w-full h-full">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormValues) => console.log(values)}
        validationSchema={object().shape({
          programs: array().of(
            object().shape({
              firstName: string().required('Entering a first name is required'),
            })
          ),
        })}
        render={({ handleSubmit, errors, touched, values }) => (
          <Form className="w-full h-full">
            <div className="flex flex-row items-start mr-auto right-0 px-[5px] max-w-[557px] py-[10px] gap-[14px] relative h-[57px] top-[-37px]">
              <SearchBox
                id="searchArchive"
                name="searchArchive"
                placeholder="Search archive"
                extraStyles="h-[38px] rounded-[5px] "
              />              
              <div className="mt-5 min-w-[250px]">
                <button type="button" className="btn-secondary navigation-button">
                  <img
                    src={NavigationFirst}
                    alt="Attach file icon"
                    className="w-[20px] mx-1 h-[20px]"
                  />
                </button>

                <button type="button" className="btn-secondary navigation-button">
                  <img
                    src={NavigationPrevious}
                    alt="Attach file icon"
                    className="w-[20px] mx-1 h-[20px]"
                  />
                </button>
                <label className="text-label text-[16px] whitespace-nowrap " htmlFor="github">
                  1 - 10 of 20
                </label>
                <button type="button" className="btn-secondary navigation-button">
                  <img
                    src={NavigationNext}
                    alt="Attach file icon"
                    className="w-[20px] mx-1 h-[20px]"
                  />
                </button>

                <button type="button" className="btn-secondary navigation-button">
                  <img
                    src={NavigationLast}
                    alt="Attach file icon"
                    className="w-[20px] mx-1 h-[20px]"
                  />
                </button>
              </div>
            </div>

            <div className="w-full profile-form archives-items-container h-full">
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
                                    className="pt-0 main-sub-title text-sm text-customBlack-two"
                                    htmlFor="about"
                                  >
                                    {program.name}
                                  </label>
                                  <div className="flex flex-row mt-2 relative  w-full">
                                    <button
                                      type="button"
                                      className="btn-secondary calender-button"
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
                                      type="button"
                                      className="btn-secondary timer-button"
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
                                  type="button"
                                  className="dropdown-button"
                                >
                                  <img
                                    src={DropdownListIcon}
                                    alt="Attach file icon"
                                    className="btn-secondary dropdown-icon"
                                  />
                                </button>
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
                                        style={{ left: '2px', bottom: '3px' }}
                                      />
                                      <img
                                        src={TimerOut}
                                        alt="Attach file icon"
                                        className="calender-icon"
                                      />
                                    </button>
                                    <label
                                      className="small-text"
                                      style={{ left: '302px' }}
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
  )
};
export default App;
