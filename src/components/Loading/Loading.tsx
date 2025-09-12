'use client';

export default function Loading() {
  return (
    <>
      <div className="container">
        <div className="spinner">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: black;
        }

        .spinner {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          border: 3px solid transparent;
        }

        .circle1 {
          width: 120px;
          height: 120px;
          border-top-color: #ff00ff;
          border-right-color: #00ffe7;
          animation: spin1 3s linear infinite;
        }

        .circle2 {
          width: 90px;
          height: 90px;
          border-left-color: #00ffe7;
          border-bottom-color: #ff00ff;
          animation: spin2 5s linear infinite;
        }

        .circle3 {
          width: 60px;
          height: 60px;
          border-top-color: #ff00ff;
          border-left-color: #00ffe7;
          animation: spin3 7s linear infinite;
        }

        @keyframes spin1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes spin3 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* Glow эффект */
        .circle1, .circle2, .circle3 {
          box-shadow: 0 0 15px rgba(255,0,255,0.7), 0 0 30px rgba(0,255,231,0.7);
        }

        /* Адаптивность */
        @media (max-width: 640px) {
          .spinner {
            width: 80px;
            height: 80px;
          }
          .circle1 { width: 80px; height: 80px; }
          .circle2 { width: 60px; height: 60px; }
          .circle3 { width: 40px; height: 40px; }
        }
      `}</style>
    </>
  );
}
