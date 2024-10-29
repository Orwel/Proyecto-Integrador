import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/navbar'
import { Card } from './components/card'


function App() {
 

  if (loading) return <p>Cargando destinos...</p>; // Mensaje de carga
  if (error) return <p>Error al cargar destinos: {error.message}</p>; // Manejo de errores

  return (
    <>
        <section className='section01'>
          <h2>Encuentra tu Estilo, explora el Mundo...</h2>
          <nav>
            <a href="">
              Aventura
            </a>

            <a href="">
              Cultura
            </a>
            <a href="">
              Tours
            </a>
            <a href="">
              Naturaleza
            </a>
            <a href="">
              Bienestar
            </a>
          </nav>

         
        </section>

        <section>

        </section>

        <section>

        </section>
     hola mundo
    </>
  )
}

export default App
