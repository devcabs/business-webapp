export default function Hero() {
  return (
    <section className="text-center max-w-2xl px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
        Smart Inventory Management
      </h1>
      <p className="mt-4 text-gray-600 text-sm sm:text-base">
        Choose a business function to get started.
      </p>

      {/* Branch Buttons */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/app/inventory"
          className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium text-center shadow hover:bg-blue-700 transition"
        >
          Inventory
        </a>
        <a
          href="/app/sales"
          className="block w-full px-6 py-3 bg-gray-800 text-white rounded-xl text-sm font-medium text-center shadow hover:bg-gray-900 transition"
        >
          Sales
        </a>
        <a
          href="/app/purchasing"
          className="block w-full px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-medium text-center shadow hover:bg-green-700 transition"
        >
          Purchasing
        </a>
        <a
          href="/app/reports"
          className="block w-full px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium text-center shadow hover:bg-indigo-700 transition"
        >
          Reports
        </a>
      </div>
    </section>
  );
}