"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ElementType; // Flexible type for any React component
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 border border-white/20">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-gray-400">{description}</p>
    </motion.div>
  );
};
