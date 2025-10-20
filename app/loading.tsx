export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative">
            {/* Spinning Border */}
            <div className="w-20 h-20 mx-auto rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-1 animate-spin">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  VC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Comunidade Vibe Coding
        </h1>

        {/* Loading Text */}
        <p className="text-slate-400 text-sm">
          Carregando...
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
