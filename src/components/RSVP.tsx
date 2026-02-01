import React, { useState } from 'react';

export function RSVP() {
  const [response, setResponse] = useState<'attending' | 'notAttending' | null>(null);

  const handleResponse = (attending: boolean) => {
    setResponse(attending ? 'attending' : 'notAttending');
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-[rgb(var(--color-warm-white))]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl mb-8">
          RSVP
        </h2>
        
        <p className="text-lg text-[rgb(var(--color-text-secondary))] mb-12 leading-relaxed">
          Please let us know if you'll be able to join us on our special day.
          <br />
          We can't wait to celebrate with you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => handleResponse(true)}
            className={`px-12 py-4 rounded-full border-2 transition-all duration-300 ${
              response === 'attending'
                ? 'bg-[rgb(var(--color-dusty-beige))] border-[rgb(var(--color-dusty-beige))] text-white'
                : 'border-[rgb(var(--color-dusty-beige))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-dusty-beige))]/10'
            }`}
          >
            Will Attend
          </button>
          
          <button
            onClick={() => handleResponse(false)}
            className={`px-12 py-4 rounded-full border-2 transition-all duration-300 ${
              response === 'notAttending'
                ? 'bg-[rgb(var(--color-dusty-beige))] border-[rgb(var(--color-dusty-beige))] text-white'
                : 'border-[rgb(var(--color-dusty-beige))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-dusty-beige))]/10'
            }`}
          >
            Cannot Attend
          </button>
        </div>

        {response && (
          <p className="text-[rgb(var(--color-text-secondary))] animate-fadeIn">
            {response === 'attending' 
              ? "✨ Thank you! We're thrilled you'll be joining us." 
              : "Thank you for letting us know. You'll be missed."}
          </p>
        )}

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    </section>
  );
}
