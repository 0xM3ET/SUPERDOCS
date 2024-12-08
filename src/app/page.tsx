"use client";

import React from "react";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { Coins, Rocket, Bot, Repeat, ArrowRight, Wallet } from "lucide-react";
import { GradientButton } from "@/components/GradientButton";
import { FeatureCard } from "@/components/FeatureCard";

export default function Home() {
  const router = useRouter(); 

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-7xl font-bold mb-6 text-white">ARIA</h1>
            <p className="text-2xl text-gray-300 mb-8 font-bold">
              Your AI-powered DeFi companion built on Arweave and AO. Create,
              swap, and manage tokens with natural language prompts.
            </p>
            <div className="flex justify-center gap-4">
              <GradientButton
                onClick={() => router.push("/main")} 
              >
                Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </GradientButton>
              <button className="px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-indigo-400">
            Powered by AI, Built for DeFi
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the future of decentralized finance with our AI-powered
            platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Wallet}
            title="Custom Token Creation"
            description="Create custom tokens with specific parameters through simple natural language prompts"
          />
          <FeatureCard
            icon={Repeat}
            title="Token Swapping"
            description="Seamlessly swap tokens across different platforms with AI-optimized routes"
          />
          <FeatureCard
            icon={Wallet}
            title="Cross-chain Bridge"
            description="Bridge your assets across different blockchains with intelligent routing"
          />
          <FeatureCard
            icon={Bot}
            title="AI Assistant"
            description="24/7 AI support for all your DeFi operations and queries"
          />
          <FeatureCard
            icon={Rocket}
            title="Smart Vesting"
            description="Set up and manage token vesting schedules with natural language commands"
          />
          <FeatureCard
            icon={Coins}
            title="Portfolio Management"
            description="AI-powered insights and management for your DeFi portfolio"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-2 py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-[#0e0e0e] p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-indigo-400">
            Ready to Transform Your DeFi Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of AI-powered decentralized finance. Start managing
            your assets smarter, not harder.
          </p>
          <GradientButton
            className="text-lg"
            onClick={() => router.push("/main")} 
          >
            Launch App <Rocket className="inline-block ml-2 w-5 h-5" />
          </GradientButton>
        </motion.div>
      </div>
    </div>
  );
}
