"use client";

// Packages
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import Image from "next/image";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false); // Track scrolling state for styling changes

  const pathname = usePathname(); // Get current route to highlight active menu

  const menus = [
    { id: 1, href: "/", linkText: "HOME" },
    { id: 2, href: "/shop", linkText: "SHOP" },
    { id: 3, href: "/about", linkText: "ABOUT" },
    { id: 4, href: "/how-it-works", linkText: "HOW IT WORKS" },
    { id: 5, href: "/become-lender", linkText: "BECOME A LENDER" },
    { id: 6, href: "/find-near", linkText: "FIND NEAR YOU" },
  ];

  // Track window scroll to update navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true); // Set navbar background when scrolling
      } else {
        setScrolling(false); // Reset when not scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`py-3 fixed top-0 z-50 text-white w-full h-[60px]  ${
        scrolling && "bg-transparent" // Add background when scrolling
      }  ${
        pathname === "/"
          ? !scrolling && "md:mt-7" // Add margin on homepage when not scrolling
          : "bg-transparent mt-0" // Default background for other pages
      } transition duration-300`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex items-center md:gap-x-3 lg:gap-x-2">
            {/* Desktop Menu Links */}
            {menus.map((menu) => (
              <Button
                key={menu.id}
                variant="link"
                effect="hoverUnderline"
                asChild
                className="text-white"
              >
                <Link
                  href={menu.href}
                  className={`${
                    pathname === menu.href ? "font-normal" : "font-light" // Highlight active menu
                  } leading-[20px] tracking-[20%]`}
                >
                  {menu.linkText}
                </Link>
              </Button>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-2">
            <Image src="/logos/logo.png" height={60} width={60} alt="Logo" />
          </div>

          {/* Login button */}
          <div className="hidden md:block">
            <Button
              variant="link"
              effect="hoverUnderline"
              asChild
              className="text-white"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile Responsive */}
          <div className="md:hidden flex items-center justify-between gap-x-4 w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-1" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-white text-black">
                <div className="flex flex-col items-center gap-y-8 mt-6">
                  {/* Login button for mobile */}

                  <div className="flex flex-col items-center gap-y-5">
                    {/* Mobile Menu Links */}
                    {menus.map((menu) => (
                      <Link
                        key={menu.id}
                        href={menu.href}
                        className={`${
                          pathname === menu.href
                            ? "font-semibold"
                            : "font-light" // Highlight active menu on mobile
                        }`}
                      >
                        <SheetClose>{menu.linkText}</SheetClose>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <Button
                variant="link"
                effect="hoverUnderline"
                asChild
                className="text-white"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
