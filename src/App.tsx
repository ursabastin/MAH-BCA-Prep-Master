import { useState } from 'react'
import { LayoutDashboard, BookOpen, BarChart3, Settings, LogOut, Layout } from 'lucide-react'

function App() {
    const [activeTab, setActiveTab] = useState('dashboard')

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'practice', icon: BookOpen, label: 'Practice Engine' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col backdrop-blur-xl">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        BCACET MASTER
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
                        <LogOut size={20} />
                        <span className="font-medium">Exit App</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Background blobs for aesthetics */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full -z-10" />

                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#0a0a0c]/50 backdrop-blur-md z-10">
                    <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20 shadow-lg shadow-blue-500/20" />
                    </div>
                </header>

                <div className="p-8">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: 'Total Questions', value: '1,240', change: '+12%', icon: BookOpen },
                                    { label: 'Completion Rate', value: '64%', change: '+5%', icon: Layout },
                                    { label: 'Avg. Accuracy', value: '82%', change: '+2.4%', icon: BarChart3 },
                                ].map((stat, i) => (
                                    <div key={i} className="neo-glass p-6 group cursor-pointer hover:border-white/20 transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                                                <stat.icon size={20} className="text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center text-xs font-medium text-emerald-400">
                                            <span>{stat.change}</span>
                                            <span className="text-slate-500 ml-2">from last week</span>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="neo-glass p-8">
                                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                                    <div className="space-y-6">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="flex items-center space-x-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                                                    <BookOpen size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm">Computer Fundamentals Mock</h4>
                                                    <p className="text-xs text-slate-500 mt-1">20 questions • 15:40 • 85% Score</p>
                                                </div>
                                                <p className="text-xs text-slate-500">2h ago</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="neo-glass p-8 flex flex-col justify-center items-center text-center space-y-4">
                                    <div className="h-24 w-24 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center">
                                        <span className="text-2xl font-bold">12</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Daily Streak</h3>
                                        <p className="text-slate-400 text-sm mt-2">You're doing great! Keep it up to stay ahead of the curve.</p>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                                        Resume Practice
                                    </button>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab !== 'dashboard' && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 mb-6">
                                <Layout size={48} className="opacity-20" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
                            <p className="mt-2">This section is currently under development for the MVP.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
