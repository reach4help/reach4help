import React, { useState } from "react";
import BeneficiariersRequestService from "../../services/beneficiariersRequestService";
import { BeneficiariesRequestModel } from "../../objectModel/BeneficiariesRequestModel"
import { useHistory } from "react-router-dom";

import Style from './BeneficiariesRequestComponet.module.css'
import GetSupport from './GetSupport'
import GetInvolved from './GetInvolved'
export default function BeneficiariesRequest() {
    const initialRequestState: BeneficiariesRequestModel = new BeneficiariesRequestModel({
        name: "",
        address: "",
        zipcode: "",
        email: "",
        phone: "",
        dob: new Date(), // date of birth
        reference: "", // how did you hear about us

        weakImuneSystem: false, // Do you have weakened Immune System?
        chronicIllness: false, // Do you have Chronic Illness?
        livingAlone: false, // Do you live alone with limited support network?
        sickWithCovid: false, // Are you currently sick or with Covid-19 symptoms?
        moreDetails: "", // If you would like to explain your situation, or would like to share more details, please write it here.

        helpType: "",
        groceryDelivery: "",
        miscellaneous: "",
    });
    const [requestObj, setRequestObj] = useState(initialRequestState);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    // Tab points either Get Support or Get Involved tab
    const [tab, setTab] = useState(0);
    return (
        <section className={Style.formsComponent}>
            <nav>
                <input type="button" value="Get Support" name="getSupport" className={Style.activeTab} onClick={() => setTab(0)} />
                <input type="button" value="Get Involved" name="getInvolved" onClick={() => setTab(1)} />
            </nav>
            {tab === 0 ? <GetSupport /> : <GetInvolved />}
        </section>
    )
}