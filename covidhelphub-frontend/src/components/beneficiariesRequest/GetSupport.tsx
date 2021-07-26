/**
* @description: this component will return a form of inputs for making requests 
                for getting support.
* @author: Neck
* @version: 0.1.0
* @since: July 26, 2021
*/

import React, { useState } from 'react'
import Style from './BeneficiariesRequestComponet.module.css'

// Get suport
export default function GetSupport() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [reference, setReference] = useState('')
    // step1: Personal Details, step2: Health Details, step3: Program Details, step4: submit
    const [step, setStep] = useState(0);

    /**
     * 
     * @param step screen number
     * @param stepTitle screen title
     * @returns component composed of steps and step title (screen title)
     */
    const steps = (step: number, stepTitle: string) => {
        return (
            <div>
                {step}
                <p>{stepTitle}</p>
            </div>
        )
    }

    /**
     * handelChange method
     * @param e input event
     */
    const handelChange = (e: any) => {
        const { name, value } = e.target
        name === "name" ? setName(value) :
            name === "address" ? setAddress(value) :
                name === "zipcode" ? setZipcode(value) :
                    name === "email" ? setEmail(value) :
                        name === "phone" ? setPhone(value) : setReference(value)
    }

    /**
     * Personal Details
     * @returns 
     */
    const personalDetails = () => {
        return (
            <div className={Style.personalDetails}>
                <h2 className={Style.informationCategory}>Personal Details</h2>
                {/* personal details inputs */}
                <form onSubmit={(event) => { event.preventDefault(); setStep(step + 1) }}>
                    {/* name */}
                    <label>
                        <span>Full Name</span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            required
                            placeholder="Full Name"
                            onChange={(e) => handelChange(e)}
                        />
                    </label>

                    {/* Address */}
                    <label>
                        <span>Address</span>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            required
                            placeholder="Appartment/Building Name"
                            onChange={(e) => handelChange(e)}
                        />
                    </label>

                    {/* Zipcode */}
                    <label>
                        <span>Zipcode</span>
                        <input
                            type="text"
                            value={zipcode}
                            name="zipcode"
                            required
                            placeholder="Zipcode"
                            onChange={(e) => handelChange(e)}
                            className={Style.zipcodeInput}
                        />
                    </label>

                    {/* Email */}
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={(e) => handelChange(e)}
                        />
                    </label>

                    {/* phone */}
                    <label>
                        <span>Phone Number</span>
                        <input
                            type="text"
                            required
                            placeholder="Phone Number"
                            value={phone}
                            name="phone"
                            onChange={(e) => handelChange(e)}
                        />
                    </label>

                    {/* How Did you hear about us? */}
                    <label>
                        <span>How Did you hear about us?</span>
                        <select name="reference" value={reference} onChange={e => handelChange(e)}>
                            <option></option>
                            <option value="place one">place one</option>
                            <option value="place two">place two</option>
                            <option value="place three">place three</option>
                        </select>
                    </label>

                    <input type="submit" value="Next" className={Style.submit}/>
                </form>
                {/* next button */}

                {steps(step + 1, "Personal Details")}
            </div>
        )
    }
    /**
     * Health Details
     * @returns 
     */
    const healthDetails = () => {
        return (
            <div>
                <h2 className={Style.informationCategory}>Health Details</h2>

                {/* next button */}
                <input type="button" value="Next" onClick={() => setStep(2)} />
                {steps(step + 1, "Health Details")}
            </div>
        )
    }
    /**
     * program Details
     * @returns 
     */
    const programDetails = () => {
        return (
            <div>
                <h2 className={Style.informationCategory}>Program Details</h2>

                {/* next button */}
                <input type="button" value="Next" onClick={() => setStep(3)} />
                {steps(step + 1, "Program Details")}
            </div>
        )
    }

    /**
     * submit request
     * @returns 
     */
    const submitRequest = () => {
        return (
            <div>
                <h2 className={Style.informationCategory}>Submit Request</h2>
            </div>
        )
    }

    // return
    return (
        <div className={Style.getSupport}>
            {
                step === 0 ? personalDetails() : step === 1 ? healthDetails() : step === 2 ? programDetails() : submitRequest()
            }

        </div>
    )
}