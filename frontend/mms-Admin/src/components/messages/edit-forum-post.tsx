import { Field, Form, Formik } from "formik";
import { DiscussionForumProp } from "../../views/dashboard/SwitchComponents/forums";
import * as Yup from "yup";
import FormikValidationMessageComponent from "../error-messages/formik-validation-message-component";

function EditForumPostPage(props: {
  forum?: DiscussionForumProp;
  closeHandle: () => void;
  onSubmit?: (obj: DiscussionForumProp) => void;
}): JSX.Element {

  const initialValues: DiscussionForumProp = props?.forum ?? {
    name: "",
    userGroup: "",
    details: "",
    title: "",
    date: new Date(),
    icon: {},
    message: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(
      "Title for the forum is required please"
    ),
    details: Yup.string().required(
      "Details for the forum is required please"
    )
  });

  const handleSubmit = async (values: DiscussionForumProp) => {
    try {
      if (props.onSubmit)
        props.onSubmit(values);

      if (props.closeHandle)
        props.closeHandle();
    } catch (exc) {
       
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full profile-form h-full max-w-[1095px]">
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
            className="fixed w-[100%] h-[100vh] p-5 bg-white z-50 top-0 left-0"
          >
            <div className="relative flex flex-col bg-white w-[850px] ml-auto mr-auto h-[100%] max-h-[520px] mt-[50px] border-gray-200 border-[4px] rounded-lg p-5 border-solid overflow-x-hidden overflow-y-hidden">
              <div className="flex flex-col my-3 justify-between">
                <label
                  className="w-full relative text-[24px] font-semibold leading-[39.89px] text-customBlack-one h-[33px] left-0 top-[12px] font-mukta pt-0"
                  htmlFor="about"
                >
                  {props?.forum ? "Edit Post" : "New Topic"}
                </label>

                <button onClick={() => { if (props.closeHandle) props.closeHandle() }} className="ml-auto mr-0 btn-secondary">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z" fill="#058B94" />
                  </svg>
                </button>
              </div>

              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter a title"
                className="text-input flex-wrap px-3 border-2 w-full rounded-[5px] my-3 text-[20px] "
              />
               <FormikValidationMessageComponent name="title" />

              <div className="flex border-2 rounded-lg hover:border-green-three focus:border-green-three border-lightGray-two flex-col mt-5 mb-[40px] pb-3 ">
                <Field
                  type="text"
                  id="details"
                  as="textarea"
                  name="details"
                  placeholder="Start typing..."
                  className="text-input border-2 min-h-[120px] border-none hover:border-none focus:border-none border-lightGray-two rounded-[5px] text-[15px] "
                />
                 
                <div className="flex px-3 flex-row relative w-full">
                  <button
                    type="button"
                    className="rounded-[10px] font-medium mt-0"
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6424 9.43311L14.6257 9.41634M8.39243 9.43311L8.37565 9.41634M7.33398 14.6247C7.33398 14.6247 7.46434 14.8854 7.77117 15.2224C8.33169 15.8379 9.48117 16.708 11.5007 16.708C13.5201 16.708 14.6696 15.8379 15.2301 15.2224C15.537 14.8854 15.6673 14.6247 15.6673 14.6247M11.5007 21.9163C5.74768 21.9163 1.08398 17.2526 1.08398 11.4997C1.08398 5.74671 5.74768 1.08301 11.5007 1.08301C17.2536 1.08301 21.9173 5.74671 21.9173 11.4997C21.9173 17.2526 17.2536 21.9163 11.5007 21.9163Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
                  >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.875 9.48569L11.3797 18.0925C9.03386 20.4692 5.23035 20.4692 2.88443 18.0925C0.538523 15.7158 0.538523 11.8624 2.88443 9.48569L9.96386 2.31335C11.5278 0.728883 14.0634 0.728883 15.6274 2.31335C17.1913 3.89782 17.1913 6.46675 15.6274 8.05122L8.54792 15.2235C7.76599 16.0158 6.49817 16.0158 5.71619 15.2235C4.93422 14.4313 4.93422 13.1468 5.71619 12.3546L12.7956 5.18229" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <FormikValidationMessageComponent name="details" />
              <button
                type="submit"
                className="ml-auto btn-primary mt-[200px]"
              >
                {props?.forum ? "Save Changes" : "Post to forum"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
};
export default EditForumPostPage;