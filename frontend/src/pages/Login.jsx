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

import { useAuth } from "../context/AuthContext";

import { loginUser } from "../services/authService";


function Login() {

    const navigate = useNavigate();
     const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] =
        useState(false);


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
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
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        // Frontend validation

        if (!formData.email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }


        if (!formData.password) {

            setError(
                "Password is required."
            );

            return;
        }


        try {

            setLoading(true);
            setError("");


            const response =
                await loginUser(formData);


            console.log(
                "Login response:",
                response
            );


            /*
             * Your backend should return:
             *
             * {
             *   success: true,
             *   data: {
             *      token: "...",
             *      user: {...}
             *   }
             * }
             */


            const token =
                response?.data?.token;


            const user =
                response?.data?.user;


            if (!token) {

                throw new Error(
                    "Login successful but token was not received."
                );
            }


          login(user, token);

         navigate("/dashboard");


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Login failed. Please try again.";


            setError(message);


        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Left side */}

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

                        Manage your team's work

                        <span className="block text-slate-400">
                            in one place.
                        </span>

                    </h1>


                    <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">

                        Create tasks, assign responsibilities,
                        track progress and keep your entire
                        team organized.

                    </p>


                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg">

                        <div className="rounded-xl border border-slate-700 p-5">

                            <p className="text-2xl font-bold">
                                Tasks
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Organized workflow
                            </p>

                        </div>


                        <div className="rounded-xl border border-slate-700 p-5">

                            <p className="text-2xl font-bold">
                                Team
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Better collaboration
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Right side */}

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">

                <div className="w-full max-w-md">

                    {/* Mobile logo */}

                    <div className="mb-8 flex items-center gap-3 lg:hidden">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">

                            <CheckSquare
                                size={22}
                            />

                        </div>

                        <span className="text-xl font-bold">
                            TaskFlow
                        </span>

                    </div>


                    <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-10">

                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-slate-900">
                                Welcome back
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Sign in to your account to continue.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                                {error}

                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                />

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
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
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


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading && (
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                )}

                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}

                            </button>

                        </form>


                        {/* Register */}

                        <p className="mt-8 text-center text-sm text-slate-500">

                            Don't have an account?

                            {" "}

                            <Link
                                to="/register"
                                className="font-semibold text-slate-900 hover:underline"
                            >
                                Create account
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Login;