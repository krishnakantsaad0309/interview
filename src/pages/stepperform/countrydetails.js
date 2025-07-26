import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from "../../api/axios";

export default function Countrydetails({ formData, handleSelectChange }) {
    const [errors, setErrors] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);

    useEffect(() => {
        axios.get("/country-list")
            .then(res => {
                const options = res.data.data.map(country => ({
                    value: String(country.id),
                    label: country.name
                }));
                setCountryList(options);
            })
            .catch(err => console.error("Country fetch error:", err));
    }, []);

    useEffect(() => {
        if (!formData.countryId) {
            setStateList([]);
            return;
        }

        axios.get(`/state-list?country_id=${formData.countryId}`)
            .then(res => {
                const filteredStates = res.data.data.filter(
                    s => s.country_id === parseInt(formData.countryId)
                );
                const options = filteredStates.map(state => ({
                    value: String(state.id),
                    label: state.name
                }));
                setStateList(options);

                if (options.length > 0) {
                    handleSelectChange("stateId", options[0].value);
                } else {
                    handleSelectChange("stateId", "");
                }
            })
            .catch(err => {
                console.error("State fetch error:", err);
                setStateList([]);
                handleSelectChange("stateId", "");
            });
    }, [formData.countryId]);


    const handleBlur = (field) => {
        const value = formData[field];
        if (!value) {
            setErrors(prev => ({ ...prev, [field]: `Please select a ${field === "countryId" ? "country" : "state"}` }));
        } else {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleCountryChange = (selected) => {
        const countryId = selected?.value || '';
        handleSelectChange("stateId", "");
        setStateList([]);
        handleSelectChange("countryId", countryId);
    };


    return (
        <div className="flex w-full p-2">
            <div className="w-full">
                <h1 className="text-left text-gray-800 text-2xl font-bold mb-6">Details</h1>
                <form>
                    <div className="grid gap-2 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                Select Country <span className="text-red-600 ml-1">*</span>
                            </label>
                            <Select
                                className="text-left text-sm text-gray-700 rounded border border-gray-200"
                                classNamePrefix="select"
                                options={countryList}
                                value={countryList.find(c => c.value === formData.countryId)}
                                onChange={handleCountryChange}
                                onBlur={() => handleBlur("countryId")}
                            />
                            {errors.countryId && <p className="text-red-500 text-xs text-left mt-1">{errors.countryId}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                Select State <span className="text-red-600 ml-1">*</span>
                            </label>
                            <Select
                                className="text-left text-sm text-gray-700 rounded border border-gray-200"
                                classNamePrefix="select"
                                options={stateList}
                                value={stateList.find(s => s.value === formData.stateId)}
                                onChange={(selected) => handleSelectChange("stateId", selected?.value)}
                                onBlur={() => handleBlur("stateId")}
                            />
                            {errors.stateId && <p className="text-red-500 text-xs text-left mt-1">{errors.stateId}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
