import { PortableText } from "@portabletext/react";
import { getSite } from "../../sanity/lib/queries";
import { DynamicForm } from "./components/form/DynamicForm";

// import DynamicForm from "./DynamicForm";
// import { ProfileForm } from "./ProfileForm";

export default async function Footer() {
  const { copyright, navigation, footerContent } = await getSite();

  return (
    <footer>
      <div className="pt-16 top-footer grid grid-cols-12 gap-4 container-xl-width place-items-center">
        <div className="dynamic-form col-span-12 md:col-span-12 contact-form flex justify-center">
          <DynamicForm formId={1} />
        </div>
        <div className="col-span-12 md:col-span-12 contact-text  flex justify-center flex-col">
          <PortableText value={footerContent} />
        </div>
      </div>
      <div className="bottom-footer container-width text-center p-6 pb-2">
        <PortableText value={copyright} />
      </div>
    </footer>
  );
}
