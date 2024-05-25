import { Navbar as Nav, NavbarBrand } from "@nextui-org/react";
import { Link } from 'react-router-dom';

import { AcmeLogo } from "../icons/AcmedLogo";

export default function Navbar() {
  return (
    <Nav isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <Link to={"/"} className="font-bold text-inherit">ACME</Link>
      </NavbarBrand>
    </Nav>
  );
}
