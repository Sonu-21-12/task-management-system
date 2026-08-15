import axios from "axios";


// Create central Axios instance
const api = axios.create({

    baseURL: "http://localhost:5000/api",

    headers: {
        "Content-Type": "application/json"
    }

});


// =====================================================
// REQUEST INTERCEPTOR
// Automatically attach JWT token
// =====================================================

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");


      if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
}


        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);


// =====================================================
// RESPONSE INTERCEPTOR
// Handle unauthorized requests
// =====================================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (
            error.response &&
            error.response.status === 401
        ) {

            console.log(
                "JWT expired or unauthorized."
            );


            localStorage.removeItem("token");

            localStorage.removeItem("user");


            // Redirect to login
            window.location.href =
                "/login";

        }


        return Promise.reject(error);

    }

);


export default api;