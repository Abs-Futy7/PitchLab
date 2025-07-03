import React from 'react';
import { Button } from './ui/button';
import { 
  BrainCircuit, 
  BotMessageSquare, 
  PieChart, 
  FolderTree, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const agentList = [
  {
    id: 'cto',
    name: 'CTO Bot',
    icon: BrainCircuit,
    color: 'text-blue-500',
    bgColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 'cmo',
    name: 'CMO Bot',
    icon: BotMessageSquare,
    color: 'text-purple-500',
    bgColor: 'from-purple-500 to-purple-600'
  },
  {
    id: 'cfo',
    name: 'CFO Bot',
    icon: PieChart,
    color: 'text-indigo-500',
    bgColor: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'architect',
    name: 'Architect Bot',
    icon: FolderTree,
    color: 'text-emerald-500',
    bgColor: 'from-emerald-500 to-emerald-600'
  }
];

function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="w-20 md:w-64 flex flex-col bg-gradient-to-b from-green-50 to-white border-r border-green-200 shadow-lg">
      <div className="h-20 flex items-center justify-center border-b border-green-200">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-gray-800">
              Pitch<span className="text-green-900 font-bold">Lab</span>
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex-grow p-4 space-y-3">
        <Button
          variant={activeView === "boardroom" ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-3 h-12 rounded-xl font-medium transition-all duration-200",
            activeView === "boardroom" 
              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg" 
              : "bg-gradient-to-r from-gray-100 to-green-50 text-gray-900 shadow-md border border-green-200"
          )}
          onClick={() => setActiveView("boardroom")}
        >
          <div className={cn(
            "p-1.5 rounded-lg",
            activeView === "boardroom" 
              ? "bg-white/20" 
              : "bg-green-100"
          )}>
            <Users className="h-5 w-5" />
          </div>
          <span className="hidden md:inline text-sm font-semibold">Boardroom</span>
        </Button>
        
        <div className="px-3 py-2">
          <div className="text-xs text-green-700 font-bold uppercase tracking-wider hidden md:block">
            AI Co-Founders
          </div>
        </div>
        
        {agentList.map((agent) => (
          <Button
            key={agent.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-12 rounded-xl font-medium transition-all duration-200",
              activeView === agent.id
                ? "bg-gradient-to-r from-gray-100 to-green-50 text-gray-900 shadow-md border border-green-800 font-bold"
                : "bg-gradient-to-r from-gray-100 to-green-50 text-gray-900 shadow-md border border-green-200"
            )}
            onClick={() => setActiveView(agent.id)}
          >
            <div className={cn(
              "p-1.5 rounded-lg bg-gradient-to-br shadow-sm",
              agent.bgColor
            )}>
              <agent.icon className="h-5 w-5 text-white" />
            </div>
            <span className="hidden md:inline text-sm font-semibold">{agent.name}</span>
          </Button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-green-600" />
          <div className="text-xs text-green-700 font-semibold text-center">
            AI-Powered Startup Ecosystem
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
