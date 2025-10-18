import React, { useState } from 'react';
import ImageGenerator from './ImageGenerator.js';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('image');

  const tabStyles = "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-brand-secondary";
  const activeTabStyles = "bg-slate-800 text-white";
  const inactiveTabStyles = "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200";

  return React.createElement("div", { className: "min-h-screen bg-slate-950 flex flex-col items-center p-4 lg:p-8" },
    React.createElement("header", { className: "text-center mb-8" },
      React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-2" }, "GenAi"),
      React.createElement("p", { className: "text-slate-400 text-lg" }, "Generate stunning images with generative AI.")
    ),
    React.createElement("nav", { className: "mb-8", "aria-label": "App sections" },
      React.createElement("div", { className: "flex space-x-2 p-1 bg-slate-900 rounded-lg border border-slate-800", role: "tablist" },
        React.createElement("button", {
          onClick: () => setActiveTab('image'),
          className: `${tabStyles} ${activeTab === 'image' ? activeTabStyles : inactiveTabStyles}`,
          role: "tab",
          "aria-selected": activeTab === 'image',
          "aria-controls": "image-panel",
          id: "image-tab"
        }, "Image Generator"),
        React.createElement("button", {
          onClick: () => setActiveTab('credits'),
          className: `${tabStyles} ${activeTab === 'credits' ? activeTabStyles : inactiveTabStyles}`,
          role: "tab",
          "aria-selected": activeTab === 'credits',
          "aria-controls": "credits-panel",
          id: "credits-tab"
        }, "Credits")
      )
    ),
    React.createElement("main", { className: "w-full max-w-2xl" },
      activeTab === 'image' && React.createElement("div", { id: "image-panel", role: "tabpanel", tabIndex: 0, "aria-labelledby": "image-tab" },
        React.createElement(ImageGenerator, null)
      ),
      activeTab === 'credits' && React.createElement("div", { id: "credits-panel", role: "tabpanel", tabIndex: 0, "aria-labelledby": "credits-tab" },
        React.createElement("div", { className: "bg-slate-900/50 rounded-xl p-8 border border-slate-800 shadow-2xl text-center" },
          React.createElement("h2", { className: "text-2xl font-bold text-white mb-4" }, "Credits"),
          React.createElement("p", { className: "text-slate-300 text-lg" },
            "This application was made by ",
            React.createElement("span", { className: "font-semibold text-brand-secondary" }, "Pramit"),
            "."
          )
        )
      )
    )
  );
};

export default HomePage;
