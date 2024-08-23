import Link from "next/link";
import React from "react";

export default function About() {
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

      <main className="container mx-auto px-4 py-16 max-w-screen-lg">
        <h1 className="text-4xl font-bold mb-8">About ResumeForge</h1>
        <p className="text-md mb-6">
          ResumeForge is a cutting-edge resume builder that combines modern
          design with intuitive user experience to help you create professional,
          eye-catching resumes effortlessly.
        </p>
        <p className="text-md mb-6">
          Created by Maxwell Young, a passionate web developer and designer with
          a deep understanding of what makes a resume stand out in today&apos;s
          competitive job market, ResumeForge was built to bridge the gap
          between job seekers and employers.
        </p>
        <p className="text-md mb-6">
          As a developer with experience in modern web technologies and a keen
          eye for detail, I&apos;ve crafted ResumeForge to reflect my commitment
          to quality design and user-centric functionality. Whether you&apos;re
          a student, a seasoned professional, or someone looking to switch
          careers, ResumeForge provides the tools you need to present your
          skills and experience in the best possible light.
        </p>
      </main>

      <footer className="mt-16 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400">
            &copy; 2024 ResumeForge. Build your future.
          </p>
        </div>
      </footer>
    </div>
  );
}
