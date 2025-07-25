import React from "react";
import "../styles/Register.css";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase, dbFirebase } from "../firebase.js"
import {setDoc, doc} from 'firebase/firestore';
import { useNavigate, NavLink } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(authFirebase, email, password);
      const user = authFirebase.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(dbFirebase, "users", user.uid), {
          email: user.email,
          name: data.name,
          rol: "admin"
        })
      }
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="form-box" onSubmit={handleSubmit(handleRegister)}>
        <h2>Crear Cuenta</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: "El correo es obligatorio" })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <button type="submit">Registrarse</button>

        <p>
          ¿Ya tienes una cuenta?{" "}
          <NavLink to="/login" className="enlace">
            Inicia sesión aquí
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;

