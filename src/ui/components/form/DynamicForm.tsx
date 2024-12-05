"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { fetchSanity, groq } from "sanity/lib/fetch";
import { Label } from "./fields/label";
import { Input } from "./fields/input";
import { Textarea } from "./fields/textarea";
import { Button } from "./fields/button";

interface FormField {
  _key: string;
  name?: string;
  label?: string;
  fieldType: string;
  width?: string;
  required?: boolean;
  placeholder?: string;
}

interface SanityForm {
  _id: string;
  name: string;
  fields: FormField[];
}

export function DynamicForm({ formId }: { formId: number }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState("");
  const [sanityForm, setSanityForm] = useState<SanityForm | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchSanity<SanityForm | null>(groq`*[_type == "form"][0]`)
      .then((fetchedForm) => {
        if (fetchedForm) {
          setSanityForm(fetchedForm);
          console.log("Fetched Form:", fetchedForm);
        } else {
          setError(`No form found with ID: ${formId}`);
        }
      })
      .catch((err) => {
        console.error("Error fetching form:", err);
        setError(`Failed to load the form. Error details: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [formId]);

  const renderField = (field: FormField) => {
    if (!field.name) return null;
    const commonProps = {
      ...register(field.name, {
        required: field.required
          ? `${field.label || field.name} is verplicht`
          : false,
      }),
      placeholder: field.placeholder || field.label,
    };
    const widthClass = field.width || "w-full";

    switch (field.fieldType) {
      case "text":
        return (
          <div key={field._key} className={`${widthClass}`}>
            {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
            <Input
              {...commonProps}
              type="text"
              className={`${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );

      case "email":
        return (
          <div key={field._key} className={`mb-4 ${widthClass}`}>
            {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
            <Input
              {...commonProps}
              type="email"
              className={`${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field._key} className={`mb-4 ${widthClass}`}>
            {field.label && <Label htmlFor={field.name}>{field.label}</Label>}
            <Textarea
              {...commonProps}
              className={`${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const onSubmit = (formData: any) => {
    setData(JSON.stringify(formData, null, 2));
    console.log("Form Submitted:", formData);
  };

  if (isLoading) return <div>Loading form...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!sanityForm) return <div>No form configuration found.</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">{sanityForm.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
        {sanityForm.fields
          .filter((field) => field.name) 
          .map(renderField)}

        <Button type="submit" className="w-full mt-4">
          Submit Form
        </Button>
      </form>

      {data && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h3 className="font-bold">Submitted Data:</h3>
          <pre>{data}</pre>
        </div>
      )}
    </div>
  );
}
