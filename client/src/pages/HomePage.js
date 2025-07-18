import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImpactMetrics from "../components/ImpactMetrics";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Navigation from "../components/Navigation";
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
    console.log('HomePage - Persona selected:', persona.id, persona.name);

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
      description: "Freelance event planner with seasonal variations",
      photo: mariaPhoto,
      accountType: "Business",
      balance: "€1,923",
      averageMonthlyIncome: "€1,800",
      pattern: "Seasonal patterns with holiday boosts",
      expectedLoan: "€450/week",
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Combined Hero and Persona Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          style={{ minHeight: "700px" }}
        >
          {/* Left side - Hero content */}
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Germany's first{" "}
              <span className="text-blue-600">weekly credit line</span>
            </h1>

            <p className="text-xl text-gray-600 mb-2">
              CashFlow Bridge is the{" "}
              <span className="font-semibold text-gray-900">
                weekly micro-credit platform
              </span>
            </p>
            <p className="text-xl text-gray-600 mb-4">
              for cash-flow businesses who need flexible funding
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-center text-sm text-blue-800">
                <svg
                  className="w-5 h-5 mr-2"
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
                  <strong>€500-€5,000 weekly credit</strong> • Below Silvr's €5K
                  minimum • Weekly terms vs iwoca's monthly only
                </div>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Get Weekly Credit - Free Analysis
            </button>

            <p className="text-sm text-gray-500 mt-4">
              No credit checks • Renews every Monday • Skip weeks anytime
            </p>
            {/* Rejection flow links */}
                            <div className="mt-2">
                              <button
                                onClick={() =>
                                  handlePersonaSelect(
                                    personas.find((p) => p.id === "thomas"),
                                  )
                                }
                                className="text-xs text-red-600 hover:text-red-800 underline"
                              >
                                Test Thomas (Rejection - Low Income)
                              </button>
                              <span className="text-xs text-gray-400 mx-2">•</span>
                              <button
                                onClick={() =>
                                  handlePersonaSelect(
                                    personas.find((p) => p.id === "stefan"),
                                  )
                                }
                                className="text-xs text-red-600 hover:text-red-800 underline"
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
                      ? "ring-4 ring-blue-500"
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
                    <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

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
                      ? "ring-4 ring-blue-500"
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
                    <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

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
                      ? "ring-4 ring-blue-500"
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
                    <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 group-hover:opacity-0">
                      DEMO
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800 font-medium mb-2">
                ✨ Starting demo for{" "}
                {personas.find((p) => p.id === selectedPersona)?.name}
              </p>
              <p className="text-sm text-blue-600">
                You'll now experience their complete loan application journey.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  1. Connect Your Bank
                </h3>
                <p className="text-gray-600">
                  Securely connect your business bank account in seconds
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  2. Analyze Weekly Patterns
                </h3>
                <p className="text-gray-600">
                  We analyze your weekly cash flow patterns for perfect credit
                  fit
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  3. Get Weekly Credit
                </h3>
                <p className="text-gray-600">
                  Receive your weekly credit line that renews every Monday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              Why Choose Weekly Credit?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Perfect for Micro-Businesses
                </h3>
                <p className="text-gray-600">
                  €500-€5,000 weekly credit - below Silvr's €5K minimum, above
                  daily lenders
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Matches Your Cycle
                </h3>
                <p className="text-gray-600">
                  Weekly terms vs iwoca's monthly only - perfect for food
                  trucks, market vendors
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Maximum Flexibility
                </h3>
                <p className="text-gray-600">
                  Renews every Monday, skip weeks with 24hr notice - no fixed
                  payments
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                How We Compare
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4">Feature</th>
                      <th className="text-center py-2 px-4 bg-blue-50 font-bold">
                        CashFlow Bridge
                      </th>
                      <th className="text-center py-2 px-4">Silvr</th>
                      <th className="text-center py-2 px-4">iwoca</th>
                      <th className="text-center py-2 px-4">
                        Traditional Banks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 font-medium">Minimum Amount</td>
                      <td className="text-center py-2 px-4 bg-blue-50 font-semibold text-blue-900">
                        €500
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        €5,000
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        €1,000
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        €10,000
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 font-medium">Repayment Terms</td>
                      <td className="text-center py-2 px-4 bg-blue-50 font-semibold text-blue-900">
                        Weekly
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        Monthly
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        Monthly
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        Monthly
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 font-medium">Approval Time</td>
                      <td className="text-center py-2 px-4 bg-blue-50 font-semibold text-blue-900">
                        Instant
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        2-3 days
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        24 hours
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        2-3 weeks
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Flexibility</td>
                      <td className="text-center py-2 px-4 bg-blue-50 font-semibold text-blue-900">
                        Skip weeks
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        Fixed
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
                        Fixed
                      </td>
                      <td className="text-center py-2 px-4 text-gray-600">
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
      <div id="cta-section" className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Weekly Credit?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join Germany's first weekly micro-credit platform
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
            >
              Get Weekly Credit Line
            </button>
            <p className="text-sm text-blue-200 mt-4">
              Free analysis • Weekly renewals • Perfect for micro-businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
