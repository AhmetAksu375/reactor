import React, { useState } from 'react';

export default function Panel() { // Component name should start with an uppercase letter
  const [departments, setDepartments] = useState(["Elektronik Destek", "Yazılım Destek", "Proje Destek"]);
    
  return (
    <div className='grid grid-cols-3'>
      {departments.map((department, index) => (
        <div key={index} className='bg-blue-500 text-center text-2xl font-semibold text-slate-50 p-4 m-4 rounded-md'>
          <h1>{department}</h1>
        </div>
      ))}
    </div>
  );
}
