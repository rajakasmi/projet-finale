import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const token = storedToken.replace(/^"|"$/g, "");
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          console.warn("Token expiré — déconnexion automatique");
          logout();
          setLoading(false);
          return;
        }

        setUser({ ...decoded, token });

        axiosInstance
          .get("/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUser({ ...res.data, token })) 
          .catch((err) => {
            console.warn("Erreur validation du token :", err.message);
            logout();
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Erreur décodage token :", error);
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
      if (res.data.user.role==="admin"){
        navigate ("/admin/dashboard");
      } else {
        navigate ("/");
      }

      return decoded;
    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await axiosInstance.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...res.data, token }); 
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      console.error("Erreur getProfile :", err.response?.data || err.message);
      return null;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Utilisateur non connecté");

      const res = await axiosInstance.put("/users/profile", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...res.data, token }); 
      return res.data;
    } catch (err) {
      console.error("Erreur updateProfile :", err.response?.data || err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, getProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
