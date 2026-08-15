import {
    LayoutDashboard,
    CheckSquare,
    Users,
    Settings,
    LogOut,
    X
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";


function Sidebar({ mobileOpen, setMobileOpen }) {

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    const navigation = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: CheckSquare
        },
        {
            name: "Users",
            path: "/users",
            icon: Users
        }
    ];


    return (
        <>
            {/* Mobile overlay */}

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}


            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-64 flex-col
                    border-r border-slate-200
                    bg-white
                    transition-transform duration-300
                    lg:translate-x-0
                    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Logo */}

                <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">

                            <CheckSquare size={20} />

                        </div>


                        <div>

                            <h1 className="font-bold text-slate-900">
                                TaskFlow
                            </h1>

                            <p className="text-[10px] text-slate-500">
                                Task Management
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Navigation */}

                <nav className="flex-1 space-y-1 p-4">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Workspace
                    </p>


                    {navigation.map((item) => {

                        const Icon = item.icon;


                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-3 rounded-xl px-3 py-2.5
                                    text-sm font-medium
                                    transition
                                    ${
                                        isActive
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }
                                    `
                                }
                            >

                                <Icon size={19} />

                                {item.name}

                            </NavLink>

                        );

                    })}


                    <div className="my-6 border-t border-slate-100" />


                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        System
                    </p>


                    <button
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    >

                        <Settings size={19} />

                        Settings

                    </button>

                </nav>


                {/* Bottom */}

                <div className="border-t border-slate-200 p-4">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >

                        <LogOut size={19} />

                        Logout

                    </button>

                </div>

            </aside>
        </>
    );
}


export default Sidebar;