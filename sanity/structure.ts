import { group, singleton } from "./utils";
import type { StructureResolver } from "sanity/structure";
import { VscServerProcess } from "react-icons/vsc";
import { VscLayout } from "react-icons/vsc";
import { VscListFlat } from "react-icons/vsc";
import { LuClipboardList } from "react-icons/lu";
import { BsCollection } from "react-icons/bs";
const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
    

      S.documentTypeListItem("pages").icon(VscLayout),

      S.documentTypeListItem("post").icon(VscListFlat),
      S.divider(),

      S.documentTypeListItem("form").icon(LuClipboardList),
      S.documentTypeListItem("collections").icon(BsCollection),

      //   S.documentTypeListItem("category"),
      singleton(S, "site").title("Site settings").icon(VscServerProcess),
      
      // S.documentTypeListItem('blog.category').title('Blog categories'),
      // group(S, 'Miscellaneous', [
      // 	S.documentTypeListItem('logo').title('Logos'),
      // 	S.documentTypeListItem('pricing').title('Pricing tiers'),
      // 	S.documentTypeListItem('testimonial').title('Testimonials'),
      // ]).icon(BsDatabaseAdd),
    ]);

export default structure;
