// src/hooks/useLogout.js
// import { useNavigate } from "react-router-dom"; // Rename the import so it doesn't clash
import useUser from "../../context/auth/AuthContext";
import { logoutService } from "../../services/authServices";

export const useLogout = () => {
    const { setUser, setIsLoggedIn } = useUser();
    // const navigate = useNavigate();

    const performLogout = () => {
        logoutService();
        setUser(null);
        setIsLoggedIn(false);
        // navigate("/login");
    };

    return performLogout;
};