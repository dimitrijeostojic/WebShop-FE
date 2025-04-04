import axios from 'axios';
import React, { useEffect } from 'react'

interface Category {
    categoryId: string;
    categoryName: string;
  }

const Categories = () => {

    const [categories, setCategories] = React.useState<Category[]>([]);
    const iconArray = ["🍖" , "🎒", "🧸", "🛁"];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
          const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    
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

  return (
    <div>
        <div className="categories-header">
          <h2 className="text-2xl font-semibold mb-4">Kategorije</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="border rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 hover:bg-violet-50">
              <div className="text-4xl mb-2">{iconArray[index % iconArray.length]}</div>
              <div className="text-lg font-medium">{category.categoryName}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Categories