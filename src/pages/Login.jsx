import React from "react";
import "../styles/Login.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../firebase";
import { useNavigate, NavLink } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { dbFirebase } from "../firebase"; // Asegúrate de tener la instancia de Firestore

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
  const { email, password } = data;
  try {
    const userCredential = await signInWithEmailAndPassword(authFirebase, email, password);
    const uid = userCredential.user.uid;

    // Obtener el rol del usuario desde Firestore
    const userDoc = await getDoc(doc(dbFirebase, "users", uid));
    const userData = userDoc.data();
    const role = userData?.rol;

    // Redireccionar según el rol
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "eventos") {
      navigate("/agendador");
    } else if (role === "docente") {
      navigate("/docente");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert("Error: " + error.message);
  }
};

  return (
    <div className="login-container">
      <form className="form-box" onSubmit={handleSubmit(handleLogin)}>
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es obligatoria" })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <button type="submit">Ingresar</button>

        <p>
          ¿No tienes una cuenta?{" "}
          <NavLink to="/register" className="enlace">
            Regístrate aquí
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
