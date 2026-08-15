import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function ProtectedRoute({ children }) {

    const {
        user,
        loading
    } = useAuth();


    // Wait for localStorage check
    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto">
                    </div>

                    <p className="mt-3 text-slate-500">
                        Loading...
                    </p>

                </div>

            </div>

        );

    }


    // Not authenticated
    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;

}


export default ProtectedRoute;