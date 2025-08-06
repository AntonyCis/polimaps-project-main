import { authFirebase } from '../firebase';
import { useForm } from "react-hook-form";
import { dbFirebase } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

const Docente = ({ user }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [Oficinas, setOficinas] = useState([]);
    const [id, setId] = useState("");

    const handleLogout = async () => {
        try {
            await authFirebase.signOut();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreate = async (data) => {
        try {
            if (id) {
                await updateDoc(doc(dbFirebase, "Oficinas", id), data);
                setId("");
                reset({ nombre: '', edificio: '', piso: '', numeroOficina: '', descripcion: '', tutoria: '', materias: ''  });
            } else {
                await addDoc(collection(dbFirebase, "Oficinas"), data);
                reset();
            }
            handleGet();
        } catch (error) {
            console.log(error);
        }
    };

    const handleGet = async () => {
        const snapshot = await getDocs(collection(dbFirebase, "Oficinas"));
        const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setOficinas(documentos);
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Estás seguro de eliminar esta oficina?");
        if (confirmar) {
            await deleteDoc(doc(dbFirebase, "Oficinas", id));
            handleGet();
        }
    };

    const handleEdit = (oficina) => {
        setId(oficina.id);
        reset({
            nombre: oficina.nombre,
            edificio: oficina.edificio,
            piso: oficina.piso,
            numeroOficina: oficina.numeroOficina,
            descripcion: oficina.descripcion
        });
    };

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-gray-800">
            <section className="flex justify-between items-center p-4 bg-white shadow-md">
                <p className="text-lg font-semibold">Bienvenido - {user}</p>
                <div className="flex gap-4">
                    <button className="text-xl">🌙</button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Salir
                    </button>
                </div>
            </section>

            <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h4 className="text-xl font-bold mb-2">Crear</h4>
                    <p className="text-sm mb-4 text-gray-600">Módulo para ingresar Oficina</p>

                    <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
                        <div>
                            <label className="block font-medium">Nombre:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Nombre de la oficina"
                                {...register("nombre", { required: true })}
                            />
                            {errors.nombre && <span className="text-red-500 text-sm">El nombre es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Edificio:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Edificio"
                                {...register("edificio", { required: true })}
                            />
                            {errors.edificio && <span className="text-red-500 text-sm">El edificio es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Piso:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Piso"
                                {...register("piso", { required: true })}
                            />
                            {errors.piso && <span className="text-red-500 text-sm">El piso es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Número de Oficina:</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Número"
                                {...register("numeroOficina", { required: true })}
                            />
                            {errors.numeroOficina && <span className="text-red-500 text-sm">El número es requerido</span>}
                        </div>

                        <div>
                            <label className="block font-medium">Descripción:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Descripción de la oficina"
                                {...register("descripcion", { required: true })}
                            ></textarea>
                            {errors.descripcion && <span className="text-red-500 text-sm">La descripción es requerida</span>}
                        </div>
                        <div>
                            <label className="block font-medium">Tutorias:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Horario de Tutorias"
                                {...register("tutorias", { required: true })}
                            ></textarea>
                            {errors.tutoria && <span className="text-red-500 text-sm">La Tutoria es requerida</span>}
                        </div>
                        <div>
                            <label className="block font-medium">Materias:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Materias impartidas por el docente"
                                {...register("materia", { required: true })}
                            ></textarea>
                            {errors.materias && <span className="text-red-500 text-sm">Las Materias es requerida</span>}
                        </div>

                        <input
                            type="submit"
                            value={id ? "Actualizar" : "Crear"}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        />
                    </form>
                </div>

                {/* Lista de oficinas */}
                <div>
                    <h4 className="text-xl font-bold mb-2">Listar</h4>
                    <p className="text-sm mb-4 text-gray-600">Módulo para listar Oficinas</p>

                    {Oficinas.length === 0 && (
                        <div className="bg-yellow-100 p-4 rounded text-center text-yellow-700">
                            No existen registros...
                        </div>
                    )}

                    <div className="space-y-4">
                        {Oficinas.map((oficina) => (
                            <div key={oficina.id} className="bg-white p-4 rounded-xl shadow-md">
                                <p><strong>Nombre:</strong> {oficina.nombre}</p>
                                <p><strong>Edificio:</strong> {oficina.edificio}</p>
                                <p><strong>Piso:</strong> {oficina.piso}</p>
                                <p><strong>Número:</strong> {oficina.numeroOficina}</p>
                                <p><strong>Descripción:</strong> {oficina.descripcion}</p>
                                <p><strong>Tutorias:</strong> {oficina.tutoria}</p>
                                <p><strong>Materias:</strong> {oficina.materias}</p>
                                <div className="mt-2 flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                        onClick={() => handleEdit(oficina)}
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        onClick={() => handleDelete(oficina.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Docente;
