export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-600 text-white relative overflow-hidden">

      {/* Background large gradient circle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-teal-300 to-blue-500 rounded-full opacity-70 blur-[80px]"></div>

      {/* Navbar */}
      <nav className="w-full py-6 px-10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-[3px] border-white rounded-full"></div>
          <h1 className="text-2xl font-semibold tracking-wide">Vibrant</h1>
        </div>

        <div className="hidden md:flex gap-10 text-sm font-medium opacity-90">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Product</a>
          <a href="#" className="hover:text-white">Team</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Blog</a>
        </div>

        {/* Hamburger */}
        <div className="w-8 h-8 flex flex-col justify-center md:hidden cursor-pointer">
          <div className="h-[3px] bg-white mb-1 rounded"></div>
          <div className="h-[3px] bg-white mb-1 rounded"></div>
          <div className="h-[3px] bg-white rounded"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 mt-24">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Minimal Design
        </h2>

        <p className="text-white/90 max-w-xl text-lg md:text-xl mb-10">
          Clean. Smooth. Modern.  
          A minimal layout inspired UI — perfect for dashboards & apps.
        </p>

        <button className="px-10 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-xl hover:bg-blue-50 transition">
          LEARN MORE
        </button>

        {/* Carousel dots */}
        <div className="flex gap-2 mt-10 opacity-80">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 border border-white rounded-full"></div>
          <div className="w-3 h-3 border border-white rounded-full"></div>
          <div className="w-3 h-3 border border-white rounded-full"></div>
        </div>
      </div>

      {/* Side label */}
      <div className="absolute right-5 bottom-20 rotate-90 text-sm tracking-widest opacity-60">
        DESIGN TEMPLATE
      </div>
    </div>
  );
}
