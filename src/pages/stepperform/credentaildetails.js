import React from "react";
import { useEffect, useState } from "react";

export default function Credentaildetails({ formData, handleChange }) {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};

        // Email validation
        if (!formData.email) {
            errs.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errs.email = "Invalid email format";
        }

        // Password validation
        if (!formData.password) {
            errs.password = "Password is required";
        } else if (formData.password.length < 6) {
            errs.password = "Password must be at least 6 characters";
        } else if (!/[A-Za-z]/.test(formData.password) || !/\d/.test(formData.password)) {
            errs.password = "Password must contain both letters and numbers";
        }

        // Confirm password validation
        if (!formData.password_confirmation) {
            errs.password_confirmation = "Confirm password is required";
        } else if (formData.password !== formData.password_confirmation) {
            errs.password_confirmation = "Passwords do not match";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };


    useEffect(() => {
        validate();
    }, [formData]);

    return (
        <div className="flex w-full p-2">
            <div className="w-full">
                <h1 className="text-left text-gray-800 text-2xl font-bold mb-6">Credentials Details</h1>
                <form>
                    <div className="grid gap-2 md:grid-cols-3">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 text-left">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                name="password_confirmation"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1 text-left">{errors.password_confirmation}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
