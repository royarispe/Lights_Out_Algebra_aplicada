def crear_matriz_adyacencia(n):
    """
    Construye la matriz que modela, para cada casilla, qué casillas son afectadas cuando se enciende una luz en un tablero.
    Cada fila/columna representa una luz del tablero.
    Recordemos que si se enciende una luz, también se encienden las luces adyacentes a esa luz (arriba, abajo, izquierda, derecha).
    """
    tam = n * n
    # Inicializamos la matriz de ceros
    A = []
    for i in range(tam):
        fila = []
        for j in range(tam):
            fila.append(0)
        A.append(fila)
    # Buscamos la luz presionada y sus adyacentes, asignándoles el valor a 1
    for fila in range(n):
        for columna in range(n):
            ind = fila * n + columna
            A[ind][ind] = 1  #Asignamos a 1 la luz presionada
            if fila > 0:
                A[(fila-1)*n + columna][ind] = 1  # Adyacente arriba
            if fila < n-1:
                A[(fila+1)*n + columna][ind] = 1  # Adyacente abajo
            if columna > 0:
                A[fila*n + (columna-1)][ind] = 1  # Adyacente izquierdo
            if columna < n-1:
                A[fila*n + (columna+1)][ind] = 1  # Adyacente derecho
    return A

def tablero_a_vector(tablero):
    """
    Pasa la matriz del tablero a un vector plano, para trabajar algebraicamente.
    La posición i representa el estado (prendida/apagada) de la luz i.
    """
    vector = []
    for i in range(len(tablero)):
        for j in range(len(tablero[i])):
            vector.append(tablero[i][j])
    return vector

def construir_aumentada(A, b):
    """
    Une la matriz de adyacencia A y el vector de estado b en una matriz aumentada lista para aplicar Gauss-Jordan.
    """
    aumentada = []
    for i in range(len(A)):
        fila = []
        for j in range(len(A[i])):
            fila.append(A[i][j])
        fila.append(b[i])
        aumentada.append(fila)
    return aumentada

def gauss_jordan_z2(aumentada):
    """
    Implementa el método de eliminación de Gauss-Jordan adaptado a operaciones módulo 2.
    La idea es transformar la matriz aumentada en una forma donde se pueda leer la solución directamente.
    Solo se suman filas (nunca multiplicar/dividir ni intercambiar, salvo traer la fila con pivote al lugar correcto, esto lo hacemos para
    asegurarnos de que el pivote quede siempre en la diagonal de la matriz aumentada).
    """
    tam = len(aumentada)
    for columna in range(tam):
        #Le asignamos al pivote el valor de -1, ya que inicialmente no tenemos pivote
        pivote = -1
        #Buscamos en la columna actual si hay alguna fila más abajo con un 1 (este va a ser nuestro pivote)
        for fila in range(columna, tam):
            if aumentada[fila][columna] == 1:
                pivote = fila
                break
        #Si no encontramos un pivote en la columna, seguimos a la siguiente columna
        if pivote == -1:
            continue
        #Si el pivote no está en la posición que queremos (diagonal), lo subimos intercambiando filas
        if pivote != columna:
            temp = aumentada[columna]
            aumentada[columna] = aumentada[pivote]
            aumentada[pivote] = temp
        #Usamos el pivote para anular todos los 1 de la columna, excepto el propio
        for fila in range(tam):
            if fila != columna and aumentada[fila][columna] == 1:
                for j in range(tam+1):
                    # Usamos XOR (^) porque es suma en binario (0+1=1, 1+1=0)
                    aumentada[fila][j] ^= aumentada[columna][j]
    return aumentada

def extraer_solucion(aumentada, tam):
    """
    Lee del sistema reducido la solución: si alguna fila está compuesta solo por ceros salvo el último elemento, y ese es 1, el sistema es inconsistente (sin solución).
    Si no, la última columna contiene la solución al juego (qué luces se deben presionar).
    """
    for fila in range(tam):
        es_cero = True
        for j in range(tam):
            if aumentada[fila][j] != 0:
                es_cero = False
                break
        # Si toda la fila es cero salvo el último elemento y ese es 1, es imposible tener solución, por ende la solución es inválida
        if es_cero and aumentada[fila][tam] == 1:
            return None
    solucion = []
    for i in range(tam):
        solucion.append(aumentada[i][tam])
    return solucion

def resolver_lights_out(tablero):
    """
     Verifica si el tablero es válido, y luego utiliza las funciones auxiliares para: validar dimensiones, valores válidos, armar el sistema, resolverlo,
     y devolver la solución.
    """
    if not tablero or not tablero[0]:
        return []
    n = len(tablero)
    #Chequea que el tablero sea cuadrado, y que tenga solo 0s y 1s (estado válido)
    for i in range(n):
        if len(tablero[i]) != n:
            raise ValueError("El tablero debe ser cuadrado")
        for j in range(n):
            if tablero[i][j] not in (0, 1):
                raise ValueError("Solo se permiten valores 0 o 1 en el tablero")
    #Construimos el sistema matemático
    A = crear_matriz_adyacencia(n)
    b = tablero_a_vector(tablero)
    aumentada = construir_aumentada(A, b)
    gauss_jordan_z2(aumentada)
    return extraer_solucion(aumentada, n * n)

def simular_presionar(tablero, presionadas):
    """
    Simula físicamente el resultado de presionar los botones indicados, sumando el efecto sobre el tablero.
    Al presionar una luz, ella y sus adyacentes cambian de estado (0->1, 1->0).
    """
    n = len(tablero)
    resultado = []
    for fila in tablero:
        nueva_fila = []
        for valor in fila:
            nueva_fila.append(valor)
        resultado.append(nueva_fila)
    for i in range(len(presionadas)):
        if presionadas[i] == 1:
            fila = i // n
            columna = i % n
            # Lista de posiciones a "togglear" (ella y vecinos inmediatos)
            posiciones = [(fila, columna)]
            if fila > 0:
                posiciones.append((fila-1, columna))
            if fila < n-1:
                posiciones.append((fila+1, columna))
            if columna > 0:
                posiciones.append((fila, columna-1))
            if columna < n-1:
                posiciones.append((fila, columna+1))
            # Cambiar el estado a todas las posiciones seleccionadas
            for f, c in posiciones:
                resultado[f][c] ^= 1
    return resultado