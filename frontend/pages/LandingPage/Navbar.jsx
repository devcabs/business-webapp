export default function Navbar() {
  return (
    <nav className="w-full py-5 px-10 flex justify-between items-center
      backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg shadow-black/30">
      
      <h1 className="text-3xl font-extrabold tracking-wide">
        <span className="text-white">Inventory</span>
        <span className="text-indigo-400">Pro</span>
      </h1>

      <button
        onClick={() => (window.location.href = "/inventory")}
        className="px-6 py-2 rounded-xl bg-indigo-600/70 hover:bg-indigo-500 
        transition shadow-lg shadow-indigo-900/40 text-lg"
      >
        Go to Dashboard →
      </button>
    </nav>
  );
}
