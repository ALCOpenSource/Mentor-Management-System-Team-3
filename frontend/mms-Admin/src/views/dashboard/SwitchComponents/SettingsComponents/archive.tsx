import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { getArchivesApiAsync } from "../../../../services/axios/api-services/archives";
import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { object, array, string } from 'yup';
import googleIconSVG from '../../../../assets/images/programs/GoogleIcon.svg';
import Calender from '../../../../assets/images/programs/Calender.svg';
import Timer from '../../../../assets/images/time.svg';
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
          <Form className="w-full ml-5 max-w-[900px] h-full">
            <div className="flex btn-animate flex-row items-start ml-auto right-0 px-[5px] max-w-[557px] py-[1px] gap-[14px] relative h-[57px] top-[-37px]">
              <SearchBox
                id="searchArchive"
                name="searchArchive"
                placeholder="Search archive"
                extraStyles="h-[38px] rounded-[5px] "
              />              
              <div className="mt-5 min-w-[250px] items-center justify-center">
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
                <label className="text-label text-[16px] top-0 whitespace-nowrap " htmlFor="github">
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

            <div className="w-full profile-form mt-[-20px] scrollable-by-y h-full">
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
                              <div className="border-[1px] border-gray-300 focus:border-lighterGreen-three hover:border-lighterGreen-two rounded-[5px] flex flex-row h-[71px] mt-[10px]">
                                <img
                                  src={program.icon}
                                  alt="profile logo"
                                  className="w-[47px] mt-[11.39px] ml-[30.78px] h-[49px]"
                                />
                                <div className="w-full">
                                  <label
                                    className="pt-0 text-[20px] font-bold relative top-3 left-7 text-customBlack-two"
                                    htmlFor="about"
                                  >
                                    {program.name}
                                  </label>
                                  <div className="flex flex-row mt-2 left-7 relative  w-full">
                                    <button
                                      type="button"
                                      className="btn-secondary calender-button"
                                    >
                                      <img
                                        src={Calender}
                                        alt="Attach file icon"
                                        className="w-[16.67px] h-[16.67px] mt-[2px]"
                                      />
                                    </button>
                                    <label
                                      className="text-[12px] text-gray-two ml-3 mt-[1px]"
                                      htmlFor="about"
                                    >
                                      {getShortDate(program.date)}
                                    </label>

                                    <button
                                      type="button"
                                      className="btn-secondary timer-button ml-8"
                                    >
                                      <img
                                        src={Timer}
                                        alt="Timer icon"
                                        className="w-[16.67px] h-[16.67px] mt-[2px]"
                                        style={{ left: "2px", bottom: "3px" }}
                                      />
                                    </button>
                                    <label
                                      className="text-[12px] text-gray-two ml-3 mt-[1px]"
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
