// "use client"
// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import { getForm, Form, FormField } from '../../queries';

// interface FormData {
//   [key: string]: string;
// }

// interface DynamicFormProps {
//   formId: string;
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({ formId }) => {
//   const [form, setForm] = useState<Form | null>(null);
//   const [formData, setFormData] = useState<FormData>({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);
    
//     getForm(formId)
//       .then(setForm)
//       .catch((err) => {
//         console.error('Error fetching form:', err);
//         setError(`Failed to load the form. Error details: ${err.message}`);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [formId]);

//   if (isLoading) return <div>Loading form...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!form) return <div>No form found</div>;

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('Form data:', formData);
//     // Here you would typically send the data to your backend
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Rest of your renderField function and return statement remains the same
//   const renderField = (field: FormField) => {
//     // ... (your existing renderField implementation)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{form.name}</h2>
//       {form.fields.map(renderField)}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default DynamicForm;