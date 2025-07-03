"use client";

import React from 'react';
import { Card } from './ui/card';
import { Lightbulb, Target, Users, TrendingUp, FolderTree } from 'lucide-react';
import { motion } from 'framer-motion';

interface BoardroomProps {
  startupIdea: string;
}

function Boardroom({ startupIdea }: BoardroomProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-green-50 via-emerald-25 to-white relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="max-w-4xl mx-auto space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-4 pt-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome to the Boardroom
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your AI co-founders are ready to help you build and scale your startup. 
            Select an AI agent from the sidebar to start strategizing.
          </motion.p>
        </motion.div>

        {/* Startup Idea Display */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 backdrop-blur-sm relative overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.1), transparent)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="p-8 relative z-10">
              <div className="flex items-start gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <Lightbulb className="h-8 w-8 text-white relative z-10" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                    Your Startup Idea
                  </h3>
                  <motion.p 
                    className="text-gray-700 text-lg leading-relaxed bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500 shadow-sm font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {startupIdea}
                  </motion.p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-0 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative">
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-lg"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent) border-box",
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor"
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl shadow-md relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                    <Target className="h-6 w-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">Define MVP</h4>
                    <p className="text-sm text-gray-600 font-medium">Chat with CTO Bot</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-0 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative">
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-lg"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(147, 51, 234, 0.3), transparent) border-box",
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor"
                }}
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl shadow-md relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                      }}
                    />
                    <Users className="h-6 w-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">Marketing Strategy</h4>
                    <p className="text-sm text-gray-600 font-medium">Chat with CMO Bot</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-0 bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative">
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-lg"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.3), transparent) border-box",
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor"
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 rounded-xl shadow-md relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                      }}
                    />
                    <TrendingUp className="h-6 w-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">Financial Planning</h4>
                    <p className="text-sm text-gray-600 font-medium">Chat with CFO Bot</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-0 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative">
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-lg"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.3), transparent) border-box",
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor"
                }}
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-xl shadow-md relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2
                      }}
                    />
                    <FolderTree className="h-6 w-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">Structure Model</h4>
                    <p className="text-sm text-gray-600 font-medium">Chat with Architect Bot</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        
      </motion.div>
    </div>
  );
}

export default Boardroom;
