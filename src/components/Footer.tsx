import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/src/assets/logo.png"

export default function Footer() {
  return (
    <footer className="bg-base-100 p-10 text-neutral-content ">
        {/* <div className="footer grid-rows-2 ">
        <nav>
        <header className="footer-title">Services</header>
        <a className="link-hover link">Branding</a>
        <a className="link-hover link">Design</a>
        <a className="link-hover link">Marketing</a>
        <a className="link-hover link">Advertisement</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link-hover link">About us</a>
        <a className="link-hover link">Contact</a>
        <a className="link-hover link">Jobs</a>
        <a className="link-hover link">Press kit</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link-hover link">Terms of use</a>
        <a className="link-hover link">Privacy policy</a>
        <a className="link-hover link">Cookie policy</a>
      </nav>
      <nav>
        <header className="footer-title">Social</header>
        <a className="link-hover link">Twitter</a>
        <a className="link-hover link">Instagram</a>
        <a className="link-hover link">Facebook</a>
        <a className="link-hover link">Github</a>
      </nav>
      <nav>
        <header className="footer-title">Explore</header>
        <a className="link-hover link">Features</a>
        <a className="link-hover link">Enterprise</a>
        <a className="link-hover link">Security</a>
        <a className="link-hover link">Pricing</a>
      </nav>
      <nav>
        <header className="footer-title">Apps</header>
        <a className="link-hover link">Mac</a>
        <a className="link-hover link">Windows</a>
        <a className="link-hover link">iPhone</a>
        <a className="link-hover link">Android</a>
      </nav>
        </div> */}
      
      <aside className="flex flex-1 grid-flow-col items-center mt-6 justify-center">
        {/* <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-center"> */}
          <Link href={"/"}>
            <Image src={logo} alt= "logo" width= {70} height={70}/>
          </Link>
        <p>Copyright © 2024 - All right reserved</p>
        
        {/* </nav> */}
      </aside>
    </footer>
  );
}
