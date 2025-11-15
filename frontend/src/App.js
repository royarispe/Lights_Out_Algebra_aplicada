import { useState } from "react";
import Game from "./pages/Game";
import Solver from "./pages/Solver";

function App() {
  const [mode, setMode] = useState(null);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    welcomeCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '64px 48px',
      maxWidth: '800px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center'
    },
    header: {
      marginBottom: '48px'
    },
    icon: {
      fontSize: '80px',
      marginBottom: '24px',
      display: 'block'
    },
    title: {
      fontSize: '56px',
      fontWeight: 'bold',
      color: 'white',
      margin: '0 0 16px 0',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
    },
    subtitle: {
      fontSize: '20px',
      color: '#c7d2fe',
      margin: 0,
      lineHeight: '1.6'
    },
    optionsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '48px'
    },
    optionCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '40px 24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    },
    optionCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
      border: '2px solid rgba(255, 255, 255, 0.3)'
    },
    optionIcon: {
      fontSize: '64px',
      marginBottom: '16px',
      display: 'block'
    },
    optionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      margin: '0 0 12px 0'
    },
    optionDescription: {
      fontSize: '16px',
      color: '#c7d2fe',
      margin: 0,
      lineHeight: '1.5'
    },
    backButton: {
      position: 'fixed',
      top: '24px',
      left: '24px',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    gameGradient: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    solverGradient: {
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
    }
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  if (mode === 'game') {
    return (
      <>
        <button
          style={styles.backButton}
          onClick={() => setMode(null)}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ← Volver al menú
        </button>
        <Game />
      </>
    );
  }

  if (mode === 'solver') {
    return (
      <>
        <button
          style={styles.backButton}
          onClick={() => setMode(null)}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ← Volver al menú
        </button>
        <Solver />
      </>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcomeCard}>
        <div style={styles.header}>
          <span style={styles.icon}>💡</span>
          <h1 style={styles.title}>Lights Out</h1>
          <p style={styles.subtitle}>
            Bienvenido al clásico puzzle de luces.<br />
            Elige tu modo de juego para comenzar.
          </p>
        </div>

        <div style={styles.optionsContainer}>
          {/* Opción Jugar */}
          <div
            style={{
              ...styles.optionCard,
              ...(hoveredCard === 'game' ? styles.optionCardHover : {})
            }}
            onClick={() => setMode('game')}
            onMouseEnter={() => setHoveredCard('game')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                ...styles.gameGradient,
                opacity: hoveredCard === 'game' ? 0.2 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={styles.optionIcon}>🎮</span>
              <h2 style={styles.optionTitle}>Jugar</h2>
              <p style={styles.optionDescription}>
                Desafía tu mente resolviendo el puzzle. Apaga todas las luces para ganar.
              </p>
            </div>
          </div>

          {/* Opción Resolver */}
          <div
            style={{
              ...styles.optionCard,
              ...(hoveredCard === 'solver' ? styles.optionCardHover : {})
            }}
            onClick={() => setMode('solver')}
            onMouseEnter={() => setHoveredCard('solver')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                ...styles.solverGradient,
                opacity: hoveredCard === 'solver' ? 0.2 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={styles.optionIcon}>⚡</span>
              <h2 style={styles.optionTitle}>Resolver</h2>
              <p style={styles.optionDescription}>
                Encuentra la solución óptima para cualquier configuración del tablero.
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '48px', 
          paddingTop: '32px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '14px', 
            margin: 0 
          }}>
            💡 Lógica: En el juego, cada vez que presionas una luz, ella y sus adyacentes cambian de estado
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default App;