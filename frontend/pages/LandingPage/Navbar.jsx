export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm h-14 flex items-center px-6">
      <div className="font-semibold text-gray-800 text-lg">Inventory App</div>
      <div className="ml-auto space-x-6 text-sm text-gray-600 hidden sm:flex">
        <a href="/" className="hover:text-gray-900 transition">Home</a>
        <a href="/app" className="hover:text-gray-900 transition">Dashboard</a>
      </div>
    </nav>
  );
}