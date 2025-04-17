import React from 'react'
import FormInput from '../Forms/FormInput';
import FormTextArea from '../Forms/FormTextArea';

const ProductForm = ({ form, categories, onChange, onSubmit }: any) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInput label="Naziv" name="name" value={form.name} onChange={onChange} required />
      <FormTextArea label="Opis" name="description" value={form.description} onChange={onChange} required />
      <FormInput label="Cena" name="price" type="number" value={form.price} onChange={onChange} min={1} required />
      <FormInput label="URL slike" name="imageUrl" value={form.imageUrl} onChange={onChange} />
      <FormInput label="Na stanju" name="stock" type="number" value={form.stock} onChange={onChange} min={1} />
  
      <div>
        <label className="block font-medium mb-1">Kategorija</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={onChange}
          required
          className="w-full border px-4 py-2 rounded-md"
        >
          <option value="">Izaberite kategoriju</option>
          {categories.map((cat: any) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
  
      <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold">
        Potvrdi
      </button>
    </form>
  );
  

export default ProductForm