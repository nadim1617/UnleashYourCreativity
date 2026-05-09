"use client";

import { useState, useEffect } from "react";
import { 
  Camera, 
  GraduationCap, 
  School, 
  Building2, 
  Image as ImageIcon, 
  Ruler, 
  Search, 
  Palette, 
  Hash, 
  FolderKey, 
  AlertTriangle, 
  Smartphone, 
  Globe, 
  Aperture,
  Mail,
  Users,
  User
} from "lucide-react";
import s from "./page.module.css";

const SUBMIT_URL = "https://forms.gle/seVqjFAQcRi6Q6se8";

/* ───── Countdown Logic ───── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

/* ───── Sticky Button Hook ───── */
function useStickyVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible;
}

/* ───── Cursor Tracking Hook ───── */
function useCursorPosition() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const update = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);
  return pos;
}

/* ───── Accordion Data ───── */
const RULES = [
  {
    title: "Eligibility & Participation",
    items: [
      "University Level: Open to all university students in Bangladesh with valid ID.",
      "School & College Level: Open to all school and college students with valid ID.",
      "DIU Exclusive: Only for currently enrolled Daffodil International University students.",
      "Each participant may submit up to 10 photos per category.",
    ],
  },
  {
    title: "Originality & Authenticity",
    items: [
      "All photographs must be the original work of the participant.",
      "No AI-generated, AI-enhanced, or heavily manipulated images allowed.",
      "Basic adjustments (exposure, contrast, cropping) are permitted.",
      "Composite images or images with added/removed elements are not allowed.",
    ],
  },
  {
    title: "Rights & Usage",
    items: [
      "Participants retain copyright of their images.",
      "By submitting, you grant DIUPS non-exclusive rights to display your work for exhibition and promotional purposes.",
      "Proper credit will always be given to the photographer.",
    ],
  },
  {
    title: "Disqualification Criteria",
    items: [
      "Submitting work that is not your own.",
      "Using AI generation tools (Midjourney, DALL·E, Stable Diffusion, etc.).",
      "Failure to provide eligibility proof when requested.",
      "Incorrect file naming format.",
      "Submitting images that violate ethical or legal standards.",
    ],
  },
  {
    title: "Judging & Results",
    items: [
      "Entries will be judged by a panel of professional photographers and academics.",
      "Judging criteria: Composition, Creativity, Technical Excellence, Storytelling.",
      "Results will be announced on DIUPS official social media channels.",
      "The judges' decision is final and binding.",
    ],
  },
];

/* ───── Categories Data ───── */
const CATEGORIES = [
  {
    icon: <GraduationCap size={40} />,
    title: "University Level",
    desc: "Open to all university students across Bangladesh. Showcase your creative vision.",
    status: "Open",
  },
  {
    icon: <School size={40} />,
    title: "School & College Level",
    desc: "For aspiring young photographers from schools and colleges nationwide.",
    status: "Open",
  },
  {
    icon: <Building2 size={40} />,
    title: "DIU Exclusive",
    desc: "\"Beautiful Campus\" — Capture the beauty of Daffodil International University.",
    status: "DIU Only",
  },
];

/* ───── Checklist Data ───── */
const CHECKLIST = [
  { icon: <ImageIcon size={20} />, text: "Format: JPEG / JPG only" },
  { icon: <Ruler size={20} />, text: "Long side: 3000px minimum" },
  { icon: <Search size={20} />, text: "Resolution: 300 DPI" },
  { icon: <Palette size={20} />, text: "Color space: sRGB" },
  { icon: <Hash size={20} />, text: "Max 10 photos per category" },
  { icon: <FolderKey size={20} />, text: "Follow naming format strictly" },
];

/* ───── Judges Data ───── */
const JUDGES = [
  { name: "To be announced", title: "Distinguished Judge", bio: "Renowned photography expert joining our panel soon." },
  { name: "To be announced", title: "Distinguished Judge", bio: "Renowned photography expert joining our panel soon." },
  { name: "To be announced", title: "Distinguished Judge", bio: "Renowned photography expert joining our panel soon." }
];

/* ───── Slot Machine Hook ───── */
function useSlotMachine(target, duration = 2000) {
  const [value, setValue] = useState(target.replace(/[0-9]/g, "0"));
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    if (!started) return;
    const targetArray = target.split("");
    
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      if (progress >= 1) {
        clearInterval(interval);
        setValue(target);
        return;
      }
      
      const charsLocked = Math.floor(progress * targetArray.length);
      const nextValue = targetArray.map((char, index) => {
        if (index < charsLocked) return char;
        if (char === "," || char === " ") return char;
        return Math.floor(Math.random() * 10).toString();
      });
      
      setValue(nextValue.join(""));
    }, 50);
    
    return () => clearInterval(interval);
  }, [target, duration, started]);

  return [value, setStarted];
}

export default function Home() {
  const countdown = useCountdown("2026-12-25T23:59:59");
  const stickyVisible = useStickyVisible();
  const cursor = useCursorPosition();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  const [prizeAmount, startPrizeAnim] = useSlotMachine("50,000", 2500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startPrizeAnim(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    const prizepool = document.getElementById("prizepool");
    if (prizepool) observer.observe(prizepool);
    return () => observer.disconnect();
  }, [startPrizeAnim]);

  const toggleAccordion = (i) => setOpenAccordion(openAccordion === i ? null : i);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsAgreed(false);
  };

  const handleProceed = () => {
    if (isAgreed) {
      setIsModalOpen(false);
      window.open(SUBMIT_URL, "_blank");
    }
  };

  const handleGoToRules = () => {
    setIsModalOpen(false);
    document.getElementById("rules")?.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Unleash Your Creativity Season 2.0",
    "description": "A National Photography Exhibition organized by Daffodil International University Photographic Society (DIUPS).",
    "image": "https://unleashyourcreativity.vercel.app/images/hero-bg.png",
    "startDate": "2026-12-25T09:00:00+06:00",
    "endDate": "2026-12-30T18:00:00+06:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Daffodil International University",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Daffodil International University Photographic Society",
      "url": "https://unleashyourcreativity.vercel.app"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ═══════ CURSOR GLOW ═══════ */}
      <div 
        className="cursor-glow" 
        style={{ left: cursor.x, top: cursor.y }}
      />

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className={s.hero}>
        <div className={s.heroBg}>
          <img src="/images/hero-bg.png" alt="Abstract photography background" />
        </div>
        <div className={s.heroContent}>
          <div className={s.heroLogo}>
            <img src="/images/diups-logo.png" alt="DIUPS Logo" />
          </div>
          <span className={s.heroBadge}>
            <span className={s.heroBadgeDot}></span>
            Call for Entry Open
          </span>
          <p className={s.heroTagline}>Daffodil International University Photographic Society presents</p>
          <h1 className={s.heroTitle}>
            Unleash Your
            <span className={s.heroTitleAccent}>Creativity</span>
          </h1>
          <p className={s.heroSeason}>Season 2.0</p>
          <p className={s.heroOrg}>A National Photography Exhibition</p>
          <div className={s.heroButtons}>
            <button onClick={handleOpenModal} className="btn-primary" id="hero-submit-btn">
              <Camera size={20} /> Submit Your Entry
            </button>
            <a href="#categories" className="btn-secondary">
              Explore Categories
            </a>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ COUNTDOWN ═══════ */}
      <section id="timeline" className={`${s.countdown} section`}>
        <div className="container">
          <h2 className="section-title">
            Exhibition <span className="accent">Timeline</span>
          </h2>
          <p className="section-subtitle">Mark your calendar — don't miss the deadline.</p>

          <div className={s.countdownGrid}>
            <div className={s.countdownCard}>
              <p className={s.countdownLabel}>Submissions Open</p>
              <p className={s.countdownDate}>Today</p>
              <p className={s.countdownYear}>2026</p>
            </div>
            <span className={s.countdownArrow}>→</span>
            <div className={s.countdownCard}>
              <p className={s.countdownLabel}>Final Deadline</p>
              <p className={s.countdownDate}>December 25</p>
              <p className={s.countdownYear}>2026</p>
            </div>
          </div>

          <div className={s.countdownTimer}>
            <p className={s.countdownTimerLabel}>Time Remaining Until Deadline</p>
            <div className={s.timerGrid}>
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Minutes" },
                { val: countdown.seconds, label: "Seconds" },
              ].map((unit) => (
                <div key={unit.label} className={s.timerUnit}>
                  <div className={s.timerNumber}>{String(unit.val).padStart(2, "0")}</div>
                  <div className={s.timerSuffix}>{unit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ PRIZE POOL ═══════ */}
      <section id="prizepool" className={`${s.prizepool} section`}>
        {/* Roaming Paper Cut Confetti */}
        <div className={s.confettiContainer}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`${s.confettiParticle} ${s[`confetti${i % 5}`]}`} />
          ))}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className={s.prizeCard}>
            <div className={s.prizeHeader}>
              <h2 className={s.prizeTitle}>
                Total <span className="accent">Prize Pool</span>
              </h2>
              <p className={s.prizeSubtitle}>Showcase your talent and win big.</p>
            </div>
            
            <div className={s.prizeAmountWrapper}>
              <span className={s.prizeCurrency}>BDT</span>
              <span className={s.prizeAmount}>{prizeAmount}</span>
            </div>

            <div className={s.prizeExtras}>
              <p>+ Exciting Gift Hampers & Certificates for Winners</p>
              <p>Special crests for category champions!</p>
            </div>
            
            <button onClick={handleOpenModal} className="btn-primary" style={{ marginTop: '2rem' }}>
              Enter the Competition Now
            </button>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ CATEGORIES ═══════ */}
      <section id="categories" className={`${s.categories} section`}>
        <div className="container">
          <h2 className="section-title">
            Exhibition <span className="accent">Categories</span>
          </h2>
          <p className="section-subtitle">Choose your category and submit your finest work.</p>

          <div className={s.categoriesGrid}>
            {CATEGORIES.map((cat, i) => (
              <div key={i} className={s.categoryCard} id={`category-${i}`}>
                <div className={s.categoryIcon}>{cat.icon}</div>
                <h3 className={s.categoryTitle}>{cat.title}</h3>
                <p className={s.categoryDesc}>{cat.desc}</p>
                <span className={s.categoryBadge}>{cat.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ SUBMISSION CHECKLIST ═══════ */}
      <section id="checklist" className={`${s.checklist} section`}>
        <div className="container">
          <h2 className="section-title">
            Submission <span className="accent">Checklist</span>
          </h2>
          <p className="section-subtitle">Ensure your photos meet all requirements before submitting.</p>

          <div className={s.checklistGrid}>
            {CHECKLIST.map((item, i) => (
              <div key={i} className={s.checkItem} id={`check-${i}`}>
                <div className={s.checkIcon}>{item.icon}</div>
                <span className={s.checkText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ FILE NAMING FORMAT ═══════ */}
      <section id="naming" className={`${s.naming} section`}>
        <div className="container">
          <h2 className="section-title">
            File <span className="accent">Naming Format</span>
          </h2>
          <p className="section-subtitle">Mandatory format — incorrect naming may lead to disqualification.</p>

          <div className={s.namingBlock}>
            <div className={s.namingHeader}>
              <div className={s.namingDots}>
                <span className={s.namingDot}></span>
                <span className={s.namingDot}></span>
                <span className={s.namingDot}></span>
              </div>
              <span className={s.namingHeaderText}>file_naming_format.txt</span>
            </div>
            <div className={s.namingCode}>
              <p className={s.namingFormat}>
                <span style={{ color: "#7B61FF" }}>PhotoNo</span>
                <span style={{ color: "#f0f0f0" }}>_</span>
                <span style={{ color: "#4A90D9" }}>YourName</span>
                <span style={{ color: "#f0f0f0" }}>_</span>
                <span style={{ color: "#00C853" }}>PhoneNumber</span>
                <span style={{ color: "#f0f0f0" }}>_</span>
                <span style={{ color: "#CCFF00" }}>InstitutionName</span>
              </p>
              <div className={s.namingExample}>
                <p className={s.namingExLabel}>Example</p>
                <p className={s.namingExValue}>01_Rafiul_Islam_01712345678_DIU</p>
              </div>
            </div>
            <div className={s.namingWarning}>
              <span className={s.namingWarningIcon}><AlertTriangle size={20} /></span>
              <span>
                Incorrectly named files will not be considered. Use underscores only — no spaces, hyphens, or special characters.
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ RULES & TERMS ═══════ */}
      <section id="rules" className={`${s.rules} section`}>
        <div className="container">
          <h2 className="section-title">
            Rules & <span className="accent">Terms</span>
          </h2>
          <p className="section-subtitle">Please read all terms carefully before submitting your entry.</p>

          <div className={s.accordion}>
            {RULES.map((rule, i) => (
              <div key={i} className={s.accordionItem} id={`rule-${i}`}>
                <button 
                  className={s.accordionBtn} 
                  onClick={() => toggleAccordion(i)}
                  aria-expanded={openAccordion === i}
                  aria-controls={`accordion-body-${i}`}
                >
                  <span>{rule.title}</span>
                  <span className={`${s.accordionIcon} ${openAccordion === i ? s.accordionIconOpen : ""}`}>+</span>
                </button>
                <div 
                  id={`accordion-body-${i}`}
                  className={`${s.accordionBody} ${openAccordion === i ? s.accordionBodyOpen : ""}`}
                >
                  <ul className={s.accordionText}>
                    {rule.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ JUDGES PANEL ═══════ */}
      <section id="judges" className={`${s.judges} section`}>
        <div className="container">
          <h2 className="section-title">
            Judges <span className="accent">Panel</span>
          </h2>
          <p className="section-subtitle">Meet our esteemed panel of distinguished photography experts.</p>

          <div className={s.judgesGrid}>
            {JUDGES.map((judge, i) => (
              <div key={i} className={s.judgeCard}>
                <div className={s.judgePhotoWrapper}>
                  <div className={s.judgePhotoPlaceholder}>
                    <User size={48} className={s.judgeIcon} />
                  </div>
                </div>
                <h3 className={s.judgeName}>{judge.name}</h3>
                <p className={s.judgeTitle}>{judge.title}</p>
                <p className={s.judgeBio}>{judge.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ FOOTER ═══════ */}
      <footer id="contact" className={s.footer}>
        <div className="container">
          <div className={s.footerGrid}>
            {/* Brand */}
            <div className={s.footerBrand}>
              <h3>
                Unleash Your <span className={s.footerBrandAccent}>Creativity</span>
              </h3>
              <p>
                A national photography exhibition organized by Daffodil International University Photographic Society
                (DIUPS). Celebrating the art of photography across Bangladesh.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className={s.footerHeading}>Contact Us</h4>
              <div className={s.footerContact}>
                <div className={s.contactItem}>
                  <div className={s.contactIcon}><Mail size={16} /></div>
                  <div className={s.contactInfo}>
                    <strong>Official Email</strong>
                    <span>diups@diu.edu.bd</span>
                  </div>
                </div>
                <div className={s.contactItem}>
                  <div className={s.contactIcon}><Smartphone size={16} /></div>
                  <div className={s.contactInfo}>
                    <strong>President</strong>
                    <span>WhatsApp: +880 1XXX-XXXXXX</span>
                  </div>
                </div>
                <div className={s.contactItem}>
                  <div className={s.contactIcon}><Smartphone size={16} /></div>
                  <div className={s.contactInfo}>
                    <strong>General Secretary</strong>
                    <span>WhatsApp: +880 1XXX-XXXXXX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className={s.footerHeading}>Follow DIUPS</h4>
              <div className={s.footerSocials}>
                <a
                  href="https://www.facebook.com/DIUPS.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.socialLink}
                  aria-label="Visit DIUPS Official Facebook Page"
                >
                  <Globe size={16} /> Official Facebook Page
                </a>
                <a
                  href="https://www.facebook.com/groups/diuphotographyclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.socialLink}
                  aria-label="Visit DIUPS Official Facebook Group"
                >
                  <Users size={16} /> Official Facebook Group
                </a>
                <a
                  href="https://www.instagram.com/diuphotographicsocietybd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.socialLink}
                  aria-label="Visit DIUPS Official Instagram"
                >
                  <Aperture size={16} /> Official Instagram
                </a>
              </div>
            </div>
          </div>

          <div className={s.footerBottom}>
            <p>
              © 2025 <a href="https://facebook.com/diabordhon">DIUPS</a> — Daffodil International University
              Photographic Society. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════ STICKY SUBMIT ═══════ */}
      <div className={`${s.stickySubmit} ${stickyVisible ? s.stickySubmitVisible : ""}`}>
        <button onClick={handleOpenModal} className={s.stickySubmitBtn} id="sticky-submit-btn">
          <Camera size={20} /> Submit Now
        </button>
      </div>

      {/* ═══════ MODAL OVERLAY ═══════ */}
      {isModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h3>Before you submit</h3>
            <p>Please confirm that you have read all the rules, terms, and file naming formats carefully.</p>
            
            <label className={s.modalCheckbox}>
              <input 
                type="checkbox" 
                checked={isAgreed} 
                onChange={(e) => setIsAgreed(e.target.checked)} 
              />
              I have read and understand the rules and terms.
            </label>

            <div className={s.modalActions}>
              <button className="btn-secondary" onClick={handleGoToRules}>
                Take me to Rules
              </button>
              <button 
                className="btn-primary" 
                disabled={!isAgreed}
                onClick={handleProceed}
                style={{ opacity: isAgreed ? 1 : 0.5, cursor: isAgreed ? "pointer" : "not-allowed" }}
              >
                Proceed to Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
