import Link from "next/link";
import { getSite } from "../../sanity/lib/queries";
import Img from "@/ui/components/Img";
import ClientNavLinks from "@/ui/components/ClientNavLinks";

export default async function Header() {
  const { logo, navigation } = await getSite();

  return (
    <>
      <header>
        <div className="header-container">
          <div className="main-logo">
            <Link href="/">
              {logo && <Img image={logo} alt={logo.alt} width={100} />}
            </Link>
          </div>
          <nav className="main-nav">
            <div className="main-nav__links">
              <ClientNavLinks navigation={navigation} />
            </div>
          </nav>
          <div className="main-cross">
            <div className="main-cross__line1"></div>
            <div className="main-cross__line2"></div>
          </div>
        </div>
      </header>
      <div className="hamburger-button">
        <div className="hamburger-button__line1"></div>
        <div className="hamburger-button__line2"></div>
      </div>
    </>
  );
}
