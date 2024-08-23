import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "Free",
      features: ["1 resume", "Basic templates", "Export to PDF"],
    },
    {
      id: 2,
      name: "Pro",
      price: "$9.99/month",
      features: [
        "Unlimited resumes",
        "All templates",
        "Export to PDF & Word",
        "Priority support",
      ],
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "Custom branding",
        "Team management",
        "API access",
      ],
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

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-16 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400">
            &copy; 2023 ResumeForge. Build your future.
          </p>
        </div>
      </footer>
    </div>
  );
}
