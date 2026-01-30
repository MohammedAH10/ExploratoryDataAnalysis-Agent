import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, BarChart3, TrendingUp } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-24 relative bg-[#0a1628] overflow-hidden border-y border-blue-400/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Why Exploratory Data Analysis Agent?
          </h2>
          <p className="text-blue-100/60 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Exploratory data analysis is slow, repetitive, and error-prone. This agent automates profiling, cleaning, visualization, and statistical exploration — so you can focus on decisions, not notebooks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent border border-blue-400/10"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 blur-3xl" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Automated Profiling
            </h3>
            <p className="text-blue-100/70 text-lg mb-6 leading-relaxed font-medium">
              Instant data profiling and quality checks reveal missing values, distributions, and anomalies automatically.
            </p>
            <ul className="space-y-4">
              {[
                { icon: BarChart3, text: "Automated data profiling & quality checks", color: "text-blue-400" },
                { icon: Zap, text: "Instant visualizations & statistical summaries", color: "text-blue-400" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-blue-50/90 font-semibold">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent border border-blue-400/10"
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400/10 blur-3xl" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Intelligent Insights
            </h3>
            <p className="text-blue-100/70 text-lg mb-6 leading-relaxed font-medium">
              Discover patterns, correlations, and outliers with explainable insights generated automatically.
            </p>
            <ul className="space-y-4">
              {[
                { icon: TrendingUp, text: "Outlier detection & feature relationships", color: "text-blue-400" },
                { icon: Zap, text: "Explainable insights by default", color: "text-blue-400" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-blue-50/90 font-semibold">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;