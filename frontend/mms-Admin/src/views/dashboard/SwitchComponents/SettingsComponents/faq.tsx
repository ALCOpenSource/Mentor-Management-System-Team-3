import React from "react";
import { Formik } from "formik";
import Accordion from "../../../../components/accordion/accordion";
import { AccordionData } from "../../../../components/accordion/accordion-item";
interface FormValues {
  generalFAQData: AccordionData[];
  technicalFAQData: AccordionData[];
}

const NotificationPage: React.FC = () => {
  const initialValues: FormValues = {
    generalFAQData: [],
    technicalFAQData: [],
  };

  for (let i = 1; i < 20; i++) {
    const component = (
      <div>
        <strong>This is the answer for question {i}.</strong> It is hidden by
        default, but shown when the title is clicked.
        <p> Check them and see if the exists</p>
        <b>Food</b>
      </div>
    );

    initialValues.generalFAQData.push({
      title: "Sample general question " + i,
      content: component,
    });

    initialValues.technicalFAQData.push({
      title: "Sample technical question " + i,
      content: component,
    });
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
  };

  return (
    <div className="h-full w-full relative max-w-[895px]">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <div className="h-full w-full max-w-[1095px]">
            <div style={{ maxHeight: "50%" }} className="flex flex-col max-w-[1095px] p-0">
              <label
                className="text-[15px] outline-none font-bold p-[2px]"
                style={{ fontSize: "20px" }}
              >
                General FAQ
              </label>
              <div className="max-h-[100%] scrollable-by-y overflow-x-hidden h-full ">
                <Accordion items={initialValues.generalFAQData} />

              </div>
            </div>

            <div style={{ maxHeight: "50%" }} className="flex flex-col p-0">
              <label
                className="text-[15px] outline-none my-3 font-bold p-[2px]"
                style={{ fontSize: "20px" }}
              >
                Technical FAQ
              </label>
              <div className="max-h-[100%] scrollable-by-y overflow-x-hidden h-full">
                <Accordion items={initialValues.technicalFAQData} />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NotificationPage;
