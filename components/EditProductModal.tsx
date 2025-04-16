"use client";

import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Category {
    categoryId: string;
    categoryName: string;
}

const EditProductModal = (prop: any) => {
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [form, setForm] = useState({
        name: prop.product.name,
        price: prop.product.price,
        description: prop.product.description,
        stock: prop.product.stock,
        imageUrl: prop.product.imageUrl,
        categoryId: prop.product.categoryId,
        createdBy: prop.product.createdBy,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]); // Reset errors before new attempt

        try {
            const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
            if (token) {
                const decoded: any = jwtDecode(token);
                const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                const formData = { ...form, createdBy: userId };

                await axios.put(`https://localhost:7273/api/Product/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success("Proizvod uspešno izmenjen! 🎉");
                prop.onClose();
                window.location.reload();
            }
        } catch (error: any) {
            const backendErrors = error.response?.data?.errors;
            if (backendErrors) {
                const allErrors = Object.values(backendErrors).flat() as string[];
                setErrors(allErrors);
            } else {
                toast.error("Izmena proizvoda nije uspela.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchCategories = async () => {
        try {
            const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
            const response = await axios.get("https://localhost:7273/api/Category", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Dialog open={prop.isOpen} onClose={prop.onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-bold">Izmeni proizvod</Dialog.Title>
                        <button onClick={prop.onClose}>
                            <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Naziv</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Naziv"
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Opis</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Opis"
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Cena</label>
                            <input
                                type="number"
                                name="price"
                                min={1}
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Cena"
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">URL slike</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                                placeholder="URL slike"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Na stanju</label>
                            <input
                                type="number"
                                min={1}
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Na stanju"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Kategorija</label>
                            <select
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                            >
                                <option value="">Izaberite kategoriju</option>
                                {categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold"
                        >
                            Potvrdi
                        </button>
                    </form>


                    {errors.length > 0 && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <ul className="list-disc ml-5 text-sm">
                                {errors.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default EditProductModal;
