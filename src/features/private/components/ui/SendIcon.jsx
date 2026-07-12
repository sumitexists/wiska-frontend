export default function SendIcon({ className = "w-6 h-6 text-cyan-400" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <defs>
        {/* The Mask acts as a cookie-cutter to punch transparent lines through the solid black shapes */}
        <mask id="send-cutout">
          <rect width="24" height="24" fill="white" />
          
          {/* Envelope V-Flap Cutout */}
          <path 
            d="M 4 14 L 12 18 L 20 14" 
            stroke="black" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinejoin="round" 
            strokeLinecap="round" 
          />
          
          {/* Paper Plane Fold Cutout */}
          <path 
            d="M 16 5.5 L 23 3" 
            stroke="black" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" 
          />
        </mask>
      </defs>

      <g fill="currentColor">
        {/* 1. The Dashed Flight Path */}
        <path
          d="M 3 18 C -3 17, -2 5, 11 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3 5" // Creates the pill-shaped dashes from your image
          strokeLinecap="round"
        />

        {/* 2. The Solid Shapes (with the mask applied to cut out the details) */}
        <g mask="url(#send-cutout)">
            
          {/* The Envelope */}
          <rect x="4" y="11" width="16" height="10" rx="1.5" />
          
          {/* The Paper Airplane */}
          <path 
            d="M 11 1.5 L 23 3 L 16 11 L 16 5.5 Z" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinejoin="round" 
          />
          
        </g>
      </g>
    </svg>
  );
}