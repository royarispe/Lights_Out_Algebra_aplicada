import unittest
import lightsOut


class TestLightsOut(unittest.TestCase):

    # Como pueden haber varias soluciones equivalentes en los casos que no son bordes, solo se chequea el tablero final
    def test_todo_apagado(self):
        tablero = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        aplicado = lightsOut.simular_presionar(tablero, solucion)
        self.assertEqual(aplicado, tablero)

    def test_solucion_enunciado(self):
        tablero = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1]
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        final = lightsOut.simular_presionar(tablero, solucion)
        esperado = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
        self.assertEqual(final, esperado)

    def test_3x3_dos_luces(self):
        tablero = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1]
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        final = lightsOut.simular_presionar(tablero, solucion)
        esperado = [[0,0,0],[0,0,0],[0,0,0]]
        self.assertEqual(final, esperado)

    def test_3x3_cuatro_centro(self):
        tablero = [
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1]
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        final = lightsOut.simular_presionar(tablero, solucion)
        esperado = [[0,0,0],[0,0,0],[0,0,0]]
        self.assertEqual(final, esperado)

    def test_4x4_cuadrado_fronteras(self):
        tablero = [
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        final = lightsOut.simular_presionar(tablero, solucion)
        esperado = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
        self.assertEqual(final, esperado)

    def test_4x4_cuadrado_centro(self):
        tablero = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNotNone(solucion)
        final = lightsOut.simular_presionar(tablero, solucion)
        esperado = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
        self.assertEqual(final, esperado)

    def test_sin_solucion(self):
        tablero = [
            [1,0,1],
            [0,1,0],
            [1,0,1]
        ]
        solucion = lightsOut.resolver_lights_out(tablero)
        self.assertIsNone(solucion)

if __name__ == '__main__':
    unittest.main()
