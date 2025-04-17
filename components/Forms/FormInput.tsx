import React from 'react'

const FormInput = ({ label, name, value, onChange, type = "text", ...rest }: any) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        {...rest}
      />
    </div>
  );
  

export default FormInput