import { useState } from "react";

function Solver() {
  const [n, setN] = useState(3);
  const [tablero, setTablero] = useState([]);
  const [solucion, setSolucion] = useState(null);
  const [finalTablero, setFinalTablero] = useState(null);
  const [loading, setLoading] = useState(false);

  const crearTablero = () => {
    const nuevo = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => 0)
    );
    setTablero(nuevo);
    setSolucion(null);
    setFinalTablero(null);
  };

  const toggleCelda = (i, j) => {
    const copia = tablero.map(f => [...f]);
    copia[i][j] ^= 1;
    setTablero(copia);
  };

const resolver = async () => {
  setLoading(true);
  try {
    const res = await fetch("https://lights-out-algebra-aplicada.onrender.com/resolver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({ tablero }),
    });

    const data = await res.json();

    if (!data.solucion_tablero || data.solucion_tablero === null) {
      alert("⚠️ Este tablero NO tiene solución.");
      setSolucion(null);
      setFinalTablero(null);
      return; 
    }

    setSolucion(data.solucion_tablero);
    setFinalTablero(data.final);

  } catch (error) {
    console.error("Error al resolver:", error);
  } finally {
    setLoading(false);
  }
};

  const cellSize = n <= 5 ? 60 : 45;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e293b 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -Solverle-system, sans-serif'
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
      color: '#e9d5ff',
      fontSize: '18px',
      margin: 0
    },
    lightbulbIcon: {
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
      border: '2px solid #c084fc',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      outline: 'none'
    },
    button: {
      padding: '10px 24px',
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)',
      transition: 'all 0.3s ease'
    },
    solveButton: {
      padding: '12px 32px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '18px',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    cell: {
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold'
    },
    centerButton: {
      display: 'flex',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerFlex}>
            <span style={styles.lightbulbIcon}>💡</span>
            <h1 style={styles.title}>Lights Out Solver</h1>
          </div>
          <p style={styles.subtitle}>Resuelve el puzzle clásico con un solo click</p>
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
              onClick={crearTablero}
              style={styles.button}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              🔄 Crear Tablero
            </button>
          </div>
        </div>

        {tablero.length > 0 && (
          <div>
            {/* Tablero Principal */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>
                💡 Tablero Inicial
              </h2>
              <div style={styles.gridContainer}>
                <div 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: `repeat(${n}, ${cellSize}px)`,
                    gap: "8px"
                  }}
                >
                  {tablero.map((fila, i) =>
                    fila.map((celda, j) => (
                      <div
                        key={`${i}-${j}`}
                        onClick={() => toggleCelda(i, j)}
                        style={{
                          ...styles.cell,
                          width: cellSize,
                          height: cellSize,
                          background: celda 
                            ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" 
                            : "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                          border: celda ? "3px solid #fef3c7" : "3px solid #4b5563",
                          boxShadow: celda 
                            ? "0 4px 20px rgba(251, 191, 36, 0.5)" 
                            : "0 4px 10px rgba(0, 0, 0, 0.3)"
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        {celda && '💡'}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={styles.centerButton}>
                <button
                  onClick={resolver}
                  disabled={loading}
                  style={{
                    ...styles.solveButton,
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {loading ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>🔄</span>
                      Resolviendo...
                    </>
                  ) : (
                    <>
                      ⚡ Resolver Puzzle
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Solución */}
            {solucion && (
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  ⚡ Solución (Celdas a Presionar)
                </h2>
                <div style={styles.gridContainer}>
                  <div 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: `repeat(${n}, ${cellSize}px)`,
                      gap: "8px"
                    }}
                  >
                    {solucion.map((fila, i) =>
                      fila.map((celda, j) => (
                        <div
                          key={`sol-${i}-${j}`}
                          style={{
                            ...styles.cell,
                            width: cellSize,
                            height: cellSize,
                            background: celda 
                              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                              : "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
                            border: celda ? "3px solid #d1fae5" : "3px solid #9ca3af",
                            boxShadow: celda 
                              ? "0 4px 20px rgba(16, 185, 129, 0.5)" 
                              : "0 4px 10px rgba(0, 0, 0, 0.1)",
                            color: celda ? 'white' : '#6b7280',
                            cursor: 'default'
                          }}
                        >
                          {celda && '✓'}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tablero Final */}
            {finalTablero && (
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  🎯 Tablero Final
                </h2>
                <div style={styles.gridContainer}>
                  <div 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: `repeat(${n}, ${cellSize}px)`,
                      gap: "8px"
                    }}
                  >
                    {finalTablero.map((fila, i) =>
                      fila.map((celda, j) => (
                        <div
                          key={`fin-${i}-${j}`}
                          style={{
                            width: cellSize,
                            height: cellSize,
                            borderRadius: '8px',
                            background: celda 
                              ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" 
                              : "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                            border: celda ? "3px solid #fef3c7" : "3px solid #4b5563"
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Solver;