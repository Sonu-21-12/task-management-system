import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";
import Users from "./pages/Users";


import DashboardLayout
    from "./layouts/DashboardLayout";


import ProtectedRoute
    from "./components/common/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ===================== */}
                {/* PUBLIC ROUTES */}
                {/* ===================== */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ===================== */}
                {/* PROTECTED ROUTES */}
                {/* ===================== */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    <Route
                        path="/tasks"
                        element={<Tasks />}
                    />


                    <Route
                        path="/tasks/create"
                        element={<CreateTask />}
                    />


                    <Route
                        path="/tasks/:id/edit"
                        element={<EditTask />}
                    />


                    <Route
                        path="/tasks/:id"
                        element={<TaskDetails />}
                    />


                    <Route
                        path="/users"
                        element={<Users />}
                    />

                </Route>


            </Routes>

        </BrowserRouter>

    );

}


export default App;