import { singleton } from "./utils";
import { VscServerProcess } from "react-icons/vsc";
import { VscLayout } from "react-icons/vsc";
import { VscListFlat } from "react-icons/vsc";
import { LuClipboardList } from "react-icons/lu";
import { BsCollection } from "react-icons/bs";

const structure = (S, _context) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("pages").icon(VscLayout),
      S.documentTypeListItem("post").icon(VscListFlat),
      S.divider(),
      S.documentTypeListItem("form").icon(LuClipboardList),
      S.documentTypeListItem("collections").icon(BsCollection),
      singleton(S, "site").title("Site settings").icon(VscServerProcess),

    ]);

export default structure;
