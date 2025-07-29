import React, { useState } from "react";

export default function Personaldetails({ formData, handleChange, handleFileChange }) {
    const [errors, setErrors] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        handleFileChange(file, previewUrl);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) return 'Name is required';
                break;
            case 'phoneNumber':
                if (!value) return 'Phone number is required';
                if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit phone number i.e. 70249337405';
                break;
            case 'gender':
                if (!value) return 'Gender is required';
                break;
            default:
                return '';
        }
        return '';
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return (
        <div className="flex w-full p-2">
            <div className="w-full">
                <h1 className="text-left text-gray-500 text-2xl font-bold mb-6">Personal Details</h1>
                <form>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left">Profile Image <span className="text-red-600 ml-1" >*</span></label>
                        <div className="mt-1 flex flex-col items-start">
                            <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                                <img
                                    src={formData.photoPreview || "/logo192.png"}
                                    alt="profilepic"
                                    className="object-cover w-full h-full"
                                />
                                {errors.name && <p className="text-red-500 text-xs text-left mt-1">{errors.name}</p>}
                            </span>
                            <div className="flex items-center justify-center text-white">
                                <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer">
                                    <span className="text-base leading-normal">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-x-7 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">Name<span className="text-red-600 ml-1" >*</span></label>
                            <input
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && <p className="text-red-500 text-xs text-left mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">Gender<span className="text-red-600 ml-1" >*</span></label>
                            <div className="flex space-x-7">
                                {["Male", "Female", "Others"].map((gender) => (
                                    <div key={gender} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender}
                                            checked={formData.gender === gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                                        />
                                        <label className="ms-2 text-sm font-medium text-gray-900">{gender}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.gender && <p className="text-red-500 text-xs text-left mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="grid gap-x-7 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">Phone Number<span className="text-red-600 ml-1" >*</span></label>
                            <input
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={12}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs text-left mt-1">{errors.phoneNumber}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
