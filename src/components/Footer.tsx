import React from 'react';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-[rgb(var(--color-champagne))]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-[1px] bg-[rgb(var(--color-dusty-beige))]" />
          <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-dusty-beige))] mx-3" />
          <div className="w-8 h-[1px] bg-[rgb(var(--color-dusty-beige))]" />
        </div>

        <p className="text-lg leading-relaxed text-[rgb(var(--color-text-secondary))] mb-6">
          We are so grateful to have you in our lives.
          <br />
          Your presence on our wedding day would mean the world to us.
        </p>
        
        <p className="text-sm tracking-[0.2em] uppercase text-[rgb(var(--color-text-secondary))]/60">
          With Love, Olivia & James
        </p>
      </div>
    </footer>
  );
}
