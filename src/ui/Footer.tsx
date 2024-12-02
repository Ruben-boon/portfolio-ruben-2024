import { PortableText } from "@portabletext/react";
import { getSite } from "../../sanity/lib/queries";
import { DynamicShadcnForm } from "./components/form/DynamicShadForm";
import { DynamicForm } from "./components/form/DynamicForm";

// import DynamicForm from "./DynamicForm";
// import { ProfileForm } from "./ProfileForm";

export default async function Footer() {
  const { copyright, navigation } = await getSite();
  

  return (
    <footer>
      <div className="pt-16 mt-16 top-footer grid grid-cols-1 lg:grid-cols-2 gap-20 container-width">
        <div className="contact-text light-text flex justify-center flex-col">
          <h3 className="mt-0">Contact</h3>
          <p>
            Bij elk project volg ik een gestructureerd proces om ervoor te
            zorgen dat we jouw digitale visie optimaal realiseren. Hier is hoe
            we samen jouw project tot leven brengen:
          </p>
        </div>
        <div className="contact-form">
          <DynamicForm formId={1}/>
        </div>
      </div>
      <div className="bottom-footer container-width text-center p-6 pb-2 ">
        <PortableText value={copyright} />
      </div>
    </footer>
  );
}
