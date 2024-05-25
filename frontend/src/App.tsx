import { Navbar, NavbarBrand } from "@nextui-org/react";
import { AcmeLogo } from "./components/icons/AcmedLogo"

export default function App() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <button className="font-bold text-inherit">ACME</button>
      </NavbarBrand>
    </Navbar>
  );
}
