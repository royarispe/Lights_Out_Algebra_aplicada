import lightsOut

def mostrar_menu():
    print('--- Lights Out ---')
    print('1. Jugar')
    print('2. Salir')

def leer_tablero():
    n = int(input('Ingrese el tamaño del tablero (n): '))
    tablero = []
    print(f'Ingrese el tablero ({n} filas, valores separados por espacio, 0=apagado, 1=prendido):')
    for i in range(n):
        while True:
            fila_str = input(f'Fila {i+1}: ')
            fila = [int(x) for x in fila_str.strip().split() if x in "01"]
            if len(fila) != n or any(x not in (0, 1) for x in fila):
                print('Fila inválida. Ingrese exactamente', n, 'valores 0 o 1.')
            else:
                tablero.append(fila)
                break
    return tablero

def mostrar_matriz(mat):
    for fila in mat:
        print(' '.join(str(x) for x in fila))

def main():
    while True:
        mostrar_menu()
        opcion = input('Seleccione una opción: ')
        if opcion == '1':
            tablero = leer_tablero()
            print('\nTablero inicial:')
            mostrar_matriz(tablero)
            solucion = lightsOut.resolver_lights_out(tablero)
            if solucion is None:
                print('No existe solución para este tablero.')
                continue
            print('\nLuces que se deben presionar (vector flatten):')
            print(solucion)
            n = len(tablero)
            print('\nLuces que se deben presionar (como tablero):')
            for i in range(n):
                print(' '.join(str(solucion[j]) for j in range(i*n, (i+1)*n)))
            final = lightsOut.simular_presionar(tablero, solucion)
            print('\nTablero final tras presionar botones:')
            mostrar_matriz(final)
        elif opcion == '2':
            break
        else:
            print('Opción inválida')

if __name__ == '__main__':
    main()