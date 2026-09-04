import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="flex items-center justify-center p-4 font-mono text-lg bg-gradient-to-r from-white via-blue-500 to-black font-medium gap-4 list-none min-h-20 text-white">
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/Tickets"}>Tickets</NavLink>
      </li>
      <li>
        <NavLink to={"/Contact"}>Contact</NavLink>
      </li>
    </div>
  );
}
