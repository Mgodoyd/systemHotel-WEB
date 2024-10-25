import React from 'react'
import ShowHabitacion from '../Menu/showHabitacion'
import Muestra from '../../funtions/Muestra'
import Testimonios from '../../funtions/Testimonios'
import Contacto from '../../funtions/Contacto '
const Inicio = () => {
  return (
    <div>

        <div>
           <Muestra></Muestra>
        </div>
        <div>
            <ShowHabitacion>

            </ShowHabitacion>
        </div>
        <div>
           <Testimonios></Testimonios>
        </div>
        <div>
          <Contacto></Contacto>

        </div>
    </div>
  )
}

export default Inicio