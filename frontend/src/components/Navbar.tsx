import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full flex justify-between p-5 bg-[#82837d] bg-opacity-30 backdrop-blur z-10">
      <div className="flex gap-2">
        <button className="px-5 py-2 border border-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-[#82837d] transition-all hover:-translate-y-0.5">
          <i className="ph-bold ph-arrow-left"></i>Collection
        </button>
        <button className="px-5 py-2 border border-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-[#82837d] transition-all hover:-translate-y-0.5">
          <i className="ph-bold ph-arrow-down"></i>Size
        </button>
      </div>
      <div className="flex gap-2">
        <button className="px-5 py-2 border border-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-[#82837d] transition-all hover:-translate-y-0.5">
          USD
        </button>
        <button className="px-5 py-2 border border-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-[#82837d] transition-all hover:-translate-y-0.5">
          Cart <span className="ml-1">0</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;