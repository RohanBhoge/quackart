const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[3%] justify-between ">
      <p className="text-[#ff8c42] text-2xl font-semibold cursor-pointer font-serif">
        QuickCart
      </p>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
