import Link from "next/link";
import { getSite } from "../../sanity/lib/queries";
import Img from "./Img";
import processUrl from "../../sanity/lib/processUrl";
import dynamic from "next/dynamic";
import DarkModeSwitch from "./DarkModeSwitch";


export default async function Header() {
  const { logo, navigation } = await getSite();
  return (
    <header>
      <nav className="main-nav">
        <div className="main-nav__logo">
          <Link href="/">
            {logo && <Img image={logo} alt={logo.alt} width={100} />}
          </Link>
        </div>
        <div className="main-nav__links">
          {navigation?.links?.map((link: any) => (
            <Link
              key={link._key}
              href={processUrl(link, {
                base: false,
                params: link.params,
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
          <DarkModeSwitch />
      </nav>
    </header>
  );
}
