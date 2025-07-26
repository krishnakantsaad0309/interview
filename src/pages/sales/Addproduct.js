import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from 'react-toastify';

export default function Addproduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.price.trim()) newErrors.price = "Price is required";
        if (!formData.image) newErrors.image = "Image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("image", formData.image);
            data.append("token", token);

           const response =  await axios.post(
                "/add-product",
                data
            );

            toast.success(response.data.message || "Product added successfully!");
            navigate("/Product");
        } catch (error) {
            console.error("Error:", error);
            if (error.response?.status === 401) {
                alert("Session expired. Redirecting to login...");
                navigate("/login");
            } else {
                alert(error.response?.data?.message || "Something went wrong. Please try again.");
            }
        }
    };

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
                    <h3 className="!text-defaulttextcolor text-left text-[1.125rem] font-semibold">
                        Add Product
                    </h3>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700">
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* Product Name */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Product Name
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Product Name"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1 text-left">{errors.name}</p>}
                            </div>

                            {/* Product Image */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Product Image
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 20 16">
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                {errors.image && <p className="text-red-600 text-sm mt-1 text-left">{errors.image}</p>}
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 w-28 h-28 object-cover rounded border"
                                    />
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full px-3 py-3 text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm mt-1 text-left">{errors.description}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Price
                                </label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="number"
                                    placeholder="Price"
                                />
                                {errors.price && <p className="text-red-600 text-sm mt-1 text-left">{errors.price}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <Link
                                    to="/Product"
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                >
                                    Back
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}
