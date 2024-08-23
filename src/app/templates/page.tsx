import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Templates() {
  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "A clean and modern template suitable for most industries.",
    },
    {
      id: 2,
      name: "Creative",
      description: "A bold design for those in creative fields.",
    },
    {
      id: 3,
      name: "Executive",
      description: "An elegant template for senior positions.",
    },
    {
      id: 4,
      name: "Tech",
      description: "A sleek design highlighting technical skills.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              ResumeForge
            </h1>
          </Link>
          <nav className="space-x-6">
            <Link
              href="/about"
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/templates"
              className="hover:text-blue-400 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Resume Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-800 rounded-lg p-8 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-4">{template.name}</h2>
              <p className="mb-6 text-gray-300">{template.description}</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg">
                Use This Template
              </Button>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-16 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 ResumeForge. Build your future.
          </p>
        </div>
      </footer>
    </div>
  );
}
