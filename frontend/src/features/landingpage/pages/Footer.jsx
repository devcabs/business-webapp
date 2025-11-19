export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-xs text-gray-500 border-t mt-12">
      <p>© {new Date().getFullYear()} Inventory App. All rights reserved.</p>
    </footer>
  );
}
