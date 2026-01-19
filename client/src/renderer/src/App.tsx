import { ReactElement, useState } from 'react'
import { WeatherData } from '../../../../api/src/weatherModule/weather.service'

function App(): ReactElement {
  const [nev, setNev] = useState('') // Itt tároljuk, amit beírsz
  const [valasz, setValasz] = useState('Itt jelenik meg a válasz...')
  const [weatherDatas, setWeatherDatas] = useState<WeatherData[]>([])
  const [frequency, setFrequency] = useState(10)

  // Ez a függvény fut le, ha megnyomod a gombot
  const kuldes = async (): Promise<void> => {
    try {
      const response = await fetch('http://127.0.0.1:3000/koszonj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nev: nev }) // Itt küldjük el a nevet JSON-ként
      })

      const data = await response.text()
      setValasz(data) // A választ kiírjuk
    } catch (error) {
      setValasz(`Error: ${error}`)
    }
  }
  const getWeatherData = async (): Promise<void> => {
    try {
      const result = await fetch('http://127.0.0.1:3000/weather/measurements', {
        method: 'Get'
      })
      if (!result.ok) {
        throw new Error(`Hiba történt: ${result.status}`)
      }
      const data = await result.json()
      console.log(data)
      setWeatherDatas(data)
    } catch (error) {
      console.error(error)
    }
  }
  const sendFrequency = async (): Promise<void> => {
    try {
      const result = await window.api.sendFrequency(frequency)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      <h1>Üdvözlő Gép</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Írd ide a neved..."
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none' }}
        />

        <button
          onClick={kuldes}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginLeft: '10px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Küldés
        </button>
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '10px',
          border: '1px solid #555'
        }}
      >
        <h3>Szerver üzenete:</h3>
        <p style={{ fontSize: '20px', color: '#61dafb' }}>{valasz}</p>
      </div>
      <div>
        <button onClick={getWeatherData}>get saved weather data</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Mérési napló:</h3>

        {/* Itt járjuk be a listát */}
        {weatherDatas.map((data) => (
          <div key={data.id} style={{ borderBottom: '1px solid #555', padding: '10px' }}>
            <strong>Idő:</strong> {data.time} <br />
            <strong>Hőfok:</strong> {data.temperature} °C <br />
            <strong>Pára:</strong> {data.humidity} %
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="enter data"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
        ></input>
        <button onClick={sendFrequency}>send</button>
      </div>
    </div>
  )
}

export default App
