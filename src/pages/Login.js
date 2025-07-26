import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", {
                email,
                password
            });

            if (response.data.success) {
                const { token, role } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                toast.success(response.data.message || "Login successful!");

                if (role === "Admin") {
                    navigate("/List");
                } else if (role === "User") {
                    navigate("/Product");
                }
            } else {
                toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <section
            className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
            style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
        >
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-96 flex">
                        <div className="w-full bg-login p-6 rounded-lg">
                            <div className="heading-1 pt-10 m-auto">
                                <img
                                    src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                                    alt="login-img"
                                    className="rounded-full m-auto p-1 border"
                                    width="100px"
                                    height="100px"
                                />
                                <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                                    Login
                                </h3>
                            </div>
                            <form className="pt-8 rounded" onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
