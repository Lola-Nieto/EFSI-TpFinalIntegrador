import React from 'react'
import { useBudget } from '../hooks/useBudget.js'

export default function Ajustes() {
  const { settings, setTheme, reset } = useBudget()
  function toggleTheme() { setTheme(settings.theme === 'dark' ? 'light' : 'dark') }

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Ajustes</h2>

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18}}>
        <div>
          <div style={{fontWeight:600}}>Tema</div>
          <div className="helper">Activá/desactivá el modo oscuro.</div>
        </div>
        <button className="btn ghost" onClick={toggleTheme}>
          {settings.theme === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro'}
        </button>
      </div>

      <hr style={{border:'none', borderTop:'1px solid rgba(0,0,0,.08)', margin:'16px 0'}} />

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
        <div>
          <div style={{fontWeight:600}}>Limpieza de datos</div>
          <div className="helper">Resetea todos los movimientos guardados en el navegador.</div>
        </div>
        <button className="btn danger" onClick={()=>{
          if (confirm('Esto eliminará todos los movimientos del localStorage. ¿Continuar?')) reset()
        }}>
          Limpiar datos
        </button>
      </div>
    </div>
  )
}
