"use client";

import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { create } from "domain";

interface Category {
  categoryId: string;
  categoryName: string;
}

const AddProductModal = (prop: any) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: 1,
    description: "",
    stock: 1,
    imageUrl: "",
    categoryId: "",
    createdBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  
      if (token) {
        const decoded: any = jwtDecode(token);
        const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
        // ⬇️ Dodaj createdBy u form pre slanja
        const formData = { ...form, createdBy: id };
  
        console.log("Novi proizvod:", formData);
  
        await axios.post("https://localhost:7273/api/Product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        toast.success("Proizvod uspešno kreiran! 🎉");
        resetForm();
        prop.onClose(); // zatvori modal ako treba
      }
    } catch (error: any) {
      console.error("Greška prilikom dodavanja proizvoda:", error.response?.data || error.message);
      toast.error("Dodavanje proizvoda nije uspelo.");
    }
  };
  

  const fetchCategories = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Category", {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token u zaglavlje
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

  const resetForm = () => {
    setForm({
      name: "",
      price: 1,
      description: "",
      stock: 1,
      imageUrl: "",
      categoryId: "",
      createdBy: "",
    });
  };

  return (
    <>
      <Dialog open={prop.isOpen} onClose={prop.onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">Dodaj novi proizvod</Dialog.Title>
              <button onClick={prop.onClose}>
                <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Naziv"
                required
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Opis"
                required
                className="w-full border rounded px-3 py-2"
              />
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
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="URL slike"
                className="w-full border rounded px-3 py-2"
              />

              <input
                type="number"
                min={1}
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full border rounded px-3 py-2"
              />

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="">Izaberite kategoriju</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>


              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold"
              >
                Potvrdi
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AddProductModal;
