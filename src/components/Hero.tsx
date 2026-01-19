import React from 'react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1765422820540-bccbce436a4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBjb3VwbGUlMjBzb2Z0fGVufDF8fHx8MTc2ODc0NjQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          filter: 'blur(3px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgb(var(--color-ivory))]/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-sm tracking-[0.3em] uppercase mb-8 text-[rgb(var(--color-text-secondary))] animate-fadeIn">
          You're Invited
        </p>
        
        <h1 className="text-7xl md:text-8xl lg:text-9xl mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Olivia & James
        </h1>
        
        <div className="w-16 h-[1px] bg-[rgb(var(--color-dusty-beige))] mx-auto my-8 animate-fadeIn" style={{ animationDelay: '0.4s' }} />
        
        <p className="text-lg md:text-xl tracking-[0.2em] uppercase text-[rgb(var(--color-text-secondary))] animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          June 14th, 2026
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
