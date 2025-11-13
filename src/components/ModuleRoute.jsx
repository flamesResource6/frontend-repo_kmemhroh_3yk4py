import React from 'react'
import { useParams } from 'react-router-dom'
import ModulePage from './ModulePage'

export default function ModuleRoute() {
  const { id } = useParams()
  return <ModulePage moduleId={id} />
}
