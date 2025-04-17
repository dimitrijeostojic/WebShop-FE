import React from 'react'

const FormTextArea = ({ label, name, value, onChange, ...rest }: any) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        {...rest}
      />
    </div>
  );
  
export default FormTextArea