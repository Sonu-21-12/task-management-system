import {
    Menu,
    Search,
    Bell,
    ChevronDown
} from "lucide-react";

import { useState } from "react";


function Navbar({ setMobileOpen }) {

    const [profileOpen, setProfileOpen] =
        useState(false);


    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    const userName =
        user?.name || "User";


    const userEmail =
        user?.email || "user@example.com";


    return (

        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white">

            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">


                {/* Left */}

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                    >
                        <Menu size={22} />
                    </button>


                    <div className="relative hidden sm:block">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                        />

                    </div>

                </div>


                {/* Right */}

                <div className="flex items-center gap-3">


                    {/* Notifications */}

                    <button
                        className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
                    >

                        <Bell size={20} />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

                    </button>


                    <div className="h-7 w-px bg-slate-200" />


                    {/* Profile */}

                    <div className="relative">

                        <button
                            onClick={() =>
                                setProfileOpen(!profileOpen)
                            }
                            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-50"
                        >

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                {userName
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>


                            <div className="hidden text-left sm:block">

                                <p className="text-sm font-semibold text-slate-900">
                                    {userName}
                                </p>

                                <p className="max-w-32 truncate text-xs text-slate-500">
                                    {userEmail}
                                </p>

                            </div>


                            <ChevronDown
                                size={16}
                                className="hidden text-slate-400 sm:block"
                            />

                        </button>


                        {profileOpen && (

                            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                                <div className="border-b border-slate-100 p-4">

                                    <p className="font-semibold text-slate-900">
                                        {userName}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {userEmail}
                                    </p>

                                </div>


                                <button
                                    className="w-full px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-50"
                                >
                                    My Profile
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}


export default Navbar;