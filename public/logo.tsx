const Logo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" className={className}>
    {/* Robot head */}
    <g transform="translate(8, 4)">
      {/* Head base - zaokrąglony kwadrat */}
      <rect x="2" y="8" width="24" height="26" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2"/>
      
      {/* Display/Screen */}
      <rect x="6" y="14" width="16" height="8" rx="2" fill="#1D4ED8" opacity="0.1"/>
      
      {/* Eyes - digital style */}
      <rect x="8" y="16" width="4" height="4" rx="1" fill="#1D4ED8">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
      </rect>
      <rect x="16" y="16" width="4" height="4" rx="1" fill="#1D4ED8">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
      </rect>
      
      {/* Antenna z kulką */}
      <line x1="14" y1="8" x2="14" y2="4" stroke="#1D4ED8" strokeWidth="2"/>
      <circle cx="14" cy="3" r="2" fill="#1D4ED8"/>
      
      {/* Digital smile */}
      <path d="M8 26 L10 28 L18 28 L20 26" stroke="#1D4ED8" strokeWidth="2" fill="none"/>
    </g>
    
    {/* Text "ResumeBOT" - closer together */}
    <text x="42" y="32" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="600" letterSpacing="-0.5">
      <tspan fill="#1E293B">Resume</tspan><tspan fill="#1D4ED8">BOT</tspan>
    </text>
  </svg>
);

export default Logo;
