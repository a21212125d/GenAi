import React, { useState, useEffect, useRef } from 'react';
import { generateVideoFromPrompt } from '../services/geminiService';
import { VideoIcon, LoadingSpinnerIcon, KeyIcon, InfoIcon } from './icons';

// FIX: Removed conflicting global type declaration for window.aistudio to resolve a TypeScript type conflict.

const loadingMessages = [
    "Warming up the digital film crew...",
    "Choreographing pixels into motion...",
    "Rendering your cinematic vision...",
    "This can take a few minutes, hang tight!",
    "Polishing the final frames...",
    "Almost ready for the premiere..."
];

const VideoGenerator: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);
    const [error, setError] = useState<string | null>(null);
    const loadingIntervalRef = useRef<number | null>(null);

    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio) {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                if(isMounted.current) setApiKeySelected(hasKey);
            }
        };
        const timer = setTimeout(checkApiKey, 100);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        if (isLoading) {
            loadingIntervalRef.current = window.setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 3000);
        } else {
            if(loadingIntervalRef.current) {
                clearInterval(loadingIntervalRef.current);
            }
        }
        return () => {
            if(loadingIntervalRef.current) {
                clearInterval(loadingIntervalRef.current);
            }
        };
    }, [isLoading]);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            if(isMounted.current) {
              setApiKeySelected(true);
              setError(null);
            }
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        setLoadingMessage(loadingMessages[0]);
        
        try {
            // FIX: The `generateVideoFromPrompt` function does not accept a callback.
            const url = await generateVideoFromPrompt(prompt);
            if(isMounted.current) setVideoUrl(url);
        } catch (err: any) {
            const errorMessage = err.message || 'An unknown error occurred.';
            console.error(err);
            if (errorMessage.includes("Requested entity was not found")) {
                if(isMounted.current) {
                    setError("API Key error. Please re-select your API key.");
                    setApiKeySelected(false);
                }
            } else {
                 if(isMounted.current) setError('Failed to generate video. Please try again.');
            }
        } finally {
            if(isMounted.current) setIsLoading(false);
        }
    };

    if (!apiKeySelected) {
        return (
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col items-center justify-center text-center">
                 <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 max-w-lg shadow-2xl">
                    {/* FIX: Corrected model attribution from Sora to Veo. */}
                    <h1 className="text-2xl font-bold text-white mb-3">Veo Video Access</h1>
                    <p className="text-slate-400 mb-6">To generate videos, please select a Google AI Studio API key. Project charges may apply.</p>
                    {error && <p className="mb-4 text-red-400">{error}</p>}
                    <div className="bg-slate-800/50 p-4 rounded-lg text-left text-sm text-slate-300 flex items-start gap-3 mb-6">
                        <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>For billing info, visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-primary underline hover:text-brand-secondary">ai.google.dev/gemini-api/docs/billing</a>.</span>
                    </div>
                    <button onClick={handleSelectKey} className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-brand-primary/90 transition">
                       <KeyIcon /> Select API Key
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Video Generation</h2>
            {/* FIX: Corrected model attribution from Sora to Veo. */}
            <p className="text-slate-400 mb-6">Describe the video you want to create. Powered by Veo.</p>
            
            <div className="space-y-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A neon hologram of a cat driving at top speed"
                    className="w-full h-24 p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-brand-primary/90 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                        <LoadingSpinnerIcon />
                        Generating...
                        </>
                    ) : (
                        <>
                        <VideoIcon />
                        Generate Video
                        </>
                    )}
                </button>
            </div>

            {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

            <div className="mt-6 w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700 flex-grow">
                {isLoading && (
                <div className="flex flex-col items-center text-slate-400 text-center p-4">
                    <LoadingSpinnerIcon className="w-10 h-10" />
                    <p className="mt-4 font-semibold">{loadingMessage}</p>

                </div>
                )}
                {videoUrl && !isLoading && (
                    <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain bg-black" />
                )}
                {!videoUrl && !isLoading && (
                    <div className="text-slate-500 text-center p-4">Your generated video will appear here.</div>
                )}
            </div>
        </div>
    );
};

export default VideoGenerator;