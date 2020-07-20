import React from 'react'
import styles from './App.module.css'
import { bind } from './core/utils/bind'
import { RouterApp } from './core/components/router-app/router-app'

const cx = bind(styles)

function App() {
  return <RouterApp></RouterApp>
}

export default App
