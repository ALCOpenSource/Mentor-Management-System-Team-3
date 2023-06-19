import { useLocation } from "react-router-dom";
import AccordionCertificateElement from "../../../../components/data-components/accordion-certificate-element";
import { ProgramCertificate } from "../../../../services/axios/api-services/certificates-requests";

function CertificateDetails() {
    const location = useLocation();
    const certificate: ProgramCertificate = location.state;


    return (
        <section>
            <h1 className="ml-5">Certificate Details</h1>
            {
                (!certificate) && (<h2>Please select the certificate to view</h2>)
            }
            {
                certificate && (<AccordionCertificateElement isExpanded={true} alwaysExpanded={true} certificate={certificate} id="{index}" />)
            }
        </section>
    )
}

export default CertificateDetails;