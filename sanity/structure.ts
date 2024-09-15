import { group, singleton } from "./utils";
import type { StructureResolver } from "sanity/structure";
import { VscServerProcess } from "react-icons/vsc";
import { VscLayout } from "react-icons/vsc";
import { VscListFlat } from "react-icons/vsc";

const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "site").title("Site settings").icon(VscServerProcess),
      // S.documentTypeListItem('blog.category').title('Blog categories'),
      S.divider(),

      S.documentTypeListItem("pages").icon(VscLayout),
      S.divider(),

      S.documentTypeListItem("post").icon(VscListFlat),
    //   S.documentTypeListItem("category"),

      // group(S, 'Miscellaneous', [
      // 	S.documentTypeListItem('logo').title('Logos'),
      // 	S.documentTypeListItem('pricing').title('Pricing tiers'),
      // 	S.documentTypeListItem('testimonial').title('Testimonials'),
      // ]).icon(BsDatabaseAdd),
    ]);

export default structure;
