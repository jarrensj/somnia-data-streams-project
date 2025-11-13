'use client'

import { useState } from 'react'
import { useBlockchain, type Transaction } from '@/lib/blockchain-hooks'
import { useNotifications } from '@/lib/use-notifications'
import { motion, AnimatePresence } from 'framer-motion'

function TransactionCard({ tx, explorerUrl, networkType, rank }: { tx: Transaction; explorerUrl: string; networkType: 'testnet' | 'mainnet'; rank: number }) {
  // Alternate between white and black keys based on rank
  const isWhiteKey = rank % 2 === 1
  
  const typeIcons = {
    transfer: '♪',
    contract: '♫',
    other: '♬'
  }

  const typeLabels = {
    transfer: 'Transfer',
    contract: 'Contract Deploy',
    other: 'Contract Call'
  }

  const musicalNotes = ['♩', '♪', '♫', '♬', '♭', '♯']
  const randomNote = musicalNotes[rank % musicalNotes.length]

  const shortenAddress = (addr: string | null) => {
    if (!addr) return 'Contract Creation'
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: 3, transition: { duration: 0.1 } }}
      className="group relative"
    >
      {isWhiteKey ? (
        // White Piano Key
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg shadow-[0_6px_0_rgba(0,0,0,0.15)] hover:shadow-[0_3px_0_rgba(0,0,0,0.15)] transition-all duration-150 overflow-hidden group-hover:translate-y-0.5">
          {/* Piano key shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative p-3">
            {/* Note Number */}
            <div className="absolute top-2 left-2 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg">
              {rank}
            </div>

            {/* Musical Note */}
            <div className="absolute top-1.5 right-2 text-2xl text-gray-300 group-hover:text-yellow-500 transition-colors">
              {randomNote}
            </div>

            <div className="mt-8 space-y-2">
              {/* Type with Icon */}
              <div className="flex items-center gap-1.5">
                <span className="text-xl">{typeIcons[tx.type]}</span>
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide">{typeLabels[tx.type]}</h3>
              </div>

              {/* Transaction Details */}
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-600 w-10">Hash</span>
                  <code className="font-mono font-semibold text-gray-900 bg-gray-200/60 px-1.5 py-0.5 rounded text-[9px]">{shortenAddress(tx.hash)}</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-600 w-10">From</span>
                  <code className="font-mono font-semibold text-green-700 bg-green-100/60 px-1.5 py-0.5 rounded text-[9px]">{shortenAddress(tx.from)}</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-600 w-10">To</span>
                  <code className="font-mono font-semibold text-blue-700 bg-blue-100/60 px-1.5 py-0.5 rounded text-[9px]">{shortenAddress(tx.to)}</code>
                </div>
                {parseFloat(tx.value) > 0 && (
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="font-bold text-gray-600 w-10">Value</span>
                    <span className="text-xs font-black text-amber-700 bg-gradient-to-r from-amber-200 to-yellow-200 px-2 py-0.5 rounded shadow-sm">
                      {parseFloat(tx.value).toFixed(4)} STT
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-200">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                  {new Date(tx.timestamp).toLocaleTimeString()}
                </span>
                <a
                  href={`${explorerUrl}/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-black text-gray-700 hover:text-black uppercase tracking-wider flex items-center gap-0.5 group/link"
                >
                  View
                  <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Black Piano Key
        <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-gray-800 rounded-lg shadow-[0_6px_0_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.1)] hover:shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-150 overflow-hidden group-hover:translate-y-0.5">
          {/* Black key highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative p-3">
            {/* Note Number */}
            <div className="absolute top-2 left-2 w-7 h-7 bg-white text-black rounded-full flex items-center justify-center font-black text-sm shadow-lg">
              {rank}
            </div>

            {/* Musical Note */}
            <div className="absolute top-1.5 right-2 text-2xl text-gray-700 group-hover:text-yellow-400 transition-colors">
              {randomNote}
            </div>

            <div className="mt-8 space-y-2">
              {/* Type with Icon */}
              <div className="flex items-center gap-1.5">
                <span className="text-xl filter drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">{typeIcons[tx.type]}</span>
                <h3 className="text-xs font-black text-white uppercase tracking-wide drop-shadow-lg">{typeLabels[tx.type]}</h3>
              </div>

              {/* Transaction Details */}
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-400 w-10">Hash</span>
                  <code className="font-mono font-semibold text-gray-200 bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-[9px]">{shortenAddress(tx.hash)}</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-400 w-10">From</span>
                  <code className="font-mono font-semibold text-green-300 bg-green-500/20 px-1.5 py-0.5 rounded border border-green-500/30 text-[9px]">{shortenAddress(tx.from)}</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-400 w-10">To</span>
                  <code className="font-mono font-semibold text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/30 text-[9px]">{shortenAddress(tx.to)}</code>
                </div>
                {parseFloat(tx.value) > 0 && (
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="font-bold text-gray-400 w-10">Value</span>
                    <span className="text-xs font-black text-yellow-300 bg-gradient-to-r from-yellow-600/30 to-amber-600/30 px-2 py-0.5 rounded shadow-lg border border-yellow-500/30">
                      {parseFloat(tx.value).toFixed(4)} STT
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-800">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                  {new Date(tx.timestamp).toLocaleTimeString()}
                </span>
                <a
                  href={`${explorerUrl}/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-black text-gray-300 hover:text-white uppercase tracking-wider flex items-center gap-0.5 group/link"
                >
                  View
                  <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function Home() {
  const [isListening, setIsListening] = useState(false)
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet')
  const [isMuted, setIsMuted] = useState(false)
  const { transactions, stats, isConnected, error, network: networkInfo } = useBlockchain(network, isListening)
  const { toggleMute } = useNotifications()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated Background with Piano Keys Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Wood grain texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/20"></div>
        
        {/* Floating musical notes */}
        <div className="absolute top-20 left-[10%] text-6xl text-white/5 note-float">♪</div>
        <div className="absolute top-40 right-[15%] text-5xl text-white/5 note-float" style={{ animationDelay: '1s' }}>♫</div>
        <div className="absolute bottom-32 left-[20%] text-7xl text-white/5 note-float" style={{ animationDelay: '2s' }}>♬</div>
        <div className="absolute top-60 right-[25%] text-5xl text-white/5 note-float" style={{ animationDelay: '1.5s' }}>♩</div>
        
        {/* Subtle piano key pattern at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 lg:p-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block">
              {/* Piano keys decorative element */}
              <div className="flex justify-center gap-1 mb-6">
                <div className="w-12 h-20 bg-white rounded-b-lg shadow-lg"></div>
                <div className="w-8 h-12 bg-black rounded-b-lg -ml-4 mr-2 z-10 shadow-lg"></div>
                <div className="w-12 h-20 bg-white rounded-b-lg shadow-lg"></div>
                <div className="w-8 h-12 bg-black rounded-b-lg -ml-4 mr-2 z-10 shadow-lg"></div>
                <div className="w-12 h-20 bg-white rounded-b-lg shadow-lg"></div>
                <div className="w-12 h-20 bg-white rounded-b-lg shadow-lg"></div>
                <div className="w-8 h-12 bg-black rounded-b-lg -ml-4 mr-2 z-10 shadow-lg"></div>
                <div className="w-12 h-20 bg-white rounded-b-lg shadow-lg"></div>
              </div>
              
              <div className="text-xs font-bold text-amber-400 tracking-[0.5em] uppercase mb-2 flex items-center justify-center gap-2">
                <span>♪</span> Live Transaction Symphony <span>♪</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-2xl">
                SOMNIA
              </h1>
              <div className="text-base font-bold text-gray-400 tracking-[0.3em] uppercase">Piano Dashboard</div>
            </div>
          </motion.div>
        </div>

        {/* Live Transactions Feed */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-white/20">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-wide">
                <span className="text-4xl">🎹</span>
                Transaction Keys
              </h2>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-black text-white drop-shadow-lg">
                  {stats.totalTransactions.toLocaleString()}
                </div>
                <span className="text-sm text-gray-300 font-bold uppercase tracking-wider">Notes</span>
              </div>
            </div>

            {/* Network Selector - Piano Key Style */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-white/20 rounded-2xl p-2 shadow-2xl inline-flex gap-2">
                <button
                  onClick={() => {
                    if (isListening) setIsListening(false)
                    setNetwork('testnet')
                  }}
                  className={`px-10 py-4 rounded-xl font-black transition-all text-base uppercase tracking-wider shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 ${
                    network === 'testnet'
                      ? 'bg-gradient-to-b from-blue-400 to-blue-600 text-white'
                      : 'bg-gradient-to-b from-white to-gray-200 text-gray-900 hover:from-gray-100 hover:to-gray-300'
                  }`}
                >
                  🧪 Testnet
                </button>
                <button
                  onClick={() => {
                    if (isListening) setIsListening(false)
                    setNetwork('mainnet')
                  }}
                  className={`px-10 py-4 rounded-xl font-black transition-all text-base uppercase tracking-wider shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 ${
                    network === 'mainnet'
                      ? 'bg-gradient-to-b from-purple-400 to-purple-600 text-white'
                      : 'bg-gradient-to-b from-white to-gray-200 text-gray-900 hover:from-gray-100 hover:to-gray-300'
                  }`}
                >
                  🚀 Mainnet
                </button>
              </div>
            </div>
            
            {/* Piano-style Control Buttons */}
            <div className="flex justify-center gap-6 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ y: 4 }}
                onClick={() => setIsListening(!isListening)}
                disabled={!isConnected}
                className={`relative px-14 py-5 rounded-2xl font-black transition-all text-lg uppercase tracking-wider border-4 shadow-[0_8px_0_rgba(0,0,0,0.3)] active:shadow-[0_4px_0_rgba(0,0,0,0.3)] ${
                  isListening
                    ? 'bg-gradient-to-b from-red-400 to-red-600 border-red-700 text-white'
                    : 'bg-gradient-to-b from-white to-gray-100 border-gray-300 text-gray-900 disabled:from-gray-400 disabled:to-gray-500 disabled:border-gray-600 disabled:text-gray-700 disabled:cursor-not-allowed'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isListening ? '⏹' : '▶'} 
                  {isListening ? 'Stop' : 'Play'}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ y: 4 }}
                onClick={() => {
                  const newMutedState = toggleMute()
                  setIsMuted(newMutedState)
                }}
                className={`relative px-12 py-5 rounded-2xl font-black transition-all text-lg uppercase tracking-wider border-4 shadow-[0_8px_0_rgba(0,0,0,0.3)] active:shadow-[0_4px_0_rgba(0,0,0,0.3)] ${
                  isMuted
                    ? 'bg-gradient-to-b from-gray-400 to-gray-600 border-gray-700 text-white'
                    : 'bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isMuted ? '🔇' : '🔊'}
                  {isMuted ? 'Muted' : 'Sound'}
                </span>
              </motion.button>
            </div>
            
            {/* Status Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/20 shadow-lg">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/70' : error ? 'bg-red-400 shadow-lg shadow-red-400/70' : 'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/70'}`}></div>
                <span className="text-sm font-black text-white uppercase tracking-wider">{isConnected ? '♪ Live' : error ? '✕ Offline' : '⟳ Connecting'}</span>
              </div>
              
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/20 shadow-lg">
                <p className="text-sm text-white font-black uppercase tracking-wider flex items-center gap-2">
                  <span>♬</span>
                  {networkInfo.name} • {networkInfo.symbol}
                </p>
              </div>
            </div>
        </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-red-500/50 rounded-2xl p-6 mb-6 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">🎵</span>
                <div>
                  <p className="text-lg font-black text-white mb-1 uppercase">Discord in the Symphony</p>
                  <p className="text-sm font-semibold text-red-200">{error}</p>
                </div>
          </div>
            </motion.div>
          )}

          <div className="max-h-[calc(100vh-320px)] overflow-y-auto space-y-2.5 pr-2">
            <AnimatePresence mode="popLayout">
              {transactions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-24 px-4"
                >
                  <div className="text-8xl mb-8 opacity-40">{isListening ? '🎹' : '🎼'}</div>
                  <p className="text-3xl font-black text-white mb-3 uppercase tracking-wide">
                    {isListening ? 'Waiting for notes...' : 'Ready to Compose'}
                  </p>
                  <p className="text-base text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>♪</span>
                    {isListening ? 'Listening to blockchain symphony' : 'Press play to start the performance'}
                    <span>♪</span>
                  </p>
                </motion.div>
              ) : (
                transactions.map((tx, index) => (
                  <TransactionCard key={tx.hash} tx={tx} explorerUrl={networkInfo.explorerUrl} networkType={network} rank={index + 1} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
