import React from "react";
import "../styles/Login.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../firebase";
import { useNavigate, NavLink } from "react-router";

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
      await signInWithEmailAndPassword(authFirebase, email, password);
      navigate("/dashboard");
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
