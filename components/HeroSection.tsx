import React from "react";
import {
  BrainCircuit,
  BotMessageSquare,
  PieChart,
  FolderTree,
  Zap,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react";
import Link from "next/link";
import Navbar from "./Navbar";
import Iridescence from "./ui/iridesceneBG";

export default function HeroSection() {
  return (
    <div className="items-center justify-center min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="flex py-20 px-4 sm:px-6 lg:px-8 pt-30 relative overflow-hidden min-h-screen">
        {/* Iridescent Background */}
        <div className="absolute inset-0 opacity-30">
          <Iridescence 
            color={[1, 1, 1]}
            speed={0.3}
            amplitude={0.03}
            mouseReact={true}
          />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute left-10 top-20 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full blur-2xl opacity-50 animate-pulse delay-500"></div>

        <div className="relative max-w-6xl mx-auto text-center z-10 flex flex-col justify-center min-h-screen">
          

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 mb-6 leading-tight">
            Build Your Startup with
            <span className="block ">AI Co-Founders</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-tight">
            Get expert guidance from specialized AI agents. Your{" "}
            <span className="font-bold text-violet-600">CTO</span>,{" "}
            <span className="font-bold text-violet-600">CMO</span>,{" "}
            <span className="font-bold text-violet-600">CFO</span>, and{" "}
            <span className="font-bold text-violet-600">Architect</span> in one
            powerful platform to help you build and scale your startup.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-white border border-violet-300 px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="h-4 w-4 text-violet-600" />
              <span className="text-violet-700 font-medium">Free to start</span>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-white border border-violet-300 px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="h-4 w-4 text-violet-600" />
              <span className="text-violet-700 font-medium">No credit card required</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]" href="/chat">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                AI Team
              </span>
            </h3>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Leverage specialized AI agents to cover all your startup bases with
              cutting-edge intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* CTO Bot */}
            <div className="group relative text-center bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 w-fit mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <BrainCircuit className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  CTO Bot
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Get expert advice on your tech stack, MVP features, and
                  development roadmap.
                </p>
              </div>
            </div>

            {/* CMO Bot */}
            <div className="group relative text-center bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-4 w-fit mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <BotMessageSquare className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  CMO Bot
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Craft your brand identity, marketing strategies, and customer
                  acquisition plans.
                </p>
              </div>
            </div>

            {/* CFO Bot */}
            <div className="group relative text-center bg-gradient-to-br from-white to-indigo-50 rounded-2xl border border-indigo-200 shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mx-auto bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full p-4 w-fit mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  CFO Bot
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Explore monetization models, pricing strategies, and potential
                  investment avenues.
                </p>
              </div>
            </div>

            {/* Architect Bot */}
            <div className="group relative text-center bg-gradient-to-br from-white to-emerald-50 rounded-2xl border border-emerald-200 shadow-lg hover:shadow-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-4 w-fit mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <FolderTree className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Architect Bot
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Generate a folder structure for your project to ensure
                  scalability and organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}