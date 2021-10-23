// import React, { useState } from "react";
// import RequestService from "../../services/RequestService";
// import { RequestModel } from "../../objectModel/RequestModel"
// import { useHistory } from "react-router-dom";

// const RequestCreateComponent = () => {
//   const initialRequestState: RequestModel = new RequestModel({
//     requestorName: "",
//     address: "",
//     phone: "",
//     programCode: "",
//     email: "",
//   });
//   const [requestObj, setRequestObj] = useState(initialRequestState);
//   const [submitted, setSubmitted] = useState(false);
//   const history = useHistory();


//   const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
//     const { name, value } = event.target;
//     setRequestObj({ ...requestObj, [name]: value });
//   };


//   const saveRequest = async () => {
//     const data = new RequestModel({
//       requestorName: requestObj.requestorName,
//       address: requestObj.address,
//       phone: requestObj.phone,
//       programCode: requestObj.programCode,
//       email: requestObj.email,
//       flexibleDate: requestObj.flexibleDate,
//       targetDate: requestObj.targetDate,
//     });

//     await RequestService.create(data);
//     history.push("/request/list")

//   };

//   const newRequest = () => {
//     setRequestObj(initialRequestState);
//     setSubmitted(false);
//   };


//   return (
//     <div className="submit-form">
//       {submitted ? (
//         <div>
//           <h4>You submitted successfully!</h4>
//           <button className="btn btn-success" onClick={newRequest}>
//             Add
//           </button>
//         </div>
//       ) : (
//         <div>
//           {
//              TextInputField(
// { fieldName: "requestorName", labelText: "Name" }
// )
//           }
//           {TextInputField({ fieldName: "address", labelText: "Address" })}
//           {TextInputField({ fieldName: "phone", labelText: "Phone" })}
//           {TextInputField({ fieldName: "programCode", labelText: "Program Code" })}
//           {TextInputField({ fieldName: "email", labelText: "Email" })}

//           <div className="form-group">
//             <label htmlFor="targetDate">Target Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="targetDate"
//               required
//               onChange={handleInputChange}
//               name="targetDate"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="flexibleDate">Flexible  Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="flexibleDate"
//               required
//               onChange={handleInputChange}
//               name="flexibleDate"
//             />
//           </div>

//           <button onClick={saveRequest} className="btn btn-success">
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestCreateComponent;


/**
* @description: this component will return a form of inputs for making requests 
                for getting support.
* @author: Neck
* @version: 0.1.0
* @since: July 26, 2021
*/

import React, { useState } from 'react'
import Style from './requestStyle.module.css'
import { RequestModel } from "../../objectModel/RequestModel"
import RequestService from "../../services/RequestService";
// import { useHistory } from "react-router-dom";

// Get suport
export default function GetSupport() {
    // const history = useHistory();
    let date: Date = new Date();
    const initialRequestState: RequestModel = new RequestModel({
        name: "",
        address: "",
        zipcode: "",
        email: "",
        phone: "",
        dob: date,
        reference: "",

        // Health details
        weakImuneSystem: "", // Do you have weakened Immune System?
        chronicIllness: "", // Do you have Chronic Illness?
        livingAlone: "", // Do you live alone with limited support network?
        sickWithCovid: "", // Are you currently sick or with Covid-19 symptoms?
        beneficiariesText: "",

        // program details
        vaccination: false,
        wellnessCalls: false,
        groceryDelivery: false,

        cannedAndPackagedGoods: { checked: false, value: "" },
        freezerOrRefrigeratedGoods: { checked: false, value: "" },
        fruitsAndVegetables: { checked: false, value: "" },
        dairyAndEggs: { checked: false, value: "" },
        meat: { checked: false, value: "" },
        bread: { checked: false, value: "" },
        yougurtTeaOrCoffee: { checked: false, value: "" },

        miscellaneous: "",
    });

    const [requestObj, setRequestObj] = useState(initialRequestState);
    // const [submitted, setSubmitted] = useState(false);

    // text inputs handler
    const handleInputChange = (event: { target: { name: string, value: string } }) => {
        const { name, value } = event.target;

        if (name === "cannedAndPackagedGoods" || name === "freezerOrRefrigeratedGoods" || name === "fruitsAndVegetables" || name === "dairyAndEggs" || name === "meat" || name === "bread" || name === "yougurtTeaOrCoffee") {
            let prop = requestObj[name]
            setRequestObj({ ...requestObj, [name]: { ...prop, value } });
        } else {
            setRequestObj({ ...requestObj, [name]: value });
        }

    };

    // checkbox handler
    const handleCheckBoxInput = (event: { target: { name: string } }) => {
        const name: string = event.target.name;
        if (name === "vaccination" || name === "wellnessCalls" || name === "groceryDelivery") {
            let check = !requestObj[name]
            setRequestObj({ ...requestObj, [name]: check });
        } else {
            let check = !requestObj[name].checked;
            let prop = requestObj[name]
            setRequestObj({ ...requestObj, [name]: { ...prop, checked: check } });
        }
    }

    // step1: Personal Details, step2: Health Details, step3: Program Details, step4: submit
    const [step, setStep] = useState(0);

    /**
     * Personal Details (Screen One)
     * @returns 
     */
    const PersonalDetails = () => {
        return (
            <div className={Style.personalDetails}>
                <h2 className={Style.informationCategory}>Personal Details</h2>
                {/* personal details inputs */}
                <form onSubmit={(event) => { event.preventDefault(); setStep(step + 1) }}>
                    {/* name */}
                    <label>
                        <span className={Style.inputTitle}>Full Name</span>
                        <input
                            type="text"
                            name="name"
                            value={requestObj.name}
                            required
                            placeholder="Full Name"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    {/* Address */}
                    <label>
                        <span className={Style.inputTitle}>Address</span>
                        <input
                            type="text"
                            name="address"
                            value={requestObj.address}
                            required
                            placeholder="Appartment/Building Name"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    {/* Zipcode */}
                    <label>
                        <span className={Style.inputTitle}>Zipcode</span>
                        <input
                            type="text"
                            value={requestObj.zipcode}
                            name="zipcode"
                            required
                            placeholder="Zipcode"
                            onChange={(e) => handleInputChange(e)}
                            className={Style.zipcodeInput}
                        />
                    </label>

                    {/* Email */}
                    <label>
                        <span className={Style.inputTitle}>Email</span>
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={requestObj.email}
                            name="email"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    {/* phone */}
                    <label>
                        <span className={Style.inputTitle}>Phone Number</span>
                        <input
                            type="text"
                            required
                            placeholder="Phone Number"
                            value={requestObj.phone}
                            name="phone"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    {/* Date of Birth */}
                    <label>
                        <span className={Style.inputTitle}>Date of Birth</span>
                        <input
                            type="date"
                            required
                            placeholder="Birthday"
                            value={requestObj.dob.toString()}
                            name="dob"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    {/* How Did you hear about us? */}
                    <label>
                        <span className={Style.inputTitle}>How Did you hear about us?</span>
                        <select name="reference" value={requestObj.reference} onChange={e => handleInputChange(e)}>
                            <option></option>
                            <option value="place one">place one</option>
                            <option value="place two">place two</option>
                            <option value="place three">place three</option>
                        </select>
                    </label>

                    {/* next button */}
                    <input type="submit" value="Next" className={Style.submit} />
                </form>
            </div>
        )
    }

    /**
     * Health Details (Screen Two)
     * @returns 
     */
    const HealthDetails = () => {
        // 1- immune system
        const WeakImmune = () => {
            let weakImmune = requestObj.weakImuneSystem === 'yes'
            let notWeakImmune = requestObj.weakImuneSystem === 'no'
            return (
                <div>
                    <span className={Style.inputTitle}>Do you have weakened Immune System?</span>
                    <div className={Style.radioButtonsWrapper}>
                        <label>
                            <div className={weakImmune ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, weakImuneSystem: "yes" })}></div>
                            <span>Yes</span>
                        </label>
                        <label>
                            <div className={notWeakImmune ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, weakImuneSystem: "no" })}></div>
                            <span>No</span>
                        </label>
                    </div>

                </div>
            )
        }

        // 2- Chronic Ill
        const ChronicIll = () => {
            let chronicIll = requestObj.chronicIllness === 'yes'
            let notChronicIll = requestObj.chronicIllness === 'no'
            return (
                <div>
                    <span className={Style.inputTitle}>Do you have Chronic Illness?</span>
                    <div className={Style.radioButtonsWrapper}>
                        <label>
                            <div className={chronicIll ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, chronicIllness: "yes" })}></div>
                            <span>Yes</span>
                        </label>
                        <label>
                            <div className={notChronicIll ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, chronicIllness: "no" })}></div>
                            <span>No</span>
                        </label>
                    </div>

                </div>
            )
        }

        // 3- Do you live alone with limited support network?
        const LivingCondition = () => {
            let livingAlone = requestObj.livingAlone === 'yes'
            let notLivingAlone = requestObj.livingAlone === 'no'
            return (
                <div>
                    <span className={Style.inputTitle}>Do you live alone with limited support network?</span>
                    <div className={Style.radioButtonsWrapper}>
                        <label>
                            <div className={livingAlone ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, livingAlone: "yes" })}></div>
                            <span>Yes</span>
                        </label>
                        <label>
                            <div className={notLivingAlone ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, livingAlone: "no" })}></div>
                            <span>No</span>
                        </label>
                    </div>

                </div>
            )
        }

        // 4- Are you currently sick or with Covid-19 symptoms?
        const SickWithCovid = () => {
            let sick = requestObj.sickWithCovid === 'yes'
            let notSick = requestObj.sickWithCovid === 'no'
            return (
                <div>
                    <span className={Style.inputTitle}>Are you currently sick or with Covid-19 symptoms?</span>
                    <div className={Style.radioButtonsWrapper}>
                        <label>
                            <div className={sick ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, sickWithCovid: "yes" })}></div>
                            <span>Yes</span>
                        </label>
                        <label>
                            <div className={notSick ? Style.activeRadioButton : Style.radioButton} onClick={() => setRequestObj({ ...requestObj, sickWithCovid: "no" })}></div>
                            <span>No</span>
                        </label>
                    </div>

                </div>
            )
        }

        // If you would like to explain your situation, or would like to share more details, please write it here.
        const BeneficiariesText = () => {
            return (
                <div>
                    <label className={Style.BeneficiariesTextLabel}>
                        <span className={Style.inputTitle}>If you would like to explain your situation, or would like to share more details, please write it here.</span>
                        <input
                            type="text"
                            name="beneficiariesText"
                            value={requestObj.beneficiariesText}
                            placeholder="Miscellaneous"
                            className={Style.BeneficiariesTextInput}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                </div>
            )
        }
        let next = requestObj.weakImuneSystem !== '' && requestObj.chronicIllness !== '' && requestObj.livingAlone !== '' && requestObj.sickWithCovid !== '';
        return (
            <div className={Style.healthDetails}>
                <h2 className={Style.informationCategory}>Health Details</h2>
                <form action="" onSubmit={(event) => {
                    event.preventDefault();
                    if (next) {
                        setStep(step + 1);
                    }
                }}>
                    <WeakImmune />
                    <ChronicIll />
                    <LivingCondition />
                    <SickWithCovid />
                    <BeneficiariesText />
                    <input type="submit" value="Next" className={next ? Style.submit : Style.inactiveSubmit} />
                </form>
            </div>
        )
    }

    /**
     * program Details (Screen Three)
     * @returns 
     */
    const ProgramDetails = () => {

        // 1- immune system
        const Vaccination = () => {
            return (
                <div className={Style.checkBoxDivs}>
                    <label>
                        <input
                            type="checkbox"
                            name="vaccination"
                            checked={requestObj.vaccination}
                            onChange={(e) => handleCheckBoxInput(e)}
                        />
                        <span>Vaccination</span>
                    </label>

                </div>
            )
        }
        // 2- Wellness Calls
        const WellnessCalls = () => {
            return (
                <div className={Style.checkBoxDivs}>
                    <label>
                        <input
                            type="checkbox"
                            name="wellnessCalls"
                            checked={requestObj.wellnessCalls}
                            onChange={(e) => handleCheckBoxInput(e)}
                        />
                        <span>Wellness Calls</span>
                    </label>

                </div>
            )
        }
        // 3- Grocery Delivery
        const GroceryDelivery = () => {
            return (
                <div className={Style.checkBoxDivs}>
                    <label>
                        <input
                            type="checkbox"
                            name="groceryDelivery"
                            checked={requestObj.groceryDelivery}
                            onChange={(e) => handleCheckBoxInput(e)}
                        />
                        <span>Grocery Delivery</span>
                    </label>

                </div>
            )
        }


        let groceryOptionsInputs = [
            [
                { title: "Canned and packaged goods" },
                { type: "checkbox", name: "cannedAndPackagedGoods", checked: requestObj.cannedAndPackagedGoods.checked },
                { type: "text", name: "cannedAndPackagedGoods", value: requestObj.cannedAndPackagedGoods.value, placeholder: "Canned and packaged goods", class: Style.input }
            ],
            [
                { title: "Freezer/Refrigerated goods" },
                { type: "checkbox", name: "freezerOrRefrigeratedGoods", checked: requestObj.freezerOrRefrigeratedGoods.checked },
                { type: "text", name: "freezerOrRefrigeratedGoods", value: requestObj.freezerOrRefrigeratedGoods.value, placeholder: "Freezer/Refrigerated goods", class: Style.input }
            ],
            [
                { title: "Fruits and vegetables" },
                { type: "checkbox", name: "fruitsAndVegetables", checked: requestObj.fruitsAndVegetables.checked },
                { type: "text", name: "fruitsAndVegetables", value: requestObj.fruitsAndVegetables.value, placeholder: "Fruits and vegetables", class: Style.input }
            ],
            [
                { title: "Dairy and eggs" },
                { type: "checkbox", name: "dairyAndEggs", checked: requestObj.dairyAndEggs.checked },
                { type: "text", name: "dairyAndEggs", value: requestObj.dairyAndEggs.value, placeholder: "Dairy and eggs", class: Style.input }
            ],
            [
                { title: "Meat" },
                { type: "checkbox", name: "meat", checked: requestObj.meat.checked },
                { type: "text", name: "meat", value: requestObj.meat.value, placeholder: "Meat", class: Style.input }
            ],
            [
                { title: "Bread" },
                { type: "checkbox", name: "bread", checked: requestObj.bread.checked },
                { type: "text", name: "bread", value: requestObj.bread.value, placeholder: "Bread", class: Style.input }
            ],
            [
                { title: "Yougurt, Tea, Coffee" },
                { type: "checkbox", name: "yougurtTeaOrCoffee", checked: requestObj.yougurtTeaOrCoffee.checked },
                { type: "text", name: "yougurtTeaOrCoffee", value: requestObj.yougurtTeaOrCoffee.value, placeholder: "Yougurt, Tea, Coffee", class: Style.input }
            ],
        ]
        // 4- Grocery Options
        const GroceryOptions = () => {
            return (
                <div>
                    <p className={Style.inputTitle}>Grocery delivery</p>
                    {
                        groceryOptionsInputs.map(input => {
                            return (
                                <div className={Style.checkBoxDivs}>
                                    <label>
                                        <input
                                            type={input[1].type}
                                            name={input[1].name}
                                            checked={input[1].checked}
                                            onChange={(e) => handleCheckBoxInput(e)}
                                        />
                                        <span>{input[0].title}</span>
                                    </label>
                                    {
                                        input[1].checked ?
                                            <input
                                                type={input[2].type}
                                                placeholder={input[2].placeholder}
                                                value={input[2].value}
                                                name={input[2].name}
                                                className={input[2].class}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            : null
                                    }
                                </div>
                            )
                        })
                    }
                    {/* H- miscellaneous */}
                    <label className={Style.BeneficiariesTextLabel}>
                        <span className={Style.inputTitle}>Miscellaneous</span>
                        <input
                            type="text"
                            name="miscellaneous"
                            value={requestObj.miscellaneous}
                            placeholder="Miscellaneous"
                            className={Style.BeneficiariesTextInput}
                            onChange={(e) => handleCheckBoxInput(e)}
                        />
                    </label>
                </div>
            )
        }
        let readyToSubmit = (requestObj.vaccination || requestObj.wellnessCalls) || (requestObj.groceryDelivery && (requestObj.cannedAndPackagedGoods || requestObj.freezerOrRefrigeratedGoods || requestObj.fruitsAndVegetables || requestObj.dairyAndEggs || requestObj.meat || requestObj.bread || requestObj.yougurtTeaOrCoffee))
        return (
            <div>
                <h2 className={Style.informationCategory}>Program Details</h2>
                <form onSubmit={(event) => { event.preventDefault(); if (readyToSubmit) setStep(step + 1) }}>
                    <div style={{ marginBottom: "13px" }}>
                        <span className={Style.inputTitle} >What type of help do you need?</span>
                    </div>
                    <Vaccination />
                    <WellnessCalls />
                    <GroceryDelivery />
                    {
                        requestObj.groceryDelivery ? <GroceryOptions /> : null
                    }

                    {/* next button */}
                    <input type="submit" value="Submit" className={readyToSubmit ? Style.submit : Style.inactiveSubmit} />
                </form>
            </div>
        )
    }


    const saveRequest = async () => {
        // const data = new RequestModel(requestObj);
        const data: RequestModel = requestObj
        await RequestService.create(data);
        setSubmitted(true)
        // history.push("/request/list")

    };
    /**
     * submit request
     * @returns 
     */
    const [isSubmitted, setSubmitted] = useState(false)
    const SubmitRequest = () => {
        saveRequest()
        return (
            <div>
                <h2 className={Style.informationCategory}>
                    {
                        isSubmitted ? "Request Sent" : "Sending Request..."
                    }
                </h2>
            </div>
        )
    }

    // return
    return (
        <div className={Style.getSupport}>
            {
                step === 0 ? PersonalDetails() :
                    step === 1 ? HealthDetails() :
                        step === 2 ? ProgramDetails() :
                            step === 3 ? SubmitRequest() : null
            }
            {
                step === 0 || step === 1 || step === 2 ? <DisplaySteps step={step} /> : null
            }


        </div>
    )
}

/**
 * This function is a functioanl component for displaying Beneficiaries
 * request steps at the bottom of the REQUEST FORM as he goes through screens
 * @param Props 
 * @version 0.1.0
 * @since August 02, 2021
 * @author Neck Ab
 */
function DisplaySteps(Props: any) {
    let screens = [
        { step: 0, title: "Personal Details" },
        { step: 1, title: "Health Details" },
        { step: 2, title: "Program Details" }
    ]

    return (
        <div className={Style.stepWrapper}>
            {
                screens.map(screen => {
                    return (
                        <div className={Style.stepWrapperItem}>
                            <div className={screen.step === Props.step ? Style.activeItemStep : Style.stepWrapperItemStep}>{screen.step + 1}</div>
                            <div className={screen.step === Props.step ? Style.activeItemTitle : Style.stepWrapperItemTitle}>{screen.title}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}