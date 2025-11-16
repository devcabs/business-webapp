export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 px-6 py-20 relative">

      {/* Soft glow behind title */}
      <div className="absolute top-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />

      <h2 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl">
        Run Your Inventory  
        <span className="block text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          Effortlessly.
        </span>
      </h2>

      <p className="text-gray-300 max-w-xl text-xl md:text-2xl mb-12 opacity-90">
        A clean and powerful internal tool to manage items, track stock, 
        and keep your business organized.
      </p>

      <button
        onClick={() => (window.location.href = "/inventory")}
        className="px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 
        text-xl font-medium shadow-xl shadow-indigo-900/40 transition-transform transform hover:scale-105"
      >
        Get Started
      </button>

      {/* Floating card */}
      <div className="mt-20 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl
        shadow-lg shadow-black/40 max-w-lg w-full transition hover:scale-[1.01]">
        <p className="text-gray-300 text-lg">
          ⚡ Lightning-fast dashboard.  
          📦 Smart item tracking.  
          🔍 Clean UI for quick actions.
        </p>
      </div>

    </div>
  );
}
