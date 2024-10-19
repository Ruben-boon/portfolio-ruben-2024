"use client";

import React, { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchSanity, groq } from "../../sanity/lib/fetch";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for our form structure
type FieldType = "text" | "email" | "number" | "textarea" | "select";

interface FormField {
  fieldType: FieldType;
  name: string;
  label: string;
  required: boolean;
  options?: string[];
  width?: string;
}

interface SanityForm {
  _id: string;
  name: string;
  fields: FormField[];
}

export function DynamicShadcnForm({ formId }: { formId: string }) {
  const [sanityForm, setSanityForm] = useState<SanityForm | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sanity form
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

  // Create validation schema
  const generateZodSchema = useMemo(
    () => (fields: FormField[]) => {
      const schemaFields: { [key: string]: z.ZodTypeAny } = {};
      fields.forEach((field) => {
        let fieldSchema: z.ZodTypeAny;
        switch (field.fieldType) {
          case "email":
            fieldSchema = z.string().email();
            break;
          case "number":
            fieldSchema = z.number();
            break;
          default:
            fieldSchema = z.string();
        }
        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => val !== '', {
            message: "This field is required",
          });
        }
        schemaFields[field.name] = fieldSchema;
      });
      return z.object(schemaFields);
    },
    []
  );

  // Apply validation schema
  const formSchema = useMemo(() => {
    if (sanityForm) {
      return generateZodSchema(sanityForm.fields);
    }
    return z.object({});
  }, [sanityForm, generateZodSchema]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      if (sanityForm) {
        return sanityForm.fields.reduce(
          (acc, field) => {
            acc[field.name] = "";
            return acc;
          },
          {} as { [key: string]: string }
        );
      }
      return {};
    }, [sanityForm]),
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  // Error handling
  if (isLoading) return <div>Loading form...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!sanityForm) return <div>No form data available</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {sanityForm.fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof z.infer<typeof formSchema>}
            render={({ field: formField }) => (
              <FormItem className={`${field.width || "w-full"} mb-4`}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {(() => {
                    switch (field.fieldType) {
                      case "textarea":
                        return (
                          <Textarea placeholder={field.label} {...formField} />
                        );
                      case "select":
                        return (
                          <Select
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select ${field.label}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      default:
                        return (
                          <Input
                            type={field.fieldType}
                            placeholder={field.label}
                            {...formField}
                          />
                        );
                    }
                  })()}
                </FormControl>
                <FormDescription>
                  {/* Add description if available in Sanity schema */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button className="mt-4" type="submit">
          Verzenden
        </Button>
      </form>
    </Form>
  );
}