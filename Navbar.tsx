


function Navbar() {

  return (
    <nav className="md:fixed top-0 left-0 right-0 z-20 px-10 my-5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-1 border-violet-900/10 bg-white/20 rounded-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-gray-800">
              Pitch<span className="text-violet-600 font-bold">Lab</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
