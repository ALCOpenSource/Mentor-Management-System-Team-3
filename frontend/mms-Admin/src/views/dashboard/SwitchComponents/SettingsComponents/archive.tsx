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

                <button type="button" className="btn-animate navigation-button">
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
                                      className="btn-secondary mr-5 right-8 timer-button ml-8"
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
                                  className="dropdown-button px-5"
                                >
                                  <svg className="transform rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7175 16.7175C14.9359 18.4991 12.5196 19.5 10 19.5C8.75244 19.5 7.5171 19.2543 6.36451 18.7769C5.21191 18.2994 4.16464 17.5997 3.28249 16.7175C1.50089 14.9359 0.5 12.5196 0.5 10C0.5 7.48044 1.50089 5.06408 3.28249 3.28249C4.16464 2.40033 5.21191 1.70056 6.36451 1.22314C7.5171 0.745725 8.75244 0.5 10 0.5C11.2476 0.5 12.4829 0.745725 13.6355 1.22314C14.7881 1.70056 15.8354 2.40033 16.7175 3.28249C17.5997 4.16464 18.2994 5.21191 18.7769 6.36451C19.2543 7.5171 19.5 8.75244 19.5 10C19.5 12.5196 18.4991 14.9359 16.7175 16.7175ZM3.98959 16.0104C5.58365 17.6045 7.74566 18.5 10 18.5C12.2543 18.5 14.4163 17.6045 16.0104 16.0104C17.6045 14.4163 18.5 12.2543 18.5 10C18.5 7.74566 17.6045 5.58365 16.0104 3.98959C14.4163 2.39553 12.2543 1.5 10 1.5C7.74566 1.5 5.58365 2.39553 3.98959 3.98959C2.39553 5.58365 1.5 7.74566 1.5 10C1.5 12.2543 2.39553 14.4163 3.98959 16.0104ZM6.20711 11.5L10 7.70711L13.7929 11.5H6.20711Z" fill="#058B94" stroke="#058B94" />
                                  </svg>
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
