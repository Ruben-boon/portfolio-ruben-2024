import { PortableText } from "@portabletext/react";
import { getSite } from "../../sanity/lib/queries";
import DynamicForm from "./DynamicForm";
import { ProfileForm } from "./ProfileForm";
import { DynamicShadcnForm } from "./DynamicShadForm";

export default async function Footer() {
  const { copyright, navigation } = await getSite();

  return (
    <footer>
      <div className="pt-32 pb-16 top-footer grid grid-cols-1 lg:grid-cols-2 gap-20 container-width">
        <div className="contact-text flex justify-center flex-col">
          <h3 className="mt-0">Contact</h3>
          <p>
            Bij elk project volg ik een gestructureerd proces om ervoor te
            zorgen dat we jouw digitale visie optimaal realiseren. Hier is hoe
            we samen jouw project tot leven brengen:
          </p>
        </div>
        <div className="shad-form">
          <DynamicShadcnForm formId="0" />
          {/* <DynamicForm formId="0" /> */}
        </div>
      </div>
      <div className="bottom-footer text-center p-6 container-xl-width">
        <PortableText value={copyright} />
      </div>
    </footer>
  );
}
