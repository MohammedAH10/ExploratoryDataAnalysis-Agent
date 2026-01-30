import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Upload Data",
    description: "Drop your CSV, Excel, or JSON files into the secure environment."
  },
  {
    number: "02",
    title: "Describe Goal",
    description: "Tell the agent what you want to understand about your data in natural language."
  },
  {
    number: "03",
    title: "Get Insights",
    description: "Receive comprehensive reports with visualizations, statistics, and actionable findings."
  }
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-[#0a1628] border-y border-blue-400/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">How It Works</h2>
          <p className="text-blue-100/60 text-xl font-medium">Upload data → Describe your goal → Get insights</p>
          <p className="text-blue-100/50 text-lg mt-2">From CSVs to clear, explainable reports — fully automated.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <span className="text-7xl font-extrabold text-blue-400/10 absolute -top-10 -left-4 select-none italic">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {step.title}
                </h3>
                <p className="text-blue-100/60 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[1px] bg-gradient-to-r from-blue-400/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;