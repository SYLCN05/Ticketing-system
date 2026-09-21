import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="flex items-center justify-center p-4 font-mono text-lg bg-gradient-to-r from-theme-light to-theme-blue font-bold gap-4 list-none min-h-20 text-white">
      <li className="text-2xl">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="text-2xl">
        <NavLink to={"/Tickets"}>Tickets</NavLink>
      </li>
      <li className="text-2xl">
        <NavLink to={"/Contact"}>Contact</NavLink>
      </li>
    </div>
  );
}
