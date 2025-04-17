import React from 'react'

const AboutSection = ({ title, text }: { title?: string; text: string }) => (
    <div className="mb-4 text-lg leading-relaxed">
      {title && <h2 className="text-2xl font-semibold text-violet-500 mb-2">{title}</h2>}
      <p>{text}</p>
    </div>
  );
export default AboutSection


  