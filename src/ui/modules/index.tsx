import HeroModule from "./HeroModule";

export default function Modules({
  modules,
  page,
}: {
  modules?: Sanity.Module[];
  page?: Sanity.Page;
}) {
  return (
    <>
      {modules?.map((module) => {
        switch (module._type) {
          case "hero":
            return <HeroModule {...module} key={module._key} />;

          //   case "testimonial.featured":
          //     return <TestimonialFeatured {...module} key={module._key} />;
          //   case "breadcrumbs":
          //     return (
          //       <Breadcrumbs {...module} currentPage={page} key={module._key} />
          //     );
          default:
            return <div data-type={module._type} key={module._key} />;
        }
      })}
    </>
  );
}
