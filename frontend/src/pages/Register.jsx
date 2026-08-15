import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Eye,
    EyeOff,
    CheckSquare,
    Loader2
} from "lucide-react";

import {
    registerUser
} from "../services/authService";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "member"
        });


    const [showPassword, setShowPassword] =
        useState(false);


    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    const [success, setSuccess] =
        useState("");


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));


        setError("");
        setSuccess("");
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.name.trim()) {

            setError(
                "Name is required."
            );

            return;
        }


        if (!formData.email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }


        if (formData.password.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);
            setError("");
            setSuccess("");


            const response =
                await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                });


            console.log(
                "Register response:",
                response
            );


            setSuccess(
                "Account created successfully. Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1200);


        } catch (err) {

    console.error("REGISTER ERROR:", err);

    console.log(
        "STATUS:",
        err.response?.status
    );

    console.log(
        "BACKEND RESPONSE:",
        err.response?.data
    );

    const backendData = err.response?.data;

    let message = "Registration failed. Please try again.";

    if (backendData?.message) {
        message = backendData.message;
    }

    if (backendData?.errors) {

        if (typeof backendData.errors === "object") {

            const validationErrors =
                Object.values(backendData.errors)
                    .filter(Boolean)
                    .join(", ");

            if (validationErrors) {
                message = validationErrors;
            }
        }
    }

    setError(message);

} finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Left */}

            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white">

                <div className="flex flex-col justify-center px-16 xl:px-24">

                    <div className="flex items-center gap-3 mb-8">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-900">

                            <CheckSquare
                                size={26}
                            />

                        </div>


                        <span className="text-2xl font-bold">
                            TaskFlow
                        </span>

                    </div>


                    <h1 className="text-5xl font-bold leading-tight">

                        Bring your team

                        <span className="block text-slate-400">
                            together.
                        </span>

                    </h1>


                    <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">

                        Create an account and start
                        managing your team's tasks,
                        deadlines and progress.

                    </p>

                </div>

            </div>


            {/* Right */}

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">

                <div className="w-full max-w-md">

                    <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-10">

                        <div className="mb-7">

                            <h2 className="text-3xl font-bold text-slate-900">
                                Create account
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Start managing your tasks today.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                                {error}

                            </div>

                        )}


                        {/* Success */}

                        {success && (

                            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

                                {success}

                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            {/* Name */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Full name
                                </label>


                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Sonu Kumar"
                                    autoComplete="name"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                />

                            </div>


                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Email address
                                </label>


                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                />

                            </div>


                            {/* Role */}

                            <div>

                                <label
                                    htmlFor="role"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Role
                                </label>


                                <select
                                    id="role"
                                    name="role"
                                    value={
                                        formData.role
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                >

                                    <option value="member">
                                        Member
                                    </option>

                                    <option value="manager">
                                        Manager
                                    </option>

                                </select>

                            </div>


                            {/* Password */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>


                                <div className="relative">

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Minimum 6 characters"
                                        autoComplete="new-password"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >

                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Confirm password
                                </label>


                                <div className="relative">

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Repeat your password"
                                        autoComplete="new-password"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >

                                        {showConfirmPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading && (
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                )}


                                {loading
                                    ? "Creating account..."
                                    : "Create account"}

                            </button>

                        </form>


                        <p className="mt-7 text-center text-sm text-slate-500">

                            Already have an account?

                            {" "}

                            <Link
                                to="/login"
                                className="font-semibold text-slate-900 hover:underline"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Register;