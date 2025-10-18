import React, { useState } from 'react';
import ImageGenerator from './ImageGenerator';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'credits'>('image');

  const tabStyles = "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-brand-secondary";
  const activeTabStyles = "bg-slate-800 text-white";
  const inactiveTabStyles = "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200";

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-2">
          GenAi
        </h1>
        <p className="text-slate-400 text-lg">
          Generate stunning images with generative AI.
        </p>
      </header>

      {/* Tab Navigation */}
      <nav className="mb-8" aria-label="App sections">
        <div className="flex space-x-2 p-1 bg-slate-900 rounded-lg border border-slate-800" role="tablist">
          <button
            onClick={() => setActiveTab('image')}
            className={`${tabStyles} ${activeTab === 'image' ? activeTabStyles : inactiveTabStyles}`}
            role="tab"
            aria-selected={activeTab === 'image'}
            aria-controls="image-panel"
            id="image-tab"
          >
            Image Generator
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`${tabStyles} ${activeTab === 'credits' ? activeTabStyles : inactiveTabStyles}`}
            role="tab"
            aria-selected={activeTab === 'credits'}
            aria-controls="credits-panel"
            id="credits-tab"
          >
            Credits
          </button>
        </div>
      </nav>

      <main className="w-full max-w-2xl">
        {activeTab === 'image' && (
          <div id="image-panel" role="tabpanel" tabIndex={0} aria-labelledby="image-tab">
            <ImageGenerator />
          </div>
        )}
        {activeTab === 'credits' && (
          <div id="credits-panel" role="tabpanel" tabIndex={0} aria-labelledby="credits-tab">
            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Credits</h2>
              <p className="text-slate-300 text-lg">
                This application was made by <span className="font-semibold text-brand-secondary">Pramit</span>.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
