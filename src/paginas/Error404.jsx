import React from 'react'
import { cambiarTituloPagina } from '../funciones_auxiliares/cambiarTituloPagina'

const Error404 = () => {
  cambiarTituloPagina("Error404")
  return (
    <>Error404</>
  )
}

export default Error404