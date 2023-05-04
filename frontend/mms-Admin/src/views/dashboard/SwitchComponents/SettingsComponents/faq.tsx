import React from "react";
import { Formik, Form } from "formik";
import "./index.css";
import Accordion from "../../../../components/accordion/accordion";
import { AccordionData } from "../../../../components/accordion/accordion-item";
interface FormValues { 
    generalFAQData:AccordionData[],
    technicalFAQData:AccordionData[]
}

const NotificationPage: React.FC = () => {
  const initialValues: FormValues = {
     generalFAQData: [],
     technicalFAQData: []
  };

  for(let i = 1; i < 10; i++){
    const component = (
        <div>
          <strong>This is the answer for question {i}.</strong> It is hidden
          by default, but shown when the title is clicked. 
          <p> Check them and see if the exists</p>
          <b>Food</b>
        </div>
      );

    initialValues.generalFAQData.push({
        title:"Sample general question "+i, 
        content: component
    });

    initialValues.technicalFAQData.push({
        title:"Sample general question "+i, 
        content: component
    });
  }
  
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full profile-form h-screen">
            <div style={{maxHeight:"50%"}} className="flex flex-col p-5">
            <div className="scrollable-items-container">
              <div className="flex w-full">
                <label className="text-[15px] strong-text" style={{fontSize:"20px"}} >
                  General FAQ
                </label>
              </div>
                 <Accordion items={initialValues.generalFAQData} />
              </div>             
            </div>

            <div style={{maxHeight:"50%"}} className="flex mt-5 flex-col p-5">
            <div className="scrollable-items-container">
              <div className="flex w-full">
                <label className="text-[15px] strong-text" style={{fontSize:"20px"}} >
                  Technical FAQ
                </label>
              </div>              
                 <Accordion items={initialValues.technicalFAQData} />
              </div> 
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationPage;
