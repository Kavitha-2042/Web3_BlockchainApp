import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({ title, classprops }: any) => {
  return <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>;
};

const Navbar = () => {
  return (
    <div>
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <h1 className="text-white  cursor-pointer text-3xl ">KRYPTO</h1>
        </div>
        <ul className=" text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <NavBarItem
              key={item + index}
              title={item}
              classprops={undefined}
            />
          ))}
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
