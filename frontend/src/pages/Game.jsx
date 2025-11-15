import { useState } from "react";

function Game() {
  const [n, setN] = useState(3);
  const [tablero, setTablero] = useState([]);
  const [movimientos, setMovimientos] = useState(0);
  const [victoria, setVictoria] = useState(false);
  const [loading, setLoading] = useState(false);

  const generarNuevoTablero = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lights-out-algebra-aplicada.onrender.com/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ n }),
      });
      const data = await res.json();
      setTablero(data.tablero);
      setMovimientos(0);
      setVictoria(false);
    } catch (error) {
      console.error("Error al generar tablero:", error);
    } finally {
      setLoading(false);
    }
  };

  const presionarCasilla = async (fila, columna) => {
    if (victoria) return;
    
    try {
      const res = await fetch("https://lights-out-algebra-aplicada.onrender.com/presionar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tablero, fila, columna }),
      });
      const data = await res.json();
      setTablero(data.tablero);
      setMovimientos(prev => prev + 1);
      
      // Verificar victoria
      const resVictoria = await fetch("https://lights-out-algebra-aplicada.onrender.com/victoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tablero: data.tablero }),
      });
      const dataVictoria = await resVictoria.json();
      if (dataVictoria.victoria) {
        setVictoria(true);
      }
    } catch (error) {
      console.error("Error al presionar casilla:", error);
    }
  };

  const reiniciarJuego = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lights-out-algebra-aplicada.onrender.com/reiniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ n }),
      });
      const data = await res.json();
      setTablero(data.tablero);
      setMovimientos(0);
      setVictoria(false);
    } catch (error) {
      console.error("Error al reiniciar:", error);
    } finally {
      setLoading(false);
    }
  };

  const cellSize = n <= 5 ? 70 : 50;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    headerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    subtitle: {
      color: '#c7d2fe',
      fontSize: '18px',
      margin: 0
    },
    gameIcon: {
      fontSize: '40px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '32px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    controlsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    label: {
      color: 'white',
      fontWeight: '500',
      fontSize: '18px'
    },
    input: {
      width: '80px',
      padding: '8px 16px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid #818cf8',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      outline: 'none'
    },
    button: {
      padding: '10px 24px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
      transition: 'all 0.3s ease'
    },
    resetButton: {
      padding: '10px 24px',
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
      transition: 'all 0.3s ease'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    },
    statBox: {
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '12px',
      padding: '16px 32px',
      textAlign: 'center',
      minWidth: '150px'
    },
    statLabel: {
      color: '#c7d2fe',
      fontSize: '14px',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    statValue: {
      color: 'white',
      fontSize: '32px',
      fontWeight: 'bold'
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    cell: {
      borderRadius: '12px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      position: 'relative',
      overflow: 'hidden'
    },
    victoryOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    victoryCard: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '24px',
      padding: '48px',
      textAlign: 'center',
      boxShadow: '0 20px 60px rgba(16, 185, 129, 0.5)',
      animation: 'scaleIn 0.5s ease-out'
    },
    victoryTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    victoryText: {
      fontSize: '24px',
      color: 'white',
      marginBottom: '32px'
    },
    victoryButton: {
      padding: '12px 32px',
      background: 'white',
      color: '#059669',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerFlex}>
            <span style={styles.gameIcon}>🎮</span>
            <h1 style={styles.title}>Lights Out Game</h1>
          </div>
          <p style={styles.subtitle}>¡Apaga todas las luces para ganar!</p>
        </div>

        {/* Controls */}
        <div style={styles.card}>
          <div style={styles.controlsContainer}>
            <label style={styles.label}>
              Tamaño del tablero:
            </label>
            <input
              type="number"
              value={n}
              min={2}
              max={7}
              onChange={(e) => setN(parseInt(e.target.value))}
              style={styles.input}
            />
            <button
              onClick={generarNuevoTablero}
              style={styles.button}
              disabled={loading}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              {loading ? '⏳ Generando...' : '🎲 Nuevo Juego'}
            </button>
            {tablero.length > 0 && (
              <button
                onClick={reiniciarJuego}
                style={styles.resetButton}
                disabled={loading}
                onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🔄 Reiniciar
              </button>
            )}
          </div>
        </div>

        {tablero.length > 0 && (
          <>
            {/* Stats */}
            <div style={styles.statsContainer}>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>Movimientos</div>
                <div style={styles.statValue}>{movimientos}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>Tamaño</div>
                <div style={styles.statValue}>{n}x{n}</div>
              </div>
            </div>

            {/* Tablero de Juego */}
            <div style={styles.card}>
              <div style={styles.gridContainer}>
                <div 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: `repeat(${n}, ${cellSize}px)`,
                    gap: "10px"
                  }}
                >
                  {tablero.map((fila, i) =>
                    fila.map((celda, j) => (
                      <div
                        key={`${i}-${j}`}
                        onClick={() => presionarCasilla(i, j)}
                        style={{
                          ...styles.cell,
                          width: cellSize,
                          height: cellSize,
                          background: celda 
                            ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" 
                            : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                          border: celda ? "3px solid #fef3c7" : "3px solid #334155",
                          boxShadow: celda 
                            ? "0 8px 32px rgba(251, 191, 36, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.3)" 
                            : "0 4px 10px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
                        }}
                        onMouseOver={(e) => {
                          if (!victoria) {
                            e.target.style.transform = 'scale(1.1) rotate(5deg)';
                            e.target.style.zIndex = '10';
                          }
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1) rotate(0deg)';
                          e.target.style.zIndex = '1';
                        }}
                      >
                        {celda && (
                          <span style={{ 
                            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                            animation: 'pulse 2s ease-in-out infinite'
                          }}>
                            💡
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Pantalla de Victoria */}
        {victoria && (
          <div style={styles.victoryOverlay} onClick={() => setVictoria(false)}>
            <div style={styles.victoryCard} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎉</div>
              <h2 style={styles.victoryTitle}>¡Victoria!</h2>
              <p style={styles.victoryText}>
                Completaste el puzzle en <strong>{movimientos}</strong> movimientos
              </p>
              <button
                onClick={generarNuevoTablero}
                style={styles.victoryButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🎲 Jugar de Nuevo
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default Game;