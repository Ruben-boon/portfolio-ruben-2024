"use client";
import Link from "next/link";
import Img from "@/ui/components/Img";
import ClientNavLinks from "@/ui/components/ClientNavLinks";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header({ logo, navigation }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!isMobile && currentScrollY > 280) {
        setVisible(currentScrollY <= lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobile, menuOpen]);

  const handleOpenMobileMenu = () => {
    document.getElementById("mobile-menu")?.classList.add("open");
    setMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    document.getElementById("mobile-menu")?.classList.remove("open");
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${pathname === "/" ? "dark-mode" : ""} ${
          !isMobile && !visible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="header-container">
          <div className="main-logo">
            <Link href="/">
              {logo && <Img image={logo} alt={logo.alt} width={100} />}
            </Link>
          </div>
          <nav className="main-nav relative" id="mobile-menu">
            <div className="main-nav__links">
              <ClientNavLinks
                navigation={navigation}
                onClick={handleCloseMobileMenu}
              />
            </div>
            <div className="main-cross" onClick={handleCloseMobileMenu}>
              <div className="main-cross__inner">
                <div className="main-cross__line1"></div>
                <div className="main-cross__line2"></div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="hamburger-button" onClick={handleOpenMobileMenu}>
        <div className="hamburger-button__inner">
          <div className="hamburger-button__line1"></div>
          <div className="hamburger-button__line2"></div>
        </div>
      </div>
    </>
  );
}