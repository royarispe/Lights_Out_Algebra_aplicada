from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from api import lightsOut

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TableroRequest(BaseModel):
    tablero: list[list[int]]

class PresionarRequest(BaseModel):
    tablero: list[list[int]]
    fila: int
    columna: int

class NuevoTableroRequest(BaseModel):
    n: int

# ==============================================================================================================
# SOLVER
# ==============================================================================================================

@app.post("/resolver")
def resolver_tablero(req: TableroRequest):
    tablero = req.tablero

    try:
        solucion = lightsOut.resolver_lights_out(tablero)
    except Exception as e:
        return {"error": str(e)}

    if solucion is None:
        return {"solucion": None}

    tablero_final = lightsOut.simular_presionar(tablero, solucion)

    n = len(tablero)
    return {
        "solucion_vector": solucion,
        "solucion_tablero": [
            solucion[i:i+n] for i in range(0, len(solucion), n)
        ],
        "final": tablero_final
    }


# ==============================================================================================================
# JUEGO
# ==============================================================================================================

@app.post("/nuevo")
def nuevo_tablero(req: NuevoTableroRequest):
    tablero = lightsOut.generar_tablero(req.n)
    return {"tablero": tablero}

@app.post("/presionar")
def presionar(req: PresionarRequest):
    tablero_mod = lightsOut.presionar_casilla(req.tablero, req.fila, req.columna)
    return {"tablero": tablero_mod}

@app.post("/victoria")
def victoria(req: TableroRequest):
    win = lightsOut.tablero_completo_apagado(req.tablero)
    return {"victoria": win}

@app.post("/reiniciar")
def reiniciar(req: NuevoTableroRequest):
    tablero = lightsOut.reiniciar_juego(req.n)
    return {"tablero": tablero}
