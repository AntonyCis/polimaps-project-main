import { authFirebase } from '../firebase';
import { useForm } from "react-hook-form";
import { dbFirebase } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import EdificiosCrud from '../components/admin/EdificiosCrud';

const Dashboard = ({ user }) => {

    // --- Estados y hooks para CRUD de Laboratorios ---
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [laboratorios, setLaboratorios] = useState([]);
    const [id, setId] = useState("");

    // --- Cerrar sesión ---
    const handleLogout = async () => {
        try {
            await authFirebase.signOut();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    };

    // --- Crear o actualizar laboratorio ---
    const handleCreate = async (data) => {
        try {
            if (id) {
                await updateDoc(doc(dbFirebase, "laboratorios", id), data);
                setId("");
                reset({ nombre: '', imagen: '', numeroLaboratorio: '', descripcion: '' });
            } else {
                await addDoc(collection(dbFirebase, "laboratorios"), data);
                reset();
            }
            handleGet();
        } catch (error) {
            console.log(error);
        }
    };

    // --- Obtener todos los laboratorios ---
    const handleGet = async () => {
        const snapshot = await getDocs(collection(dbFirebase, "laboratorios"));
        const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setLaboratorios(documentos);
    };

    // --- Eliminar laboratorio ---
    const handleDelete = async (id) => {
        const confirmar = confirm("Vas a eliminar, ¿Estás seguro?");
        if (confirmar) {
            const userDoc = doc(dbFirebase, "laboratorios", id);
            await deleteDoc(userDoc);
            handleGet();
        }
    };

    // --- Editar laboratorio ---
    const handleEdit = (laboratorio) => {
        setId(laboratorio.id);
        reset({
            nombre: laboratorio.nombre,
            imagen: laboratorio.imagen,
            numeroLaboratorio: laboratorio.numeroLaboratorio,
            descripcion: laboratorio.descripcion
        });
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-gray-800">
            {/* Encabezado */}
            <section className="flex justify-between items-center p-4 bg-white shadow-md">
                <p className="text-lg font-semibold">Bienvenido - {user}</p>
                <div className="flex gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Salir
                    </button>
                </div>
            </section>

            {/* CRUD de Edificios */}
            <section className="max-w-6xl mx-auto p-4">
                <h4 className="text-xl font-bold mb-2">Gestión de Edificios</h4>
                <p className="text-sm mb-4 text-gray-600">CRUD completo para edificios</p>
                <EdificiosCrud />
            </section>

            {/* Línea de separación */}
            <hr className="my-8 border-gray-300" />

            {/* CRUD de Laboratorios */}
            <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario Laboratorios */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h4 className="text-xl font-bold mb-2">{id ? "Editar Laboratorio" : "Crear Laboratorio"}</h4>
                    <p className="text-sm mb-4 text-gray-600">Módulo para ingresar Laboratorios</p>

                    <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
                        <div>
                            <label className="block font-medium">Nombre:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="nombre del laboratorio"
                                {...register("nombre", { required: true })}
                            />
                            {errors.nombre && <span className="text-red-500 text-sm">El nombre es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Imagen:</label>
                            <input
                                type="url"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="url de imagen del laboratorio"
                                {...register("imagen", { required: true })}
                            />
                            {errors.imagen && <span className="text-red-500 text-sm">La imagen es requerida</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Número:</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="numero del laboratorio"
                                {...register("numeroLaboratorio", { required: true })}
                            />
                            {errors.numeroLaboratorio && <span className="text-red-500 text-sm">El numero es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Descripción:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="descripción del laboratorio"
                                {...register("descripcion", { required: true })}
                            ></textarea>
                            {errors.descripcion && <span className="text-red-500 text-sm">La descripción es requerida</span>}
                        </div>

                        <input
                            type="submit"
                            value={id ? "Actualizar" : "Enviar"}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        />
                    </form>
                </div>

                {/* Lista Laboratorios */}
                <div>
                    <h4 className="text-xl font-bold mb-2">Lista de Laboratorios</h4>
                    <p className="text-sm mb-4 text-gray-600">Módulo para listar laboratorios</p>

                    {laboratorios.length === 0 && (
                        <div className="bg-yellow-100 p-4 rounded text-center text-yellow-700">
                            No existen registros...
                        </div>
                    )}

                    <div className="space-y-4">
                        {laboratorios.map((laboratorio) => (
                            <div key={laboratorio.id} className="bg-white p-4 rounded-xl shadow-md flex gap-4">
                                <img
                                    src={laboratorio.imagen}
                                    alt="laboratorio"
                                    className="w-32 h-32 object-cover rounded-lg border"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">Nombre: <span className="font-normal">{laboratorio.nombre}</span></p>
                                    <p className="font-semibold">Número: <span className="font-normal">{laboratorio.numeroLaboratorio}</span></p>
                                    <p className="font-semibold">Descripción: <span className="font-normal">{laboratorio.descripcion}</span></p>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                            onClick={() => handleEdit(laboratorio)}
                                        >
                                            Actualizar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            onClick={() => handleDelete(laboratorio.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
