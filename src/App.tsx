import React, { useState, useEffect } from 'react';
import { MapPin, Heart } from 'lucide-react';
import { attendanceStorage } from './utils/attendanceStorage';
import { AttendanceAdmin } from './components/AttendanceAdmin';
import { AdminLogin } from './components/AdminLogin';
import Photo1 from "../src/asset/Photo1.jpeg";
import photo3 from "../src/asset/photo3.jpeg";
import photo4 from "../src/asset/photo4.jpeg";




export default function App() {
  const [name, setName] = useState('');
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check URL hash for admin view and authentication
  useEffect(() => {
    const hash = window.location.hash;
    const shouldShowAdmin = hash === '#admin';
    setIsAdminView(shouldShowAdmin);
    
    // Check if user is already authenticated (with session expiration)
    if (shouldShowAdmin) {
      const authStatus = localStorage.getItem('admin_authenticated');
      const authTime = localStorage.getItem('admin_authenticated_at');
      
      if (authStatus === 'true' && authTime) {
        // Check if session is still valid (24 hours)
        const authDate = new Date(authTime);
        const now = new Date();
        const hoursSinceAuth = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceAuth < 24) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_authenticated_at');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
    
    const handleHashChange = () => {
      const newHash = window.location.hash;
      const shouldShow = newHash === '#admin';
      setIsAdminView(shouldShow);
      if (shouldShow) {
        const authStatus = localStorage.getItem('admin_authenticated');
        const authTime = localStorage.getItem('admin_authenticated_at');
        
        if (authStatus === 'true' && authTime) {
          const authDate = new Date(authTime);
          const now = new Date();
          const hoursSinceAuth = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceAuth < 24) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin_authenticated');
            localStorage.removeItem('admin_authenticated_at');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_authenticated_at');
    setIsAuthenticated(false);
    window.location.hash = '';
    setIsAdminView(false);
  };

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-09-27T11:00:00');

      const updateTimer = () => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || willAttend === null) {
      return;
    }

    try {
      await attendanceStorage.saveRecord({
        name: name.trim(),
        willAttend,
      });
      
      setSubmitted(true);
      setName('');
      setWillAttend(null);
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error saving attendance record:', error);
      alert('There was an error saving your response. Please try again.');
    }
  };

  // Show admin view if hash is #admin
  if (isAdminView) {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AttendanceAdmin onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
     
     
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 py-16 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#f5f0eb]/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#faf5f0]/40 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 w-full max-w-md">
          {/* Date and Location Header */}
          <div className="flex justify-between w-full mb-12 text-sm animate-fadeInUp">
            <div className="text-center">
              <div className="text-lg font-semibold mb-1 tracking-wide">Heaven Garden</div>
              <div className="text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">Location</div>
            </div>
            <div className="w-px bg-gradient-to-b from-transparent via-[rgb(var(--color-border))] to-transparent" />
            <div className="text-center">
              <div className="text-lg font-semibold mb-1 tracking-wide">27.09.2026</div>
              <div className="text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">Date</div>
            </div>
          </div>

          {/* Decorative Top Ornament */}
          <div className="flex justify-center mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
              <path d="M0 10 Q 20 5, 40 10 T 80 10" stroke="rgb(var(--color-accent))" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <circle cx="40" cy="10" r="2" fill="rgb(var(--color-accent))" opacity="0.5"/>
            </svg>
          </div>

          {/* Couple Names */}
          <h1 className="text-5xl mb-6 text-center animate-fadeInUp" style={{ fontFamily: 'Tangerine, cursive', animationDelay: '0.3s' }}>
            Giscard & CeAnna
          </h1>

          {/* Main Heading */}
          <h2 className="text-2xl mb-6 text-center font-serif animate-fadeInUp tracking-wide" style={{ animationDelay: '0.4s' }}>
            We are getting married!
          </h2>

          {/* Invitation Text */}
          <p className="text-center text-base leading-relaxed mb-10 max-w-sm mx-auto text-[rgb(var(--color-text-secondary))] animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            And we would love to have you<br />with us on our big day!
          </p>

          {/* Couple Image */}
          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 animate-scaleIn" style={{ animationDelay: '0.6s' }}>
          
               <img
                src={Photo1}
                alt="Couple"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
          </div>
        </div>
      </section>

      {/* Dear Friends Section */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 py-16 relative">
        <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-bl from-[#f0ebe6]/20 to-transparent rounded-full blur-2xl" />
        
        <div className="w-full max-w-md relative z-10">
          <h2 className="text-5xl mb-10 text-center leading-tight" style={{ fontFamily: 'Tangerine, cursive' }}>
            Dear friends<br />and family!
          </h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg shadow-black/5 border border-white/80">
            <p className="text-center text-base leading-relaxed mb-6 text-[rgb(var(--color-text-secondary))]">
              With joyful hearts and deep gratitude, we invite you to share in one of the most meaningful days of our lives as we celebrate our wedding and the beginning of our forever together.
            </p>

            <p className="text-center text-base leading-relaxed mb-6 text-[rgb(var(--color-text-secondary))]">
              We hope you will join us for an evening filled with love, happiness, laughter, and dancing, surrounded by the people who have touched our lives and supported our journey.
            </p>

            <p className="text-center text-base leading-relaxed text-[rgb(var(--color-text-secondary))]">
              Your presence would be the greatest gift as we create memories that will last a lifetime. We cannot wait to celebrate this special moment with you.
            </p>
          </div>

          {/* Dove Decoration */}
          {/* <div className="flex justify-end mt-6 pr-8">
            <svg width="70" height="70" viewBox="0 0 60 60" fill="none" className="text-[rgb(var(--color-accent))]/30">
              <path d="M45 25C45 25 40 20 35 20C30 20 28 22 25 25C22 28 20 32 18 35C16 38 12 40 10 42C8 44 5 48 5 48C5 48 8 45 12 43C16 41 20 40 25 38C30 36 35 33 38 30C41 27 43 25 45 25Z" fill="currentColor"/>
              <ellipse cx="38" cy="24" rx="2.5" ry="2.5" fill="currentColor"/>
            </svg>
          </div> */}

          {/* Schedule Heading */}
          <h3 className="text-5xl mt-12 mb-6 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
            Schedule
          </h3>

          {/* Date Button */}
          <div className="flex justify-center mb-4">
            <div className="px-10 py-3 bg-white border border-[rgb(var(--color-border))] rounded-full text-sm shadow-sm hover:shadow-md transition-shadow">
              September 27, 2026
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Details */}
      <section className="min-h-screen flex flex-col items-center justify-start px-5 py-10 relative">
        <div className="absolute top-40 left-10 w-56 h-56 bg-gradient-to-br from-[#ebe6e1]/20 to-transparent rounded-full blur-2xl" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Schedule Box */}
          <div className="bg-white border border-[rgb(var(--color-border))]/50 rounded-[2rem] p-10 mb-12 shadow-xl shadow-black/5">
            <div className="space-y-5 text-base">
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[60px] text-[rgb(var(--color-accent))]">11:00</span>
                <span className="text-[rgb(var(--color-text-secondary))]">  <i>Introduction & Dowry</i></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[60px] text-[rgb(var(--color-accent))]">3:00 </span>
                <span className="text-[rgb(var(--color-text-secondary))]">Church</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[60px] text-[rgb(var(--color-accent))]">6:00 </span>
                <span className="text-[rgb(var(--color-text-secondary))]">Reception </span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[60px] text-[rgb(var(--color-accent))]">10:00</span>
                <span className="text-[rgb(var(--color-text-secondary))]">Thank you for making our special day unforgettable.</span>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center my-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
              <Heart className="w-4 h-4 mx-3 text-[rgb(var(--color-accent))]/40 fill-[rgb(var(--color-accent))]/40" />
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
            </div>
          </div>

          {/* Countdown */}
          <h3 className="text-5xl mb-6 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
            Starts in
          </h3>

          <div className="text-center mb-6 bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg shadow-black/5 border border-white/80">
            <div className="text-3xl mb-8 tracking-[0.15em] font-light tabular-nums">
              {timeLeft.days} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="flex justify-center gap-4 text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-widest">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown with Image */}
      <section className="min-h-screen flex flx-col items-center justify-center px-6 py-12 relative">
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tl from-[#f5f0eb]/30 to-transparent rounded-full blur-3xl" />
        
        <div className="w-full max-w-md relative z-10">
          {/* <h3 className="text-5xl mb-8 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
            Starts in
          </h3> */}

          {/* <div className="text-center mb-10 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg shadow-black/5 border border-white/80">
            <div className="text-5xl mb-4 tracking-[0.15em] font-light tabular-nums">
              {timeLeft.days} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="flex justify-center gap-10 text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-widest">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
          </div> */}

          {/* Couple Image */}
          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
            
            <img
                src={photo4}
                alt="Couple b"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
          </div>
        </div>
      </section>

      {/* Dress Code & Location */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 py-16 relative">
        <div className="absolute top-32 left-8 w-52 h-52 bg-gradient-to-br from-[#f0ebe6]/20 to-transparent rounded-full blur-2xl" />
        
        <div className="w-full max-w-md relative z-10">
          <h3 className="text-5xl mb-6 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
            Dress code
          </h3>

          <p className="text-center text-base leading-relaxed mb-16 text-[rgb(var(--color-text-secondary))] max-w-sm mx-auto">
            Kindly wear nude & neutral colors, let’s dance and celebrate in style!
          </p>

          <h3 className="text-5xl mb-8 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
            Location
          </h3>

          <a
  href="https://www.google.com/maps/place/Heaven+Garden+Rebero/@-1.9964914,30.0779449,17z/data=!4m14!1m7!3m6!1s0x19dca8af55f8d09d:0x9800d21071830de7!2sHeaven+Garden+Rebero!8m2!3d-1.9964914!4d30.0779449!16s%2Fg%2F11f3jvg754!3m5!1s0x19dca8af55f8d09d:0x9800d21071830de7!8m2!3d-1.9964914!4d30.0779449!16s%2Fg%2F11f3jvg754?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D" 
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="bg-white border border-[rgb(var(--color-border))]/50 rounded-[2rem] p-8 mb-12 shadow-xl shadow-black/5 cursor-pointer hover:shadow-2xl transition">
    <div className="flex items-start gap-4 justify-center">
      <MapPin
        className="w-6 h-6 text-[rgb(var(--color-accent))] mt-1 flex-shrink-0"
        strokeWidth={1.5}
      />
      <div className="text-center">
        <p className="font-semibold mb-2 text-lg">Heaven Garden Rebero</p>
        <p className="text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
          Address:{" "}
          <span className="underline decoration-dotted underline-offset-4">
            KK 553 St
          </span>
        </p>
      </div>
    </div>
  </div>
</a>


          {/* Decorative Divider */}
          <div className="flex items-center justify-center my-12">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
            <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-accent))]/30 mx-4" />
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
          </div>

          {/* RSVP Form */}
          <div className="bg-white border border-[rgb(var(--color-border))]/50 rounded-[2rem] p-10 shadow-xl shadow-black/5">
            <h3 className="text-5xl mb-6 text-center leading-tight" style={{ fontFamily: 'Tangerine, cursive' }}>
              Please confirm<br />your attendance
            </h3>

            <p className="text-center text-sm mb-8 text-[rgb(var(--color-accent))]">
              No later than 25.07.2026
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-center text-sm mb-3 text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  Your full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border-b-2 border-[rgb(var(--color-border))] py-3 text-center focus:outline-none focus:border-[rgb(var(--color-accent))] transition-colors bg-transparent placeholder:text-[rgb(var(--color-text-secondary))]/30"
                />
              </div>

              <div className="space-y-4 mb-10">
                <label className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attendance"
                      checked={willAttend === true}
                      onChange={() => setWillAttend(true)}
                      className="w-5 h-5 border-2 border-[rgb(var(--color-border))] rounded-full appearance-none checked:border-[rgb(var(--color-accent))] checked:bg-[rgb(var(--color-accent))] transition-all cursor-pointer"
                    />
                    {willAttend === true && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <span className="text-base">I will attend</span>
                </label>

                <label className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="attendance"
                      checked={willAttend === false}
                      onChange={() => setWillAttend(false)}
                      className="w-5 h-5 border-2 border-[rgb(var(--color-border))] rounded-full appearance-none checked:border-[rgb(var(--color-accent))] checked:bg-[rgb(var(--color-accent))] transition-all cursor-pointer"
                    />
                    {willAttend === false && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <span className="text-base">No, unfortunately I can't attend 😢</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!name || willAttend === null}
                className="w-full bg-gradient-to-r from-[rgb(var(--color-accent))]/80 to-[rgb(var(--color-accent))]/90 hover:from-[rgb(var(--color-accent))] hover:to-[rgb(var(--color-accent))] disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[rgb(var(--color-accent))]/20 hover:shadow-xl hover:shadow-[rgb(var(--color-accent))]/30 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {submitted ? '✓ Submitted!' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 py-12 relative">
        <div className="absolute top-30 right-8 w-56 h-56 bg-gradient-to-bl from-[#ebe6e1]/20 to-transparent rounded-full blur-2xl" />
        
        <div className="w-full max-w-md relative z-10">
          <h3 className="text-5xl mb-10 text-center leading-tight" style={{ fontFamily: 'Tangerine, cursive' }}>
            Contact<br />Information
          </h3>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-10 shadow-lg shadow-black/5 border border-white/80">
            <p className="text-center text-base leading-relaxed mb-4 text-[rgb(var(--color-text-secondary))]">
              If you have any questions, feel free to contact the groom at
            </p>

            <a href="tel:+250785036809" className="block text-center text-3xl mb-8 hover:text-[rgb(var(--color-accent))] transition-colors" style={{ fontFamily: 'Tangerine, cursive' }}>
              +250 785 036 809 <br/>
            </a>
           <a
            href="https://wa.me/18328658481"
            target="_blank"
             rel="noopener noreferrer"
         className="block text-center text-3xl mb-8 hover:text-[rgb(var(--color-accent))] transition-colors"
      style={{ fontFamily: 'Tangerine, cursive' }}
       >
           +1 (832) 865-8481
             </a>

            <div className="flex items-center justify-center my-6">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
              <span className="mx-4 text-[rgb(var(--color-text-secondary))]">or</span>
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
            </div>

            <p className="text-center text-base mb-4 text-[rgb(var(--color-text-secondary))]">
              the bride at
            </p>

            <a href="tel:+15012471822" className="block text-center text-3xl hover:text-[rgb(var(--color-accent))] transition-colors" style={{ fontFamily: 'Tangerine, cursive' }}>
              +250 795 975 619 <br/> <br/>
            </a>
            <a
  href="https://wa.me/15012471822"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center text-3xl mb-8 hover:text-[rgb(var(--color-accent))] transition-colors"
  style={{ fontFamily: 'Tangerine, cursive' }}
>
  +1 (501) 247-1822
</a>

          </div>

          {/* Couple Image */}
          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
            
            <img
                src={photo3}
                alt="Couple C"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#f5f0eb]/20 to-[#faf5f0]/20 rounded-full blur-3xl" />
        
        <div className="w-full max-w-md text-center relative z-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-lg shadow-black/5 border border-white/80">
            <p className="text-5xl mb-6 leading-relaxed" style={{ fontFamily: 'Tangerine, cursive' }}>
              We look forward<br />to seeing you!
            </p>

            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
              <Heart className="w-5 h-5 mx-4 text-[rgb(var(--color-accent))]/50 fill-[rgb(var(--color-accent))]/50" />
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
            </div>

            <p className="text-3xl font-serif mb-3 tracking-wide">
              Giscard and CeAnna
            </p>

            <p className="text-2xl text-[rgb(var(--color-text-secondary))] uppercase tracking-widest">
              27 • 09 • 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
