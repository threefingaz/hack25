import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImpactMetrics from "../components/ImpactMetrics";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Navigation from "../components/Navigation";
import {
  getButtonClasses,
  getContainerClasses,
  getCardClasses,
  getTextClasses,
  getBackgroundClasses,
} from "../design-system/utils";
// Import persona photos
import annaPhoto from "../assets/anna-photo.jpg";
import mehmetPhoto from "../assets/mehmet-photo.jpg";
import mariaPhoto from "../assets/maria-photo.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleGetStarted = () => {
    navigate("/connect");
  };

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona.id);
    // Store selected persona for session consistency
    localStorage.setItem("selectedPersona", persona.id);
    localStorage.setItem("selectedPersonaName", persona.name);
    localStorage.setItem("selectedPersonaBusiness", persona.business);
    console.log("HomePage - Persona selected:", persona.id, persona.name);

    // Auto-redirect to bank connection after persona selection
    setTimeout(() => {
      navigate("/connect");
    }, 1500); // Give users time to see their selection
  };

  const personas = [
    {
      id: "anna",
      name: "Anna Schmidt",
      business: "Food Truck Owner",
      description: "Runs a popular food truck with steady weekly patterns",
      photo: annaPhoto,
      accountType: "Business",
      balance: "€2,847",
      averageMonthlyIncome: "€2,100",
      pattern: "Weekly income patterns with weekend variations",
      expectedLoan: "€525/week",
      latestTransaction: {
        type: "income",
        description: "Weekend Food Sales",
        amount: "+€287",
        time: "Today, 16:30",
        icon: "🚚",
        iconBg: "bg-orange-100",
      },
      bgColor: "bg-gray-900 text-white",
    },
    {
      id: "mehmet",
      name: "Mehmet Özkan",
      business: "Online Retailer",
      description: "E-commerce business with monthly promotional spikes",
      photo: mehmetPhoto,
      accountType: "Business",
      balance: "€4,235",
      averageMonthlyIncome: "€3,500",
      pattern: "Monthly spikes with consistent daily base income",
      expectedLoan: "€875/week",
      latestTransaction: {
        type: "income",
        description: "Online Store Revenue",
        amount: "+€156",
        time: "Today, 14:20",
        icon: "🛒",
        iconBg: "bg-blue-100",
      },
      bgColor: "bg-orange-100",
    },
    {
      id: "maria",
      name: "Maria Rodriguez",
      business: "Event Planner",
      description: "Growing event planning business with steady bookings",
      photo: mariaPhoto,
      accountType: "Business",
      balance: "€2,523",
      averageMonthlyIncome: "€2,200",
      pattern: "Steady growth with seasonal peaks",
      expectedLoan: "€550/week",
      latestTransaction: {
        type: "expense",
        description: "Event Equipment",
        amount: "-€89",
        time: "Yesterday, 11:45",
        icon: "🎉",
        iconBg: "bg-purple-100",
      },
      bgColor: "bg-green-100",
    },
    {
      id: "thomas",
      name: "Thomas Mueller",
      business: "Caterer",
      description: "Early-stage catering business with irregular income",
      photo: annaPhoto,
      accountType: "Business",
      balance: "€432",
      averageMonthlyIncome: "€600",
      pattern: "Very irregular income, high volatility",
      expectedLoan: "REJECTED",
      latestTransaction: {
        type: "expense",
        description: "Kitchen rental",
        amount: "-€600",
        time: "Today, 09:00",
        icon: "🍳",
        iconBg: "bg-red-100",
      },
      bgColor: "bg-red-100",
    },
    {
      id: "stefan",
      name: "Stefan Weber",
      business: "Market Vendor",
      description: "Declining produce stand business",
      photo: mehmetPhoto,
      accountType: "Business",
      balance: "€156",
      averageMonthlyIncome: "€800",
      pattern: "Declining revenue trend, negative cash flow",
      expectedLoan: "REJECTED",
      latestTransaction: {
        type: "expense",
        description: "Produce wholesale",
        amount: "-€250",
        time: "Today, 06:00",
        icon: "🥬",
        iconBg: "bg-red-100",
      },
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className={"min-h-screen " + getBackgroundClasses("default")}>
      <Navigation />

      {/* Combined Hero and Persona Section */}
      <div className={getContainerClasses("pt-24 pb-16")}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          style={{ minHeight: "700px" }}
        >
          {/* Left side - Hero content */}
          <div className="max-w-xl">
            <h1
              className={
                getTextClasses("h1") +
                " text-5xl lg:text-6xl leading-tight mb-8"
              }
            >
              Germany's first{" "}
              <span className="text-slate-900">weekly credit line</span>
            </h1>

            <p className={getTextClasses("body") + " text-xl mb-2"}>
              CashFlow Bridge is the{" "}
              <span className="font-semibold text-slate-900">
                weekly micro-credit platform
              </span>
            </p>
            <p className={getTextClasses("body") + " text-xl mb-6"}>
              for cash-flow businesses who need flexible funding
            </p>

            <div
              className={
                getCardClasses("outline", "sm") +
                " bg-slate-50 border-slate-200 mb-8"
              }
            >
              <div className="flex items-start text-sm text-slate-800">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <div>
                  <strong className="text-slate-900">
                    €500-€5,000 weekly credit
                  </strong>
                  <div className="text-slate-700 mt-1">
                    Below Silvr's €5K minimum • Weekly terms vs iwoca's monthly
                    only
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className={getButtonClasses("primary", "lg") + " text-lg mb-4"}
            >
              Get weekly free analysis
            </button>

            <p className={getTextClasses("caption") + " mb-3"}>
              No credit checks • Renews every Monday • Skip weeks anytime
            </p>

            {/* Rejection flow links */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() =>
                  handlePersonaSelect(personas.find((p) => p.id === "thomas"))
                }
                className="text-red-600 hover:text-red-700 underline"
              >
                Test Thomas (Rejection - Low Income)
              </button>
              <span className="text-gray-400">•</span>
              <button
                onClick={() =>
                  handlePersonaSelect(personas.find((p) => p.id === "stefan"))
                }
                className="text-red-600 hover:text-red-700 underline"
              >
                Test Stefan (Rejection - Negative Flow)
              </button>
            </div>
          </div>

          {/* Right side - Persona cards */}
          <div className="relative" style={{ minHeight: "650px" }}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Left column - Mehmet card */}
              <div className="flex flex-col justify-center">
                <div
                  onClick={() => handlePersonaSelect(personas[1])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group ${
                    selectedPersona === personas[1].id
                      ? "ring-4 ring-slate-900"
                      : ""
                  }`}
                  style={{
                    height: "380px",
                    backgroundImage: `url(${personas[1].photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.8)",
                  }}
                >
                  {/* Demo Badge - hides on hover */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Content - changes on hover */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    {/* Default content */}
                    <div className="transition-opacity duration-300 group-hover:opacity-0">
                      <h2 className="text-3xl font-bold mb-2">
                        {personas[1].name}
                      </h2>
                      <p className="text-sm opacity-80">
                        {personas[1].description}
                      </p>
                    </div>

                    {/* Hover content */}
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h2 className="text-3xl font-bold mb-2">
                        Mehmet's Experience
                      </h2>
                      <p className="text-lg opacity-90">
                        Click to start the demo
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Anna and Maria cards */}
              <div className="flex flex-col gap-4">
                {/* Top right card - Anna */}
                <div
                  onClick={() => handlePersonaSelect(personas[0])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group ${
                    selectedPersona === personas[0].id
                      ? "ring-4 ring-slate-900"
                      : ""
                  }`}
                  style={{
                    height: "320px",
                    backgroundImage: `url(${personas[0].photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                >
                  {/* Demo Badge - hides on hover */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Content - changes on hover */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    {/* Default content */}
                    <div className="transition-opacity duration-300 group-hover:opacity-0">
                      <h2 className="text-2xl font-bold mb-1">
                        {personas[0].name}
                      </h2>
                      <p className="text-sm opacity-80">
                        {personas[0].description}
                      </p>
                    </div>

                    {/* Hover content */}
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h2 className="text-2xl font-bold mb-1">
                        Anna's Experience
                      </h2>
                      <p className="text-base opacity-90">
                        Click to start the demo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom right card - Maria */}
                <div
                  onClick={() => handlePersonaSelect(personas[2])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group ${
                    selectedPersona === personas[2].id
                      ? "ring-4 ring-slate-900"
                      : ""
                  }`}
                  style={{
                    height: "300px",
                    backgroundImage: `url(${personas[2].photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.85)",
                  }}
                >
                  {/* Demo Badge - hides on hover */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/1ç0 to-transparent" />

                  {/* Content - changes on hover */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    {/* Default content */}
                    <div className="transition-opacity duration-300 group-hover:opacity-0">
                      <h2 className="text-2xl font-bold mb-1">
                        {personas[2].name}
                      </h2>
                      <p className="text-sm opacity-80">
                        {personas[2].description}
                      </p>
                    </div>

                    {/* Hover content */}
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h2 className="text-2xl font-bold mb-1">
                        Maria's Experience
                      </h2>
                      <p className="text-base opacity-90">
                        Click to start the demo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPersona && (
          <div className="text-center mt-12">
            <div
              className={
                getCardClasses("outline", "sm") +
                " bg-slate-50 border-slate-200 inline-block"
              }
            >
              <p className={getTextClasses("body") + " font-medium mb-2"}>
                Starting demo for{" "}
                {personas.find((p) => p.id === selectedPersona)?.name}
              </p>
              <p className={getTextClasses("caption")}>
                You'll now experience their complete loan application journey.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className={getBackgroundClasses("surface") + " py-16"}>
        <div className={getContainerClasses()}>
          <div className="max-w-4xl mx-auto">
            <h2 className={getTextClasses("h2") + " text-center mb-12"}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  1. Connect Your Bank
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  Securely connect your business bank account in seconds
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  2. Analyze & Get Tips
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  We analyze your cash flow patterns and provide personalized business tips to optimize your finances
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-slate-900">€</span>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  3. Get Weekly Credit
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  Receive your weekly credit line that renews every Monday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Business Tips */}
      <div className={getBackgroundClasses("surface") + " py-16"}>
        <div className={getContainerClasses()}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={getTextClasses("h2") + " mb-4"}>
                Smart Business Insights
              </h2>
              <p className={getTextClasses("body") + " text-lg text-slate-600 max-w-2xl mx-auto"}>
                Beyond credit decisions, we analyze your transaction patterns to provide personalized tips that help grow your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={getCardClasses("default", "md") + " bg-white"}>
                <div className="flex items-start">
                  <div className="bg-lime-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={getTextClasses("h4") + " mb-3"}>
                      Personalized Recommendations
                    </h3>
                    <p className={getTextClasses("body") + " leading-relaxed text-slate-600"}>
                      Get tailored advice based on your spending patterns - from optimizing supplier payments to identifying cost-saving opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className={getCardClasses("default", "md") + " bg-white"}>
                <div className="flex items-start">
                  <div className="bg-lime-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={getTextClasses("h4") + " mb-3"}>
                      Cash Flow Optimization
                    </h3>
                    <p className={getTextClasses("body") + " leading-relaxed text-slate-600"}>
                      Learn how to improve your weekly cash flow cycles with actionable insights from your transaction history
                    </p>
                  </div>
                </div>
              </div>

              <div className={getCardClasses("default", "md") + " bg-white"}>
                <div className="flex items-start">
                  <div className="bg-lime-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={getTextClasses("h4") + " mb-3"}>
                      Revenue Growth Tips
                    </h3>
                    <p className={getTextClasses("body") + " leading-relaxed text-slate-600"}>
                      Discover peak sales periods and receive suggestions to maximize revenue during your strongest business days
                    </p>
                  </div>
                </div>
              </div>

              <div className={getCardClasses("default", "md") + " bg-white"}>
                <div className="flex items-start">
                  <div className="bg-lime-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={getTextClasses("h4") + " mb-3"}>
                      Risk Management
                    </h3>
                    <p className={getTextClasses("body") + " leading-relaxed text-slate-600"}>
                      Identify potential cash flow risks and get early warnings about irregular spending patterns
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={getCardClasses("outline", "lg") + " mt-12 bg-gradient-to-r from-slate-50 to-lime-50 border-lime-200"}>
              <div className="text-center">
                <h3 className={getTextClasses("h4") + " mb-4"}>
                  See Your Tips in Action
                </h3>
                <p className={getTextClasses("body") + " mb-6 text-slate-600"}>
                  Each demo persona receives different personalized tips based on their unique business patterns
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="bg-white px-4 py-2 rounded-full border border-slate-200">
                    <span className="font-medium">Anna:</span> Weekend sales optimization
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full border border-slate-200">
                    <span className="font-medium">Mehmet:</span> Inventory cycle management
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full border border-slate-200">
                    <span className="font-medium">Maria:</span> Seasonal planning strategies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className={getBackgroundClasses("default") + " py-16"}>
        <div className={getContainerClasses()}>
          <div className="max-w-4xl mx-auto">
            <h2 className={getTextClasses("h2") + " text-center mb-12"}>
              Why Choose Weekly Credit?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  Perfect for Micro-Businesses
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  €500-€5,000 weekly credit - below Silvr's €5K minimum, above
                  daily lenders
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  Matches Your Cycle
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  Weekly terms vs iwoca's monthly only - perfect for food
                  trucks, market vendors
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className={getTextClasses("h4") + " mb-3"}>
                  Maximum Flexibility
                </h3>
                <p className={getTextClasses("body") + " leading-relaxed"}>
                  Renews every Monday, skip weeks with 24hr notice - no fixed
                  payments
                </p>
              </div>
            </div>

            <div
              className={getCardClasses("default", "md") + " mt-12 bg-white"}
            >
              <h3 className={getTextClasses("h4") + " mb-6 text-center"}>
                How We Compare
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th
                        className={
                          "text-left py-3 px-4 font-semibold " +
                          getTextClasses("body")
                        }
                      >
                        Feature
                      </th>
                      <th className="text-center py-3 px-4 bg-slate-50 font-bold text-slate-900 rounded-t-lg">
                        CashFlow Bridge
                      </th>
                      <th
                        className={
                          "text-center py-3 px-4 font-semibold " +
                          getTextClasses("body")
                        }
                      >
                        Silvr
                      </th>
                      <th
                        className={
                          "text-center py-3 px-4 font-semibold " +
                          getTextClasses("body")
                        }
                      >
                        iwoca
                      </th>
                      <th
                        className={
                          "text-center py-3 px-4 font-semibold " +
                          getTextClasses("body")
                        }
                      >
                        Traditional Banks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td
                        className={
                          "py-3 px-4 font-medium " + getTextClasses("body")
                        }
                      >
                        Minimum Amount
                      </td>
                      <td className="text-center py-3 px-4 bg-slate-50 font-semibold text-slate-900">
                        €500
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        €5,000
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        €1,000
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        €10,000
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td
                        className={
                          "py-3 px-4 font-medium " + getTextClasses("body")
                        }
                      >
                        Repayment Terms
                      </td>
                      <td className="text-center py-3 px-4 bg-slate-50 font-semibold text-slate-900">
                        Weekly
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Monthly
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Monthly
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Monthly
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td
                        className={
                          "py-3 px-4 font-medium " + getTextClasses("body")
                        }
                      >
                        Approval Time
                      </td>
                      <td className="text-center py-3 px-4 bg-slate-50 font-semibold text-slate-900">
                        Instant
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        2-3 days
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        24 hours
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        2-3 weeks
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={
                          "py-3 px-4 font-medium " + getTextClasses("body")
                        }
                      >
                        Flexibility
                      </td>
                      <td className="text-center py-3 px-4 bg-slate-50 font-semibold text-slate-900">
                        Skip weeks
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Fixed
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Fixed
                      </td>
                      <td
                        className={
                          "text-center py-3 px-4 " + getTextClasses("body")
                        }
                      >
                        Fixed
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <div id="cta-section" className="bg-slate-900 py-16">
        <div className={getContainerClasses("text-center")}>
          <div className="max-w-2xl mx-auto">
            <h2 className={getTextClasses("h2") + " text-white mb-4"}>
              Ready for Weekly Credit?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join Germany's first weekly micro-credit platform
            </p>
            <button
              onClick={handleGetStarted}
              className={
                getButtonClasses("primary", "lg") +
                " text-lg font-bold shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-slate-900"
              }
            >
              GET WEEKLY CREDIT LINE
            </button>
            <p className="text-sm text-slate-400 mt-4">
              Free analysis • Weekly renewals • Perfect for micro-businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
