import React, { useState } from 'react';
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Layout from "../component/Layout";
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const steps = ['Personal Information', 'Details', 'Skills Details', "Credential Details"];

export default function Stepperform() {
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        skills: [],
        gender: '',
        phoneNumber: '',
        countryId: '',
        stateId: '',
        photoPreview: '',
        token: localStorage.getItem("token") || '',
    });

    const [photo, setPhoto] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const validateStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    formData.name.trim() !== '' &&
                    formData.gender.trim() !== '' &&
                    formData.phoneNumber.trim() !== '' &&
                    formData.photoPreview !== ''
                );
            case 1:
                return (
                    formData.countryId.trim() !== '' &&
                    formData.stateId.trim() !== ''
                );
            case 2:
                return formData.skills.length > 0;
            case 3:
                return (
                    formData.email.trim() !== '' &&
                    formData.password.trim() !== '' &&
                    formData.password_confirmation.trim() !== '' &&
                    formData.password === formData.password_confirmation
                );
            default:
                return false;
        }
    };


    const handleFileChange = (file, preview) => {
        setPhoto(file);
        setFormData((prev) => ({
            ...prev,
            photoPreview: preview,
        }));
    };

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    payload.append(key, value.join(","));
                } else {
                    payload.append(key, value);
                }
            });

            if (photo) payload.append("photo", photo);

            try {
                const response = await axios.post("/register", payload);
                // alert(response.data.message || "Registration successful!");
                toast.success(response.data.message || "Registration successful!");
                setActiveStep(activeStep + 1);
            } catch (error) {
                console.error("Registration error:", error);
                alert(error.response?.data?.message || "Something went wrong. Please try again.");
            }
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Personaldetails formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />;
            case 1:
                return <Countrydetails formData={formData} handleSelectChange={handleSelectChange} />;
            case 2:
                return <Skillsdetails formData={formData} setFormData={setFormData} />;
            case 3:
                return <Credentaildetails formData={formData} handleChange={handleChange} />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <Layout>
            <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
                <h3 className="text-defaulttextcolor text-[1.125rem] font-semibold">Stepper Form</h3>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg mb-2">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg">
                    {activeStep === steps.length ? (
                        <div className="flex justify-center w-full mt-5">
                            <div className="p-8 m-4">
                                <Typography variant="h5" className='mt-10 mb-10 pb-10'>Thank you for submitting the form!</Typography>
                                <Link to="/List" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    View List
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Typography variant="h5">{getStepContent(activeStep)}</Typography>
                            <div className='flex justify-center'>
                                <div className='flex justify-between w-full mt-4'>
                                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                                    <div className='flex gap-2 justify-center'>
                                        <span className='text-sm font-bold'>Note:</span>
                                        <p className='text-sm' > All fields are required.</p>
                                    </div>
                                    <Button variant="contained" color="primary" onClick={handleNext} disabled={!validateStep()} >
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}
