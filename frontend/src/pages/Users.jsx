import { useEffect, useState } from "react";

import {
    Users as UsersIcon,
    UserPlus,
    Mail,
    Shield,
    Search
} from "lucide-react";

import { getUsers } from "../services/userService";


function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    const loadUsers = async () => {

        try {

            setLoading(true);

            const response = await getUsers();

            console.log(
                "Users response:",
                response
            );

            if (response.success) {

                setUsers(
                    response.data || []
                );

            }

        } catch (error) {

            console.error(
                "Users error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadUsers();

    }, []);


    const filteredUsers = users.filter(
        (user) => {

            const value =
                `${user.name} ${user.email}`
                    .toLowerCase();

            return value.includes(
                search.toLowerCase()
            );

        }
    );


    return (

        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <div className="bg-white border-b">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="p-3 bg-indigo-100 rounded-xl">

                                    <UsersIcon
                                        className="text-indigo-600"
                                        size={24}
                                    />

                                </div>

                                <div>

                                    <h1 className="text-2xl font-bold text-slate-900">

                                        Team Members

                                    </h1>

                                    <p className="text-slate-500">

                                        Manage your team members

                                    </p>

                                </div>

                            </div>

                        </div>


                        <button
                            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
                        >

                            <UserPlus size={18} />

                            Add User

                        </button>

                    </div>

                </div>

            </div>


            {/* Content */}

            <div className="max-w-7xl mx-auto px-6 py-8">


                {/* Search */}

                <div className="bg-white border rounded-2xl p-4 mb-6">

                    <div className="relative max-w-md">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search users..."
                            className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="bg-white rounded-2xl border p-10 text-center">

                        <p className="text-slate-500">

                            Loading users...

                        </p>

                    </div>

                )}


                {/* Users */}

                {!loading && (

                    <div className="bg-white rounded-2xl border overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-50 border-b">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                            User
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                            Role
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                            Joined
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y">

                                    {filteredUsers.map(
                                        (user) => (

                                            <tr
                                                key={user.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* User */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">

                                                            {user.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}

                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-slate-800">

                                                                {user.name}

                                                            </p>

                                                            <p className="text-xs text-slate-400">

                                                                ID: {user.id}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Email */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2 text-slate-600">

                                                        <Mail
                                                            size={16}
                                                        />

                                                        {user.email}

                                                    </div>

                                                </td>


                                                {/* Role */}

                                                <td className="px-6 py-5">

                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm">

                                                        <Shield
                                                            size={14}
                                                        />

                                                        {user.role}

                                                    </span>

                                                </td>


                                                {/* Created */}

                                                <td className="px-6 py-5 text-slate-500">

                                                    {user.created_at
                                                        ? new Date(
                                                              user.created_at
                                                          ).toLocaleDateString()
                                                        : "-"}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {filteredUsers.length === 0 && (

                            <div className="text-center py-12 text-slate-400">

                                No users found.

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


export default Users;