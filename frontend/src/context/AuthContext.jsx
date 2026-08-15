import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // Check saved login
    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        const token =
            localStorage.getItem("token");


        if (storedUser && token) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                console.error(
                    "Invalid stored user",
                    error
                );

                localStorage.removeItem("user");

                localStorage.removeItem("token");

            }

        }

        setLoading(false);

    }, []);


    // Login
    const login = (userData, token) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            token
        );

        setUser(userData);

    };


    // Logout
    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                token: localStorage.getItem("token"),
                loading,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    return useContext(AuthContext);

};