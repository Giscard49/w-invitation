import React from 'react';

export function OurStory() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[rgb(var(--color-warm-white))]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-12 h-[1px] bg-[rgb(var(--color-dusty-beige))]" />
          <svg className="mx-4 w-6 h-6 text-[rgb(var(--color-dusty-beige))]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-12 h-[1px] bg-[rgb(var(--color-dusty-beige))]" />
        </div>

        <h2 className="text-5xl md:text-6xl mb-12">
          Our Story
        </h2>
        
        <div className="space-y-6 leading-relaxed text-[rgb(var(--color-text-secondary))]">
          <p>
            We met on a crisp autumn evening in a small bookshop in Paris, both reaching for the same vintage novel. 
            What started as a shy smile became hours of conversation over coffee, and eventually, a love story of our own.
          </p>
          
          <p>
            Three years later, James proposed on the same street where we first met, beneath the golden glow of streetlamps 
            and falling leaves. It was perfect, just like every moment we've shared since that serendipitous day.
          </p>
          
          <p>
            Now, we invite you to celebrate with us as we begin our next chapter together—a lifetime of love, 
            laughter, and countless more stories to tell.
          </p>
        </div>

        {/* Decorative Bottom Line */}
        <div className="w-24 h-[1px] bg-[rgb(var(--color-dusty-beige))] mx-auto mt-16" />
      </div>
    </section>
  );
}
