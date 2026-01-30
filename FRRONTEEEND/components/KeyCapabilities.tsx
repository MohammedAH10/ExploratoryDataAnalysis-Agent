import React from 'react';
import { motion } from 'framer-motion';
import { Database, Wrench, Cpu, Brain, LineChart, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const capabilities = [
  {
    title: "82+ Analytical Tools",
    description: "Specialized tools for profiling, cleaning, visualization, and statistical exploration.",
    icon: Wrench,
    color: "from-blue-400/20 to-blue-600/20",
    hover: "hover:bg-blue-500/10 hover:border-blue-400/30 hover:shadow-[0_0_30px_-10px_rgba(96,165,250,0.3)]"
  },
  {
    title: "Dual AI Intelligence",
    description: "Groq for execution. Gemini for reasoning. Production-ready. Cloud-deployable.",
    icon: Brain,
    color: "from-blue-300/20 to-blue-500/20",
    hover: "hover:bg-blue-400/10 hover:border-blue-300/30 hover:shadow-[0_0_30px_-10px_rgba(147,197,253,0.3)]"
  },
  {
    title: "Automated Profiling",
    description: "Instant detection of data types, distributions, missing values, and quality issues.",
    icon: Database,
    color: "from-blue-500/20 to-blue-700/20",
    hover: "hover:bg-blue-600/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
  },
  {
    title: "Smart Visualizations",
    description: "Auto-generated charts, plots, and correlation matrices tailored to your data.",
    icon: LineChart,
    color: "from-blue-400/20 to-blue-600/20",
    hover: "hover:bg-blue-500/10 hover:border-blue-400/30 hover:shadow-[0_0_30px_-10px_rgba(96,165,250,0.3)]"
  },
  {
    title: "Statistical Analysis",
    description: "Automated hypothesis testing, correlation analysis, and distribution fitting.",
    icon: Sparkles,
    color: "from-blue-300/20 to-blue-500/20",
    hover: "hover:bg-blue-400/10 hover:border-blue-300/30 hover:shadow-[0_0_30px_-10px_rgba(147,197,253,0.3)]"
  },
  {
    title: "Session Memory",
    description: "Maintains context across workflows for iterative exploration and refinement.",
    icon: Cpu,
    color: "from-blue-500/20 to-blue-700/20",
    hover: "hover:bg-blue-600/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
  }
];

const KeyCapabilities = () => {
  return (
    <section id="features" className="py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Built for Speed. Designed for Insight.
          </h2>
          <p className="text-blue-100/60 text-xl font-medium max-w-3xl mx-auto">
            Powered by a modern AI stack and orchestrated intelligence, the agent autonomously explores your data using 82+ specialized analytical tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={cn(
                "group p-8 rounded-2xl bg-blue-500/[0.03] border border-blue-400/[0.12] transition-all duration-300 cursor-default",
                cap.hover
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                cap.color
              )}>
                <cap.icon className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{cap.title}</h3>
              <p className="text-blue-100/60 leading-relaxed font-medium">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCapabilities;