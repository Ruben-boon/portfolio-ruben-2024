"use client";

import Link from "next/link";
import Img from "@/ui/components/Img";
import ClientNavLinks from "@/ui/components/ClientNavLinks";
import { useState, useEffect } from "react";

export default function Header({ logo, navigation }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMobile) {
        setScrolled(currentScrollY > 280);

        if (currentScrollY > 280) {
          if (currentScrollY > lastScrollY) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        }
      } else {
        setScrolled(false);
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobile, menuOpen]);

  const handleOpenMobileMenu = () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.add("open");
    setMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.remove("open");
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          ${!isMobile && scrolled ? "bg-dark" : "bg-transparent"} 
          ${!isMobile && !visible ? "-translate-y-full" : "translate-y-0"}
        `}
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
              <div className="main-cross__line1"></div>
              <div className="main-cross__line2"></div>
            </div>
          </nav>
        </div>
      </header>
      <div className="hamburger-button" onClick={handleOpenMobileMenu}>
        <div className="hamburger-button__line1"></div>
        <div className="hamburger-button__line2"></div>
      </div>
    </>
  );
}
