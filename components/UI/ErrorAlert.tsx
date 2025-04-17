import React from 'react'

const ErrorAlert = ({ errors }: { errors: string[] }) => (
    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <ul className="list-disc ml-5 text-sm">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    </div>
  );
  

export default ErrorAlert