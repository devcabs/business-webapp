export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm h-14 flex items-center px-4 relative">
      <div className="font-semibold text-gray-800 text-lg">Inventory App</div>

      {/* Desktop Links */}
      <div className="ml-auto space-x-6 text-sm text-gray-600 hidden sm:flex">
        <a href="/" className="hover:text-gray-900 transition">Home</a>
        <a href="/app" className="hover:text-gray-900 transition">Dashboard</a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="ml-auto sm:hidden text-gray-700 text-2xl focus:outline-none"
        onClick={() => {
          const menu = document.getElementById("mobile-menu");
          if (menu) menu.classList.toggle("hidden");
        }}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className="absolute top-14 left-0 w-full bg-white shadow-md py-3 px-4 space-y-2 text-sm text-gray-700 hidden sm:hidden z-20"
      >
        <a href="/" className="block w-full hover:text-gray-900 transition">Home</a>
        <a href="/app" className="block w-full hover:text-gray-900 transition">Dashboard</a>
      </div>
    </nav>
  );
}