import Link from "next/link";
import { getSite } from "../../sanity/lib/queries";
import Img from "./Img";
import processUrl from "../../sanity/lib/processUrl";
import DarkModeSwitch from "./DarkModeSwitch";
import { usePathname } from "next/navigation";
import ClientNavLinks from "./ClientNavLinks";

export default async function Header() {
  const { logo, navigation } = await getSite();

  return (
    <header>
      <nav className="main-nav">
        <div className="main-nav__links">
          <ClientNavLinks navigation={navigation} />
        </div>
      </nav>
      <div className="main-logo">
        <Link href="/">
          {logo && <Img image={logo} alt={logo.alt} width={100} />}
        </Link>
      </div>
      <DarkModeSwitch />
    </header>
  );
}
