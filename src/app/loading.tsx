export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 mb-6">
          <svg className="w-8 h-8 text-gold animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-display text-h3 text-charcoal mb-2">Loading...</p>
        <p className="text-body text-muted">Preparing your experience</p>
      </div>
    </div>
  );
}