"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import ProductForm from "../Forms/ProductForm";
import ErrorAlert from "../UI/ErrorAlert";

interface Category {
  categoryId: string;
  categoryName: string;
}

const AddProductModal = ({ isOpen, onClose }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: 1,
    description: "",
    stock: 1,
    imageUrl: "",
    categoryId: "",
    createdBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const decoded: any = jwtDecode(token);
        const userId = decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

        const formData = { ...form, createdBy: userId };

        await axios.post("https://localhost:7273/api/Product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Proizvod uspešno kreiran! 🎉");
        resetForm();
        onClose();
      }
    } catch (error: any) {
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        const allErrors = Object.values(backendErrors).flat() as string[];
        setErrors(allErrors);
      } else {
        toast.error("Dodavanje proizvoda nije uspelo.");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
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
    setErrors([]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">Dodaj novi proizvod</Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          <ProductForm
            form={form}
            categories={categories}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          {errors.length > 0 && <ErrorAlert errors={errors} />}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddProductModal;