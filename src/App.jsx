import { useState } from "react";

const PLANS = [
  {
    id: "1month",
    label: "1 MES",
    duration: "1 mes",
    pricePerDay: "1.33",
    total: "39.99",
    originalTotal: "79.99",
    discount: "50% DTO",
    popular: false,
    color: "#6c63ff",
  },
  {
    id: "3month",
    label: "3 MESES",
    duration: "3 meses",
    pricePerDay: "0.89",
    total: "79.99",
    originalTotal: "179.99",
    discount: "55% DTO",
    popular: true,
    color: "#ff6b35",
  },
  {
    id: "6month",
    label: "6 MESES",
    duration: "6 meses",
    pricePerDay: "0.55",
    total: "99.99",
    originalTotal: "299.99",
    discount: "67% DTO",
    popular: false,
    color: "#6c63ff",
  },
];

const TESTIMONIALS = [
  {
    name: "María G.",
    avatar: "M",
    stars: 5,
    text: "Perdí 8 kg en 2 meses sin pasar hambre. El plan es súper fácil de seguir y las recetas están deliciosas.",
    kg: "-8 kg",
    color: "#ff6b35",
  },
  {
    name: "Laura P.",
    avatar: "L",
    stars: 5,
    text: "Nunca pensé que podría mantener una dieta saludable. Come Sano y Fácil cambió mi relación con la comida.",
    kg: "-12 kg",
    color: "#6c63ff",
  },
  {
    name: "Carmen R.",
    avatar: "C",
    stars: 5,
    text: "Las recetas altas en proteína me mantienen saciada todo el día. ¡Increíble resultado en solo 6 semanas!",
    kg: "-6 kg",
    color: "#2ec4b6",
  },
];

const BENEFITS = [
  { icon: "🥗", title: "Plan 100% personalizado", desc: "Adaptado a tus objetivos, preferencias y estilo de vida" },
  { icon: "💪", title: "Alto en proteínas", desc: "Recetas diseñadas para mantener la masa muscular mientras pierdes grasa" },
  { icon: "📱", title: "Acceso inmediato", desc: "Descarga tu plan completo al instante después del pago" },
  { icon: "👩‍⚕️", title: "Respaldado por nutricionistas", desc: "Creado por expertos en nutrición y pérdida de peso saludable" },
  { icon: "🔄", title: "Sostenible a largo plazo", desc: "Sin restricciones extremas, aprende a comer bien para siempre" },
  { icon: "⚡", title: "Resultados en 2 semanas", desc: "La mayoría de clientes notan cambios visibles en las primeras 2 semanas" },
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("3month");
  const [step, setStep] = useState(1); // 1: checkout, 2: form, 3: success
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [countdown, setCountdown] = useState({ min: 14, sec: 59 });

  // Countdown timer
  useState(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.sec === 0) {
          if (prev.min === 0) {
            clearInterval(timer);
            return { min: 0, sec: 0 };
          }
          return { min: prev.min - 1, sec: 59 };
        }
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPlan = PLANS.find((p) => p.id === selectedPlan);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "El nombre es obligatorio";
    if (!email.includes("@")) errs.email = "Introduce un email válido";
    if (cardNumber.replace(/\s/g, "").length < 16) errs.cardNumber = "Número de tarjeta inválido";
    if (cardExpiry.length < 5) errs.cardExpiry = "Fecha inválida";
    if (cardCvv.length < 3) errs.cardCvv = "CVV inválido";
    return errs;
  };

  const formatCard = (val) => {
    const nums = val.replace(/\D/g, "").slice(0, 16);
    return nums.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const nums = val.replace(/\D/g, "").slice(0, 4);
    if (nums.length >= 2) return nums.slice(0, 2) + "/" + nums.slice(2);
    return nums;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // TODO: Integrar pasarela de pago real (Stripe/PayPal) aquí
    // TODO: Enviar confirmación de pedido por email al usuario
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const styles = {
    root: {
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      background: "#0f0f1a",
      minHeight: "100vh",
      color: "#ffffff",
      overflowX: "hidden",
    },
    // HEADER
    header: {
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
      borderBottom: "1px solid rgba(108, 99, 255, 0.2)",
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(10px)",
    },
    logo: {
      fontSize: "22px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #ff6b35, #f7931e)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.5px",
    },
    secBadge: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(46, 196, 182, 0.15)",
      border: "1px solid rgba(46, 196, 182, 0.3)",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "12px",
      color: "#2ec4b6",
      position: "absolute",
      right: "20px",
    },
    // HERO
    hero: {
      background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)",
      padding: "32px 20px 24px",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: "clamp(22px, 5vw, 32px)",
      fontWeight: "800",
      lineHeight: "1.2",
      marginBottom: "12px",
      letterSpacing: "-0.5px",
    },
    heroHighlight: {
      background: "linear-gradient(135deg, #ff6b35, #f7931e)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroBadges: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    heroBadge: {
      background: "rgba(108, 99, 255, 0.15)",
      border: "1px solid rgba(108, 99, 255, 0.3)",
      borderRadius: "20px",
      padding: "6px 14px",
      fontSize: "12px",
      color: "#a29ff5",
      fontWeight: "600",
    },
    // TIMER
    timerBar: {
      background: "linear-gradient(135deg, #ff6b35, #e55a2b)",
      padding: "10px 20px",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    timerCount: {
      background: "rgba(0,0,0,0.3)",
      borderRadius: "6px",
      padding: "2px 8px",
      fontFamily: "monospace",
      fontSize: "16px",
      letterSpacing: "2px",
    },
    // MAIN CONTAINER
    container: {
      maxWidth: "480px",
      margin: "0 auto",
      padding: "0 16px 40px",
    },
    // SECTION TITLE
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "16px",
      marginTop: "28px",
      color: "#ffffff",
    },
    // PLAN CARDS
    planCard: (plan, isSelected, isHovered) => ({
      border: isSelected
        ? `2px solid ${plan.color}`
        : "2px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "12px",
      cursor: "pointer",
      background: isSelected
        ? `linear-gradient(135deg, ${plan.color}15, ${plan.color}08)`
        : isHovered
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.03)",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      position: "relative",
      transition: "all 0.2s ease",
      transform: isHovered && !isSelected ? "translateY(-2px)" : "none",
      boxShadow: isSelected ? `0 0 20px ${plan.color}30` : "none",
    }),
    popularBadge: (color) => ({
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      borderRadius: "20px",
      padding: "3px 14px",
      fontSize: "11px",
      fontWeight: "700",
      color: "#fff",
      whiteSpace: "nowrap",
      boxShadow: `0 4px 12px ${color}50`,
    }),
    radioCircle: (isSelected, color) => ({
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      border: `2px solid ${isSelected ? color : "rgba(255,255,255,0.3)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      background: isSelected ? color : "transparent",
      transition: "all 0.2s ease",
    }),
    radioDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#fff",
    },
    planLabel: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#a29ff5",
      letterSpacing: "1px",
    },
    planDuration: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#ffffff",
      marginBottom: "2px",
    },
    planPriceDay: (color) => ({
      fontSize: "13px",
      color: color,
      fontWeight: "600",
    }),
    planPriceRight: {
      marginLeft: "auto",
      textAlign: "right",
    },
    planOriginal: {
      fontSize: "13px",
      color: "#666",
      textDecoration: "line-through",
      marginBottom: "2px",
    },
    planTotal: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#ffffff",
    },
    planDiscount: (color) => ({
      display: "inline-block",
      background: `${color}25`,
      border: `1px solid ${color}50`,
      borderRadius: "8px",
      padding: "2px 8px",
      fontSize: "11px",
      fontWeight: "700",
      color: color,
      marginTop: "3px",
    }),
    // ORDER SUMMARY
    summaryBox: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      padding: "20px",
      marginTop: "8px",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      fontSize: "14px",
      color: "#ccc",
    },
    summaryDivider: {
      border: "none",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      margin: "8px 0",
    },
    summaryTotal: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0 0",
      fontSize: "18px",
      fontWeight: "800",
      color: "#ffffff",
    },
    // FORM
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      color: "#a29ff5",
      marginBottom: "8px",
      letterSpacing: "0.5px",
    },
    input: (hasError) => ({
      width: "100%",
      background: "rgba(255,255,255,0.06)",
      border: `1.5px solid ${hasError ? "#ff4444" : "rgba(255,255,255,0.15)"}`,
      borderRadius: "12px",
      padding: "14px 16px",
      fontSize: "15px",
      color: "#ffffff",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s ease",
      WebkitAppearance: "none",
    }),
    errorMsg: {
      fontSize: "12px",
      color: "#ff6b6b",
      marginTop: "5px",
    },
    cardRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    securityIcons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      padding: "14px",
      background: "rgba(46, 196, 182, 0.05)",
      border: "1px solid rgba(46, 196, 182, 0.15)",
      borderRadius: "12px",
      marginBottom: "20px",
    },
    secIcon: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "12px",
      color: "#2ec4b6",
      fontWeight: "600",
    },
    // CTA BUTTON
    ctaBtn: (hovered) => ({
      width: "100%",
      background: hovered
        ? "linear-gradient(135deg, #e55a2b, #d4821a)"
        : "linear-gradient(135deg, #ff6b35, #f7931e)",
      border: "none",
      borderRadius: "14px",
      padding: "18px",
      fontSize: "17px",
      fontWeight: "800",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "14px",
      boxShadow: hovered
        ? "0 8px 24px rgba(255, 107, 53, 0.5)"
        : "0 6px 20px rgba(255, 107, 53, 0.35)",
      transition: "all 0.2s ease",
      transform: hovered ? "translateY(-2px)" : "none",
      letterSpacing: "0.3px",
    }),
    spinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255,255,255,0.4)",
      borderTop: "2px solid #fff",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    },
    guarantee: {
      textAlign: "center",
      fontSize: "12px",
      color: "#666",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      marginBottom: "28px",
    },
    // BENEFITS
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "8px",
    },
    benefitCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "16px 14px",
    },
    benefitIcon: {
      fontSize: "24px",
      marginBottom: "8px",
    },
    benefitTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "4px",
      lineHeight: "1.3",
    },
    benefitDesc: {
      fontSize: "11px",
      color: "#888",
      lineHeight: "1.5",
    },
    // TESTIMONIALS
    testimonialCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "18px",
      marginBottom: "12px",
    },
    testimonialHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },
    avatarCircle: (color) => ({
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}, ${color}aa)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "700",
      color: "#fff",
      flexShrink: 0,
    }),
    kgBadge: (color) => ({
      marginLeft: "auto",
      background: `${color}20`,
      border: `1px solid ${color}50`,
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "14px",
      fontWeight: "800",
      color: color,
    }),
    stars: {
      color: "#f7931e",
      fontSize: "13px",
      letterSpacing: "1px",
    },
    testimonialText: {
      fontSize: "14px",
      color: "#ccc",
      lineHeight: "1.6",
      fontStyle: "italic",
    },
    // SUCCESS
    successContainer: {
      minHeight: "100vh",
      background: "#0f0f1a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    },
    successIcon: {
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #2ec4b6, #1a9e94)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      marginBottom: "24px",
      boxShadow: "0 0 40px rgba(46, 196, 182, 0.4)",
    },
    successTitle: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "12px",
      color: "#ffffff",
    },
    successText: {
      fontSize: "15px",
      color: "#aaa",
      lineHeight: "1.7",
      maxWidth: "340px",
      marginBottom: "32px",
    },
    successCard: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(46, 196, 182, 0.2)",
      borderRadius: "16px",
      padding: "20px",
      width: "100%",
      maxWidth: "360px",
      marginBottom: "24px",
    },
    successCardRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#ccc",
      marginBottom: "10px",
    },
  };

  if (step === 3) {
    return (
      <div style={styles.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0f0f1a; }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        `}</style>
        <div style={styles.successContainer}>
          <div style={{ ...styles.successIcon, animation: "pulse 2s ease infinite" }}>✅</div>
          <h1 style={styles.successTitle}>¡Pago completado! 🎉</h1>
          <p style={styles.successText}>
            Tu plan <strong style={{ color: "#ff6b35" }}>Come Sano y Fácil</strong> está listo.
            Hemos enviado tu acceso a <strong style={{ color: "#ffffff" }}>{email}</strong>.
            ¡Empieza tu transformación hoy!
          </p>
          <div style={styles.successCard}>
            <div style={styles.successCardRow}>
              <span>Plan adquirido:</span>
              <span style={{ color: "#ff6b35", fontWeight: "700" }}>Come Sano y Fácil — {currentPlan?.duration}</span>
            </div>
            <div style={styles.successCardRow}>
              <span>Importe cobrado:</span>
              <span style={{ color: "#2ec4b6", fontWeight: "800" }}>{currentPlan?.total}€</span>
            </div>
            <div style={styles.successCardRow}>
              <span>Email de acceso:</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>{email}</span>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#555", maxWidth: "320px", lineHeight: "1.6" }}>
            📧 Revisa tu bandeja de entrada (y spam) para acceder a tu plan personalizado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f1a; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        input::placeholder { color: #555; }
        input:focus { border-color: #6c63ff !important; box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f0f1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo}>Come Sano y Fácil 🥗</div>
        <div style={styles.secBadge}>
          <span>🔒</span>
          <span>Pago Seguro</span>
        </div>
      </header>

      {/* TIMER BAR */}
      <div style={styles.timerBar}>
        <span>⏰ Oferta especial termina en:</span>
        <span style={styles.timerCount}>
          {String(countdown.min).padStart(2, "0")}:{String(countdown.sec).padStart(2, "0")}
        </span>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Tu plan de alimentación<br />
          <span style={styles.heroHighlight}>personalizado y saludable</span>
        </h1>
        <p style={{ fontSize: "15px", color: "#aaa", marginBottom: "16px", lineHeight: "1.6" }}>
          Transforma tu alimentación con <strong style={{ color: "#fff" }}>Come Sano y Fácil</strong> — el plan alto en proteínas diseñado para perder peso de forma sostenible y sin pasar hambre.
        </p>
        <div style={styles.heroBadges}>
          {["⭐ 4.9/5 valoraciones", "👩‍⚕️ Avalado por nutricionistas", "✅ +50.000 usuarias"].map((b, i) => (
            <span key={i} style={styles.heroBadge}>{b}</span>
          ))}
        </div>
      </section>

      <div style={styles.container}>

        {/* PLAN SELECTION */}
        <h2 style={styles.sectionTitle}>Elige tu plan</h2>
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isHovered = hoveredPlan === plan.id;
          return (
            <div
              key={plan.id}
              style={styles.planCard(plan, isSelected, isHovered)}
              onClick={() => setSelectedPlan(plan.id)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div style={styles.popularBadge(plan.color)}>🔥 MÁS POPULAR</div>
              )}
              <div style={styles.radioCircle(isSelected, plan.color)}>
                {isSelected && <div style={styles.radioDot} />}
              </div>
              <div>
                <div style={styles.planLabel}>{plan.label}</div>
                <div style={styles.planDuration}>{plan.duration}</div>
                <div style={styles.planPriceDay(plan.color)}>{plan.pricePerDay}€/día</div>
              </div>
              <div style={styles.planPriceRight}>
                <div style={styles.planOriginal}>{plan.originalTotal}€</div>
                <div style={styles.planTotal}>{plan.total}€</div>
                <div style={styles.planDiscount(plan.color)}>{plan.discount}</div>
              </div>
            </div>
          );
        })}

        {/* ORDER SUMMARY */}
        <h2 style={styles.sectionTitle}>Resumen del pedido</h2>
        <div style={styles.summaryBox}>
          <div style={styles.summaryRow}>
            <span>Come Sano y Fácil — {currentPlan?.duration}</span>
            <span style={{ color: "#fff", fontWeight: "600" }}>{currentPlan?.originalTotal}€</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Descuento especial ({currentPlan?.discount})</span>
            <span style={{ color: "#2ec4b6", fontWeight: "700" }}>
              -{(parseFloat(currentPlan?.originalTotal) - parseFloat(currentPlan?.total)).toFixed(2)}€
            </span>
          </div>
          <div style={styles.summaryRow}>
            <span>Acceso inmediato</span>
            <span style={{ color: "#2ec4b6", fontWeight: "700" }}>GRATIS</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Recetas premium incluidas</span>
            <span style={{ color: "#2ec4b6", fontWeight: "700" }}>GRATIS</span>
          </div>
          <hr style={styles.summaryDivider} />
          <div style={styles.summaryTotal}>
            <span>Total hoy</span>
            <span style={{ color: "#ff6b35" }}>{currentPlan?.total}€</span>
          </div>
        </div>

        {/* PAYMENT FORM */}
        <h2 style={{ ...styles.sectionTitle, marginTop: "32px" }}>Datos de pago</h2>

        {/* Security badges */}
        <div style={styles.securityIcons}>
          <div style={styles.secIcon}><span>🔒</span><span>SSL 256bit</span></div>
          <div style={styles.secIcon}><span>💳</span><span>Pago seguro</span></div>
          <div style={styles.secIcon}><span>🛡️</span><span>30 días garantía</span></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>NOMBRE COMPLETO</label>
            <input
              type="text"
              placeholder="María García López"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((err) => ({ ...err, name: "" })); }}
              style={styles.input(!!errors.name)}
            />
            {errors.name && <p style={styles.errorMsg}>{errors.name}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>CORREO ELECTRÓNICO</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: "" })); }}
              style={styles.input(!!errors.email)}
            />
            {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
            <p style={{ fontSize: "11px", color: "#555", marginTop: "5px" }}>
              📧 Tu plan se enviará a este email
            </p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>NÚMERO DE TARJETA</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(formatCard(e.target.value));
                setErrors((err) => ({ ...err, cardNumber: "" }));
              }}
              style={styles.input(!!errors.cardNumber)}
              inputMode="numeric"
            />
            {errors.cardNumber && <p style={styles.errorMsg}>{errors.cardNumber}</p>}
          </div>

          <div style={styles.cardRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>CADUCIDAD</label>
              <input
                type="text"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={(e) => {
                  setCardExpiry(formatExpiry(e.target.value));
                  setErrors((err) => ({ ...err, cardExpiry: "" }));
                }}
                style={styles.input(!!errors.cardExpiry)}
                inputMode="numeric"
              />
              {errors.cardExpiry && <p style={styles.errorMsg}>{errors.cardExpiry}</p>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cardCvv}
                onChange={(e) => {
                  setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                  setErrors((err) => ({ ...err, cardCvv: "" }));
                }}
                style={styles.input(!!errors.cardCvv)}
                inputMode="numeric"
              />
              {errors.cardCvv && <p style={styles.errorMsg}>{errors.cardCvv}</p>}
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            style={styles.ctaBtn(hoveredBtn)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.spinner} />
                <span>Procesando pago...</span>
              </>
            ) : (
              <>
                <span>🔒</span>
                <span>PAGAR {currentPlan?.total}€ AHORA</span>
              </>
            )}
          </button>

          <div style={styles.guarantee}>
            <span>🛡️</span>
            <span>Garantía de devolución de 30 días sin preguntas</span>
          </div>

          {/* Card logos */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
            {["VISA", "Mastercard", "Amex", "PayPal"].map((c) => (
              <div key={c} style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                padding: "5px 10px",
                fontSize: "10px",
                fontWeight: "700",
                color: "#aaa",
              }}>{c}</div>
            ))}
          </div>
        </form>

        {/* BENEFITS */}
        <h2 style={styles.sectionTitle}>¿Qué incluye tu plan?</h2>
        <div style={styles.benefitsGrid}>
          {BENEFITS.map((b, i) => (
            <div key={i} style={styles.benefitCard}>
              <div style={styles.benefitIcon}>{b.icon}</div>
              <div style={styles.benefitTitle}>{b.title}</div>
              <div style={styles.benefitDesc}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* BEFORE/AFTER VISUALIZATION */}
        <div style={{
          background: "linear-gradient(135deg, rgba(108,99,255,0.1), rgba(255,107,53,0.1))",
          border: "1px solid rgba(108,99,255,0.2)",
          borderRadius: "16px",
          padding: "24px 20px",
          marginTop: "28px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "13px", color: "#a29ff5", fontWeight: "700", marginBottom: "16px", letterSpacing: "1px" }}>RESULTADOS TÍPICOS</p>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>😔</div>
              <div style={{ fontSize: "13px", color: "#888" }}>Antes</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>Cansada, sin energía</div>
            </div>
            <div style={{ fontSize: "28px", color: "#ff6b35" }}>→</div>
            <div>
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>😄</div>
              <div style={{ fontSize: "13px", color: "#888" }}>Después</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2ec4b6" }}>-8 kg en 2 meses</div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <h2 style={{ ...styles.sectionTitle, marginTop: "32px" }}>Lo que dicen nuestras clientas</h2>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={styles.testimonialCard}>
            <div style={styles.testimonialHeader}>
              <div style={styles.avatarCircle(t.color)}>{t.avatar}</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", marginBottom: "3px" }}>{t.name}</div>
                <div style={styles.stars}>{"★".repeat(t.stars)}</div>
              </div>
              <div style={styles.kgBadge(t.color)}>{t.kg}</div>
            </div>
            <p style={styles.testimonialText}>"{t.text}"</p>
          </div>
        ))}

        {/* FAQ */}
        <h2 style={{ ...styles.sectionTitle, marginTop: "32px" }}>Preguntas frecuentes</h2>
        {[
          { q: "¿Cuándo recibo mi plan?", a: "Inmediatamente después del pago. Te enviamos acceso completo a tu email." },
          { q: "¿Funciona sin hacer ejercicio?", a: "Sí. El plan está diseñado para perder peso principalmente a través de la alimentación, aunque el ejercicio acelera los resultados." },
          { q: "¿Es apto para veganas/vegetarianas?", a: "¡Sí! Al completar el cuestionario, personalizamos el plan según tus preferencias alimentarias." },
          { q: "¿Qué pasa si no me gusta?", a: "Ofrecemos garantía total de 30 días. Si no estás satisfecha, te devolvemos el dinero sin preguntas." },
        ].map((faq, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "16px 18px",
            marginBottom: "10px",
          }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
              ❓ {faq.q}
            </div>
            <div style={{ fontSize: "13px", color: "#aaa", lineHeight: "1.6" }}>{faq.a}</div>
          </div>
        ))}

        {/* FINAL CTA */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(247,147,30,0.08))",
          border: "1px solid rgba(255,107,53,0.25)",
          borderRadius: "20px",
          padding: "28px 20px",
          marginTop: "32px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎯</div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "10px", color: "#fff" }}>
            ¿Lista para empezar?
          </h3>
          <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.6", marginBottom: "20px" }}>
            Más de <strong style={{ color: "#ff6b35" }}>50.000 mujeres</strong> ya han transformado su alimentación con Come Sano y Fácil. ¡Tú eres la siguiente!
          </p>
          <button
            style={{
              ...styles.ctaBtn(false),
              marginBottom: "0",
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span>🔒</span>
            <span>EMPEZAR AHORA — {currentPlan?.total}€</span>
          </button>
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "18px", fontWeight: "800", color: "#ff6b35", marginBottom: "12px" }}>
            Come Sano y Fácil
          </p>
          <p style={{ fontSize: "11px", color: "#444", lineHeight: "1.7" }}>
            © 2024 Come Sano y Fácil. Todos los derechos reservados.
            <br />
            Los resultados pueden variar según cada persona.
            <br />
            <span style={{ color: "#555" }}>Política de privacidad · Términos y condiciones · Contacto</span>
          </p>
          {/* TODO: Añadir enlaces reales a política de privacidad y términos */}
          {/* TODO: Añadir página de contacto y soporte al cliente */}
        </div>

      </div>
    </div>
  );
}