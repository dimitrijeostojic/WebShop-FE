import React from "react";

interface CheckoutFormProps {
  customer: { name: string; address: string; payment: string };
  onChange: (value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CheckoutForm = ({ customer, onChange, onSubmit }: CheckoutFormProps) => (
  <form onSubmit={onSubmit} className="mt-8 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">Podaci za dostavu</h2>

    <input
      type="text"
      placeholder="Ime i prezime"
      value={customer.name}
      onChange={(e) => onChange({ ...customer, name: e.target.value })}
      required
      className="w-full border rounded px-4 py-2"
    />
    <input
      type="text"
      placeholder="Adresa"
      value={customer.address}
      onChange={(e) => onChange({ ...customer, address: e.target.value })}
      required
      className="w-full border rounded px-4 py-2"
    />
    <select
      value={customer.payment}
      onChange={(e) => onChange({ ...customer, payment: e.target.value })}
      required
      className="w-full border rounded px-4 py-2"
    >
      <option value="">Izaberite način plaćanja</option>
      <option value="pouzećem">Pouzećem</option>
      <option value="kartica">Platna kartica</option>
    </select>

    <button
      type="submit"
      className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-md font-semibold transition"
    >
      Završi porudžbinu
    </button>
  </form>
);

export default CheckoutForm;