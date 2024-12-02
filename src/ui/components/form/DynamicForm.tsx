"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SanityFormConfig } from "sanity";
import { fetchSanity, groq } from "sanity/lib/fetch";

interface SanityForm {
  _id: string;
  name: string;
  //   fields: FormField[];
}

export function DynamicForm({ formId }: { formId: number }) {
  const { register, handleSubmit } = useForm();
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

  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <input {...register("firstName")} placeholder="First name" />
      <select {...register("category", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <textarea {...register("aboutYou")} placeholder="About you" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  );
}
