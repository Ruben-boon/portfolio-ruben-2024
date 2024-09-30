"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createClient, SanityClient } from '@sanity/client';
import { fetchSanity, groq } from '../../sanity/lib/fetch';

// Define types for our form structure
type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select';

interface FormField {
  fieldType: FieldType;
  name: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface Form {
  _id: string;
  name: string;
  fields: FormField[];
}

interface FormData {
  [key: string]: string;
}

const client: SanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'your-dataset',
  useCdn: true,
});

interface DynamicFormProps {
  formId: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formId }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchSanity<Form | null>(groq`*[_type == "form"][0]`)

      .then((fetchedForm) => {
        if (fetchedForm) {
          setForm(fetchedForm);
        } else {
          setError(`No form found with ID: ${formId}`);
        }
      })
      .catch((err) => {
        console.error('Error fetching form:', err);
        setError(`Failed to load the form. Error details: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(form)
      });
  }, [formId]);

  if (!form) return <div>Loading form...</div>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Here you would typically send the data to your backend
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderField = (field: FormField) => {
    switch (field.fieldType) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.fieldType}
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleChange}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleChange}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.name}</h2>
      {form.fields.map(renderField)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;