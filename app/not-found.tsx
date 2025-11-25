import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="text-9xl font-extralight text-white/90 tracking-tight">404</div>
        <div className="text-lg text-white/70">Page not found</div>
        <Link 
          href="/" 
          className="inline-block mt-8 px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}