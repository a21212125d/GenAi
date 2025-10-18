import React from 'react';

// Predefined list of ads to be rotated
const ads = [
  {
    title: "Supercharge Your Workflow",
    description: "Discover the #1 AI-powered productivity tool for teams.",
    cta: "Try For Free",
    link: "#",
  },
  {
    title: "Learn to Code with AI",
    description: "Join our interactive courses and build your first app in days.",
    cta: "Start Learning",
    link: "#",
  },
  {
    title: "Next-Gen Cloud Hosting",
    description: "Deploy your apps with blazing fast speed and 99.9% uptime.",
    cta: "Get Started",
    link: "#",
  },
];

const AdBanner = () => {
  // Select a random ad only once when the component first mounts
  const [randomAd] = React.useState(() => ads[Math.floor(Math.random() * ads.length)]);
  
  return React.createElement("div", { className: "my-6 p-4 bg-slate-800 rounded-lg border border-slate-700 relative text-left shadow-lg" },
    React.createElement("span", { className: "absolute top-2 right-2 text-xs text-slate-500 font-mono select-none" }, "Ad"),
    React.createElement("div", { className: "flex items-center justify-between gap-4" },
      React.createElement("div", null,
        React.createElement("h4", { className: "font-bold text-white" }, randomAd.title),
        React.createElement("p", { className: "text-sm text-slate-400" }, randomAd.description)
      ),
      React.createElement("a", {
        href: randomAd.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "px-4 py-2 text-sm font-semibold text-slate-950 bg-slate-200 rounded-md whitespace-nowrap hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-slate-800"
      }, randomAd.cta)
    )
  );
};

export default AdBanner;
