"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Spinner,
} from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

const Navber = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session ,isPending} = useSession();

  if(isPending){
    return (<div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-muted">Loding..</span>
      </div>)
  }
  const links = (
    <>
      <li>
        <Link href="/future">Features</Link>
      </li>
      <li>
        <Link href="/settings">Settings</Link>
      </li>
      <li>
        <Link href="/dashbord" className="font-medium text-accent" aria-current="page">
          Dashboard
        </Link>
      </li>
      {
        session?.user && <li>
      
        <Link href="/pricing">Pricing</Link>:
    
      </li>}
    </>
  );
  const authLinks = <>
        {
            session?.user ? <>
                <span>Welcome, {session.user?.name}</span>
                <Button onClick={() => signOut()}>Sign Out</Button>
            </> : <>
                <Link href="/sing-in">Sign in</Link>
                <Link href="/sing-up"><Button>Sign Up</Button></Link>
            </>
        }
    </>

  

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <Link href="/" className="font-bold">ACME</Link>
          </div>
        </div>
        <ul className="hidden items-center  gap-4 md:flex">{links}</ul>
        <div className="hidden items-center gap-4 md:flex">{authLinks}</div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>

            {links}
            </li>
            <li>

            {authLinks}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navber;
