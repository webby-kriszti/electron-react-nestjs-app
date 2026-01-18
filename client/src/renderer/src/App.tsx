import { useState, useEffect, ReactElement } from 'react'


function App(): ReactElement {
  const [message, setMessage] = useState('Kapcsolódás a szerverhez...')

  useEffect(() => {
    // Itt szólítjuk meg a NestJS-t a 3000-es porton
    fetch('http://127.0.0.1:3000')
      .then((response) => response.text())
      .then((data) => setMessage(data)) // Ha sikerül, beírjuk az üzenetet
      .catch((error) => setMessage('Hiba történt: ' + error))
  }, [])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Rendszer Teszt</h1>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      >
        <h3>Szerver válasza:</h3>
        <p style={{ fontSize: '24px', color: '#4caf50' }}>{message}</p>
      </div>
    </div>
  )
}

export default App
