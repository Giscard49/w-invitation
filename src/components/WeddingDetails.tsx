import React from 'react';
import { MapPin, Clock, Shirt } from 'lucide-react';

export function WeddingDetails() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[rgb(var(--color-champagne))]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-20 text-center">
          Wedding Details
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Venue */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-warm-white))] mb-6">
              <MapPin className="w-6 h-6 text-[rgb(var(--color-text-secondary))]" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4">Venue</h3>
            <div className="text-[rgb(var(--color-text-secondary))] space-y-2">
              <p className="font-normal">The Rosewood Estate</p>
              <p>1425 Garden Lane</p>
              <p>Napa Valley, California</p>
            </div>
          </div>

          {/* Time */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-warm-white))] mb-6">
              <Clock className="w-6 h-6 text-[rgb(var(--color-text-secondary))]" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4">Time</h3>
            <div className="text-[rgb(var(--color-text-secondary))] space-y-2">
              <p className="font-normal">Ceremony</p>
              <p>4:00 PM</p>
              <p className="font-normal mt-4">Reception</p>
              <p>6:00 PM</p>
            </div>
          </div>

          {/* Dress Code */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-warm-white))] mb-6">
              <Shirt className="w-6 h-6 text-[rgb(var(--color-text-secondary))]" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl mb-4">Dress Code</h3>
            <div className="text-[rgb(var(--color-text-secondary))] space-y-2">
              <p className="font-normal">Formal Attire</p>
              <p>Garden Wedding</p>
              <p>Neutral & Pastels</p>
              <p>Preferred</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
