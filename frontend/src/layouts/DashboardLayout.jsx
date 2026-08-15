import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    CheckSquare,
    Users,
    Plus,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

function DashboardLayout() {

    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
    };

    const links = [
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
        },
        {
            name: "Create Task",
            path: "/tasks/create",
            icon: Plus
        }
    ];

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Mobile Header */}

            <div className="flex items-center justify-between bg-slate-900 p-4 text-white lg:hidden">

                <h1 className="text-xl font-bold">
                    TaskFlow
                </h1>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen
                        ? <X />
                        : <Menu />
                    }
                </button>

            </div>


            {/* Sidebar */}

            <aside
                className={`
                    fixed left-0 top-0 z-40
                    h-screen w-64
                    bg-slate-900 text-white
                    transition-transform
                    lg:translate-x-0
                    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                <div className="flex h-full flex-col">

                    {/* Logo */}

                    <div className="border-b border-slate-700 p-6">

                        <h1 className="text-2xl font-bold">
                            TaskFlow
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            Task Management
                        </p>

                    </div>


                    {/* Navigation */}

                    <nav className="flex-1 space-y-2 p-4">

                        {links.map((link) => {

                            const Icon = link.icon;

                            return (

                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className={({ isActive }) =>
                                        `
                                        flex items-center gap-3
                                        rounded-lg px-4 py-3
                                        text-sm font-medium
                                        transition
                                        ${
                                            isActive
                                                ? "bg-white text-slate-900"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }
                                        `
                                    }
                                >

                                    <Icon size={19} />

                                    {link.name}

                                </NavLink>

                            );

                        })}

                    </nav>


                    {/* User */}

                    <div className="border-t border-slate-700 p-4">

                        <div className="mb-4">

                            <p className="font-semibold">
                                {user.name || "User"}
                            </p>

                            <p className="text-xs text-slate-400">
                                {user.email || ""}
                            </p>

                            <p className="mt-1 text-xs capitalize text-slate-500">
                                {user.role || "member"}
                            </p>

                        </div>


                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-300 hover:bg-red-500/10"
                        >

                            <LogOut size={18} />

                            Logout

                        </button>

                    </div>

                </div>

            </aside>


            {/* Main */}

            <main className="min-h-screen lg:ml-64">

                <div className="p-4 sm:p-6 lg:p-8">

                    <Outlet />

                </div>

            </main>

        </div>

    );
}

export default DashboardLayout;