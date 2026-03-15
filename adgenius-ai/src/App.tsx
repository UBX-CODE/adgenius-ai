import React, { useState, useEffect, useRef } from 'react';
import {
  PlusCircle,
  Zap,
  ChevronRight,
  Loader2,
  CheckCircle2,
  BarChart3,
  MousePointer2,
  Eye,
  DollarSign,
  Shield,
  Clock,
  Target,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  Smartphone,
  Sparkles,
  Rocket,
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { cn } from './lib/utils';
import { Campaign, CAMPAIGN_GOALS, DUMMY_PRODUCTS } from './types';

// Initialize Gemini (Using provided key as requested, but defaulting to env if available)
const API_KEY = "AIzaSyDSo6OFtbEHjrQDvU2aR_4Mslue0C44qIk";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

// --- UI Components ---

const Pill = ({ children, accent = false, icon: Icon }: any) => (
  <div className={cn("pill", accent && "pill-accent")}>
    {Icon && <Icon className="w-5 h-5" />}
    <span>{children}</span>
  </div>
);

const Navbar = ({ onAction }: { onAction: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-brand-bg/90 backdrop-blur-md border-b border-brand-paper/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center">
            <Zap className="text-brand-bg w-5 h-5 fill-current" />
          </div>
          <span className="text-2xl font-display uppercase tracking-tighter text-brand-paper">MarketFlow AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-paper/60">
          <a href="#" className="hover:text-brand-accent transition-colors">Home</a>
          <a href="#features" className="hover:text-brand-accent transition-colors">Features</a>
          <a href="#analytics" className="hover:text-brand-accent transition-colors">Analytics</a>
          <a href="#" className="hover:text-brand-accent transition-colors">About</a>
        </div>

        <button
          onClick={onAction}
          className="bg-brand-paper/5 hover:bg-brand-paper/10 text-brand-paper border border-brand-paper/20 px-6 py-2 rounded-full text-sm font-bold transition-all"
        >
          Create Campaign
        </button>
      </div>
    </nav>
  );
};

const InsightCard = ({ title, desc, improvement }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-brand-paper text-brand-bg p-4 rounded-2xl shadow-2xl w-64 absolute -right-12 top-1/4 z-20"
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 bg-brand-bg rounded-full flex items-center justify-center">
        <Sparkles className="w-3 h-3 text-brand-accent" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">AI Suggestion</span>
    </div>
    <p className="text-sm font-bold leading-tight mb-1">{title}</p>
    <p className="text-[11px] opacity-70 mb-3">{desc}</p>
    <div className="bg-brand-bg/5 rounded-lg p-2 flex justify-between items-center">
      <span className="text-[10px] font-bold">Predicted Growth</span>
      <span className="text-xs font-bold text-emerald-600">+{improvement}%</span>
    </div>
  </motion.div>
);

// --- Sections ---

const Hero = ({ onStart }: { onStart: () => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display text-[12vw] md:text-[10vw] mb-8"
        >
          Your <span className="text-brand-accent">Flow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-brand-paper/60 max-w-xl mb-12 leading-relaxed"
        >
          AI-powered platform that generates marketing campaigns, analyzes performance, and automatically suggests optimization strategies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Pill icon={Shield}>Security</Pill>
          <Pill icon={Clock}>24/7</Pill>
          <Pill accent>AI Insights</Pill>
          <Pill>Performance</Pill>
        </motion.div>
      </div>

      <div className="relative mt-12 flex justify-center">
        <div className="relative">
          {/* Phone Mockup */}
          <div className="w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20" />
            <div className="p-6 pt-12 text-brand-paper h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-brand-bg w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-50 uppercase font-bold">Revenue</p>
                  <p className="text-lg font-bold">$12,842</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center text-center">
                <h3 className="text-2xl font-bold mb-4">Optimize Your Campaign Growth</h3>
                <p className="text-xs opacity-60 mb-8">Understand where your money works best and fine-tune your strategy for higher returns.</p>
                <button className="bg-brand-accent text-brand-bg font-bold py-3 rounded-xl text-sm">Next Step</button>
              </div>
            </div>
          </div>
          <InsightCard
            title="Increase Budget by 20%"
            desc="Ad Set A is performing 40% better than average."
            improvement="15"
          />
        </div>
      </div>
    </div>

    {/* Decorative background element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,209,66,0.05)_0%,transparent_70%)] -z-0 pointer-events-none" />
  </section>
);

const Features = () => (
  <section id="features" className="py-24 bg-brand-paper text-brand-bg rounded-[4rem] mx-4">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-display text-6xl mb-6">We ensure precise<br />marketing insight and growth</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          {
            title: "AI Campaign Generator",
            desc: "Automatically creates ad headlines, descriptions, and keywords based on product details.",
            icon: Zap
          },
          {
            title: "Audience Targeting",
            desc: "Identifies the most relevant demographics and interests to improve ad performance.",
            icon: Target
          },
          {
            title: "Performance Analyzer",
            desc: "Analyzes metrics like clicks and conversions to evaluate campaign success.",
            icon: BarChart3
          },
          {
            title: "Optimization Engine",
            desc: "Recommends adjustments such as increasing budget for high-performing ads.",
            icon: TrendingUp
          },
        ].map((f, i) => (
          <div key={i} className="space-y-4">
            <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center">
              <f.icon className="text-brand-accent w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="text-sm opacity-70 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DashboardSection = ({ campaigns }: { campaigns: Campaign[] }) => {
  const [history, setHistory] = useState<{ time: string, val: number }[]>([]);

  useEffect(() => {
    if (campaigns.length > 0) {
      const totalImpressions = campaigns.reduce((acc, c) => acc + c.metrics.impressions, 0);
      setHistory(prev => [...prev.slice(-19), { time: new Date().toLocaleTimeString(), val: totalImpressions }]);
    }
  }, [campaigns]);

  const totalSpend = campaigns.reduce((acc, c) => acc + c.metrics.spend, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.metrics.clicks, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.metrics.impressions, 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <section id="analytics" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-display text-5xl mb-4">Real-Time Insights</h2>
          <p className="text-brand-paper/60">Monitor your global campaign performance as it happens.</p>
        </div>
        <div className="flex items-center gap-2 text-brand-accent text-sm font-bold bg-brand-accent/10 px-4 py-2 rounded-full border border-brand-accent/20">
          <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
          Live Tracking
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-brand-paper/5 border border-brand-paper/10 p-6 rounded-3xl">
          <p className="text-brand-paper/40 text-xs font-bold uppercase mb-2">Total Spend</p>
          <p className="text-3xl font-bold">${totalSpend.toFixed(2)}</p>
        </div>
        <div className="bg-brand-paper/5 border border-brand-paper/10 p-6 rounded-3xl">
          <p className="text-brand-paper/40 text-xs font-bold uppercase mb-2">Impressions</p>
          <p className="text-3xl font-bold">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-brand-paper/5 border border-brand-paper/10 p-6 rounded-3xl">
          <p className="text-brand-paper/40 text-xs font-bold uppercase mb-2">Clicks</p>
          <p className="text-3xl font-bold">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="bg-brand-paper/5 border border-brand-paper/10 p-6 rounded-3xl">
          <p className="text-brand-paper/40 text-xs font-bold uppercase mb-2">Avg. CTR</p>
          <p className="text-3xl font-bold">{avgCtr.toFixed(2)}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-brand-paper/5 border border-brand-paper/10 p-8 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8">Campaign Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5d142" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f5d142" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a241a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#f5d142' }}
                />
                <Area type="monotone" dataKey="val" stroke="#f5d142" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-paper/5 border border-brand-paper/10 p-8 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-6">AI Optimizations</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {campaigns.flatMap(c => c.optimizations).length === 0 ? (
              <p className="text-brand-paper/30 text-sm italic">Waiting for AI triggers...</p>
            ) : (
              campaigns.flatMap(c => c.optimizations).reverse().map((opt, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-brand-paper/5 rounded-2xl border border-brand-paper/5">
                  <Zap className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                  <p className="text-xs text-brand-paper/80 leading-relaxed">{opt}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CreateModal = ({ isOpen, onClose, onComplete }: any) => {
  const [step, setStep] = useState(1); // 1: Input, 2: Options, 3: Strategy & Image, 4: Final
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', goal: CAMPAIGN_GOALS[0], ageRange: '25-45', location: 'USA', interests: 'Tech',
    dailyBudget: 50, duration: 7, productName: '', productDescription: '', keyBenefits: ''
  });
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateOptions = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 3 distinct ad campaign options for:
        Product: ${formData.productName}
        Description: ${formData.productDescription}
        Benefits: ${formData.keyBenefits}
        Goal: ${formData.goal}
        
        For each option, include:
        1. Ad Copy (Headlines, Descriptions, CTA)
        2. Audience Segments
        3. Visual/Image Suggestion (detailed description for image generation)
        4. Trending Hashtags and Relatable Tags
        5. Market Demand Analysis (Current trends, customer pain points, success probability, and summary)`;

      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
                descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                cta: { type: Type.STRING },
                audience_segments: { type: Type.ARRAY, items: { type: Type.STRING } },
                image_suggestion: { type: Type.STRING },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                relatable_tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                demand_analysis: {
                  type: Type.OBJECT,
                  properties: {
                    market_trend: { type: Type.STRING },
                    customer_pain_points: { type: Type.ARRAY, items: { type: Type.STRING } },
                    success_probability: { type: Type.NUMBER },
                    summary: { type: Type.STRING }
                  },
                  required: ["market_trend", "customer_pain_points", "success_probability", "summary"]
                }
              },
              required: ["headlines", "descriptions", "cta", "audience_segments", "image_suggestion", "hashtags", "relatable_tags", "demand_analysis"],
            }
          }
        }
      });

      const data = JSON.parse(result.text || "[]");
      setOptions(data);
      setStep(2);
    } catch (e) {
      console.error("AI Generation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async (option: any) => {
    setLoading(true);
    setSelectedOption(option);
    try {
      const prompt = `High-quality commercial ad creative for ${formData.productName}. 
        Concept: ${option.image_suggestion}. 
        Style: Modern, professional, clean, high-resolution photography.`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      const part = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
      }
      setStep(3);
    } catch (e) {
      console.error("Image generation failed:", e);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = async () => {
    setLoading(true);
    try {
      // Mock platform calls
      const metaRes = await fetch('/api/meta/createCampaign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign: { name: formData.name }, ad: selectedOption })
      });
      const metaData = await metaRes.json();

      const googleRes = await fetch('/api/google/createCampaign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign: { name: formData.name }, ad: selectedOption })
      });
      const googleData = await googleRes.json();

      const finalRes = await fetch('/api/campaigns', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          adContent: {
            ...selectedOption,
            image_url: generatedImage
          },
          platforms: {
            metaId: metaData.campaign_id,
            metaStatus: metaData.status,
            googleId: googleData.campaign_id,
            googleStatus: googleData.status
          },
          optimizations: []
        })
      });
      onComplete(await finalRes.json());
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-brand-paper text-brand-bg w-full max-w-4xl rounded-[3rem] p-10 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-brand-bg/5 rounded-full"><X /></button>

        {step === 1 && (
          <div className="space-y-8">
            <h2 className="text-display text-5xl">Launch Campaign</h2>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Campaign Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-brand-bg/5 border-none rounded-2xl px-6 py-4" />
              <select value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })} className="bg-brand-bg/5 border-none rounded-2xl px-6 py-4">
                {CAMPAIGN_GOALS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <textarea placeholder="Product Description" rows={3} value={formData.productDescription} onChange={e => setFormData({ ...formData, productDescription: e.target.value })} className="w-full bg-brand-bg/5 border-none rounded-2xl px-6 py-4" />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {DUMMY_PRODUCTS.map((p, i) => (
                <button key={i} onClick={() => setFormData({ ...formData, productName: p.name, productDescription: p.description, keyBenefits: p.benefits, name: p.name })} className="whitespace-nowrap bg-brand-bg/5 px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-bg/10">Use {p.name}</button>
              ))}
            </div>
            <button onClick={handleGenerateOptions} disabled={loading} className="w-full bg-brand-bg text-brand-paper font-bold py-5 rounded-3xl flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <Zap className="fill-brand-accent text-brand-accent" />}
              Generate Ad Ideas
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-display text-5xl">Select Best Idea</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {options.map((opt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-brand-bg/5 p-6 rounded-3xl border border-brand-bg/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-brand-bg text-brand-accent w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-4">Option {i + 1}</div>
                    <h3 className="text-lg font-bold mb-2">{opt.headlines[0]}</h3>
                    <p className="text-xs opacity-60 mb-4 line-clamp-3">{opt.descriptions[0]}</p>
                    <div className="space-y-2 mb-6">
                      <p className="text-[10px] font-bold uppercase opacity-40">Visual Concept</p>
                      <p className="text-[10px] italic leading-tight">{opt.image_suggestion}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleGenerateImage(opt)}
                    disabled={loading}
                    className="w-full bg-brand-bg text-brand-paper py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {loading && selectedOption === opt ? <Loader2 className="animate-spin w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    Select & Generate Image
                  </button>
                </motion.div>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-xs font-bold opacity-40 hover:opacity-100 transition-opacity">Back to Edit</button>
          </div>
        )}

        {step === 3 && selectedOption && (
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <h2 className="text-display text-5xl">Final Strategy</h2>
              <div className="bg-brand-bg text-brand-accent px-4 py-2 rounded-xl text-xs font-bold">
                {selectedOption.demand_analysis.success_probability}% Success Probability
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-brand-bg/5 p-6 rounded-3xl space-y-4">
                  <p className="text-xs font-bold uppercase opacity-40">Generated Ad Creative</p>
                  <div className="aspect-square bg-brand-bg/10 rounded-2xl overflow-hidden flex items-center justify-center relative">
                    {generatedImage ? (
                      <img src={generatedImage} alt="AI Generated Ad" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-xs opacity-40">Image generation failed or skipped</p>
                      </div>
                    )}
                    <button
                      onClick={() => handleGenerateImage(selectedOption)}
                      className="absolute bottom-4 right-4 bg-brand-bg/80 backdrop-blur p-2 rounded-full text-brand-accent hover:bg-brand-bg transition-colors"
                    >
                      <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                    </button>
                  </div>
                </div>

                <div className="bg-brand-bg/5 p-6 rounded-3xl space-y-4">
                  <p className="text-xs font-bold uppercase opacity-40">Ad Copy Preview</p>
                  <p className="text-xl font-bold">{selectedOption.headlines[0]}</p>
                  <p className="text-sm opacity-70">{selectedOption.descriptions[0]}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-brand-bg/5 p-6 rounded-3xl space-y-4 border border-brand-accent/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-bg" />
                    <p className="text-xs font-bold uppercase opacity-40">Demand Analysis</p>
                  </div>
                  <p className="text-sm font-bold">{selectedOption.demand_analysis.market_trend}</p>
                  <p className="text-xs opacity-70 leading-relaxed">{selectedOption.demand_analysis.summary}</p>
                  <div className="pt-4 border-t border-brand-bg/10">
                    <p className="text-[10px] font-bold uppercase opacity-40 mb-2">Customer Pain Points</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOption.demand_analysis.customer_pain_points.map((p: string, i: number) => (
                        <span key={i} className="text-[10px] bg-brand-bg text-brand-paper px-2 py-1 rounded-lg">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-brand-bg/5 p-6 rounded-3xl space-y-4">
                  <p className="text-xs font-bold uppercase opacity-40">Trending Hashtags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOption.hashtags.map((h: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold text-brand-bg bg-brand-bg/10 px-2 py-1 rounded-lg">{h}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-bg/5 p-6 rounded-3xl space-y-4">
                  <p className="text-xs font-bold uppercase opacity-40">Relatable Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOption.relatable_tags.map((t: string, i: number) => (
                      <span key={i} className="text-[10px] font-medium border border-brand-bg/20 px-2 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 border border-brand-bg/20 py-5 rounded-3xl font-bold">Back to Options</button>
              <button onClick={handleLaunch} disabled={loading} className="flex-[2] bg-brand-bg text-brand-paper py-5 rounded-3xl font-bold flex items-center justify-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <Rocket className="w-5 h-5" />}
                Launch Campaign
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-brand-paper/10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center">
            <Zap className="text-brand-bg w-5 h-5 fill-current" />
          </div>
          <span className="text-2xl font-display uppercase tracking-tighter">MarketFlow AI</span>
        </div>
        <p className="text-brand-paper/40 max-w-sm leading-relaxed">
          The next generation of marketing automation. Powered by advanced AI to help you scale your business faster than ever.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Product</h4>
        <ul className="space-y-4 text-sm text-brand-paper/40">
          <li><a href="#" className="hover:text-brand-accent">Features</a></li>
          <li><a href="#" className="hover:text-brand-accent">Analytics</a></li>
          <li><a href="#" className="hover:text-brand-accent">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-sm text-brand-paper/40">
          <li><a href="#" className="hover:text-brand-accent">About Us</a></li>
          <li><a href="#" className="hover:text-brand-accent">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-brand-accent">Contact</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('/api/campaigns');
        setCampaigns(await res.json());
      } catch (e) { console.error(e); }
    };
    fetchCampaigns();

    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(c => {
        const newImpressions = c.metrics.impressions + Math.floor(Math.random() * 500);
        const newClicks = c.metrics.clicks + Math.floor(Math.random() * 20);
        const newCtr = newImpressions > 0 ? (newClicks / newImpressions) * 100 : 0;
        const newSpend = c.metrics.spend + (Math.random() * 5);
        const optimizations = [...c.optimizations];
        let currentBudget = c.budget;
        if (newCtr < 1.5 && Math.random() > 0.95) {
          optimizations.push(`AI Optimization: Budget increased by 10% (Low CTR: ${newCtr.toFixed(2)}%)`);
          currentBudget *= 1.1;
        }
        return { ...c, budget: currentBudget, metrics: { impressions: newImpressions, clicks: newClicks, ctr: newCtr, spend: newSpend }, optimizations };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-bg">
      <Navbar onAction={() => setIsModalOpen(true)} />

      <Hero onStart={() => setIsModalOpen(true)} />

      <Features />

      <DashboardSection campaigns={campaigns} />

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-brand-accent text-brand-bg rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-display text-6xl md:text-8xl mb-12 relative z-10"
          >
            Start your AI<br />Campaign today
          </motion.h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-bg text-brand-paper text-xl font-bold px-12 py-6 rounded-full hover:scale-105 transition-transform relative z-10"
          >
            Generate Campaign
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-bg/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      <Footer />

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={(c: Campaign) => setCampaigns(prev => [...prev, c])}
      />
    </div>
  );
}
