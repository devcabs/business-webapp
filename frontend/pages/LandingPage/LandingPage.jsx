import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <Hero />

        <section className="mt-12 max-w-xl text-sm text-gray-600">
          <p>
            Manage your inventory, track stock levels, and streamline your
            internal operations. This back‑office tool is optimized for speed,
            clarity, and reliability.
          </p>
        </section>

        <section className="mt-8">
          <a
            href="/app"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
          >
            Enter Dashboard
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
