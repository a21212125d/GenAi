import React, { useState } from 'react';
import { generateImageFromPrompt } from '../services/geminiService.js';
import { SparklesIcon, LoadingSpinnerIcon } from './icons.js';
import AdBanner from './AdBanner.js';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const base64Image = await generateImageFromPrompt(prompt);
      setImageUrl(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement("div", { className: "bg-slate-900/50 rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col" },
    React.createElement("h2", { className: "text-2xl font-bold text-white mb-4" }, "Image Generation"),
    React.createElement("p", { className: "text-slate-400 mb-6" }, "Describe the image you want to create. Powered by Nano Banana."),
    React.createElement("div", { className: "space-y-4" },
      React.createElement("textarea", {
        value: prompt,
        onChange: (e) => setPrompt(e.target.value),
        placeholder: "e.g., A cute cat astronaut floating in space, cartoon style",
        className: "w-full h-24 p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-brand-primary focus:outline-none transition",
        disabled: isLoading
      }),
      React.createElement("button", {
        onClick: handleGenerate,
        disabled: isLoading,
        className: "w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-secondary rounded-lg shadow-md hover:bg-brand-secondary/90 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
      }, isLoading 
          ? React.createElement(React.Fragment, null, React.createElement(LoadingSpinnerIcon, null), "Generating...") 
          : React.createElement(React.Fragment, null, React.createElement(SparklesIcon, null), "Generate Image")
      )
    ),
    error && React.createElement("p", { className: "mt-4 text-red-400 text-center" }, error),
    React.createElement(AdBanner, null),
    React.createElement("div", { className: "w-full aspect-square bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700 flex-grow" },
      isLoading && React.createElement("div", { className: "flex flex-col items-center text-slate-400" }, 
        React.createElement(LoadingSpinnerIcon, { className: "w-10 h-10" }), 
        React.createElement("p", { className: "mt-2" }, "Conjuring your masterpiece...")
      ),
      imageUrl && !isLoading && React.createElement("img", {
        src: imageUrl,
        alt: "Generated",
        className: "w-full h-full object-cover"
      }),
      !imageUrl && !isLoading && React.createElement("div", { className: "text-slate-500 text-center p-4" }, "Your generated image will appear here.")
    )
  );
};

export default ImageGenerator;
