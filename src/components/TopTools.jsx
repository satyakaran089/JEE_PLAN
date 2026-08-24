import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const quotes = ['Keep going — your hard work compounds.', 'Aaj ka focused session, kal ka strong result.', 'Discipline beats motivation when motivation fades.', 'Small chapters completed daily create big ranks.']
const pad = n => String(n).padStart(2, '0')
const formatTime = ms => `${pad(Math.floor(ms / 3600000))}:${pad(Math.floor(ms / 60000) % 60)}:${pad(Math.floor(ms / 1000) % 60)}`

export default function TopTools() {
  const [target, setTarget] = useLocalStorage('jee_countdown_date', '')
  const [quote, setQuote] = useState(0)
  const [timer, setTimer] = useLocalStorage('jee_stopwatch', { elapsed: 0, running: false, startedAt: null })
  const [now, setNow] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const [url, setUrl] = useLocalStorage('jee_study_video', '')

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 250); return () => clearInterval(id) }, [])
  useEffect(() => { const id = setInterval(() => setQuote(q => (q + 1) % quotes.length), 60000); return () => clearInterval(id) }, [])
  const elapsed = timer.elapsed + (timer.running ? now - timer.startedAt : 0)
  const days = target && now ? Math.max(0, Math.ceil((new Date(`${target}T23:59:59`) - now) / 86400000)) : 14
  const toggle = () => setTimer(t => t.running ? { ...t, elapsed: t.elapsed + Date.now() - t.startedAt, running: false, startedAt: null } : { ...t, running: true, startedAt: Date.now() })
  const embedUrl = url.includes('youtu') ? `https://www.youtube.com/embed/${(url.match(/(?:v=|youtu.be\/)([^&?/]+)/) || [])[1] || ''}` : url

  return <>
    <section className="top-tools panel">
      <div><small>⏳ COUNTDOWN</small><strong>{days} days</strong><input type="date" value={target} onChange={e => setTarget(e.target.value)} /></div>
      <div className="quote"><small>✨ MOTIVATION</small><span>{quotes[quote]}</span><button className="icon-button" onClick={() => setQuote(q => (q + 1) % quotes.length)}>↻</button></div>
      <div><small>🎥 STUDY STREAM</small><button onClick={() => setVideoOpen(true)}>Add / Play</button></div>
      <div><small>⏱️ STOPWATCH</small><strong className="timer">{formatTime(elapsed)}</strong><button onClick={toggle}>{timer.running ? 'Pause' : 'Start'}</button><button className="danger" onClick={() => setTimer({ elapsed: 0, running: false, startedAt: null })}>Reset</button></div>
    </section>
    {videoOpen && <div className="modal-backdrop" onClick={() => setVideoOpen(false)}><div className="modal panel" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setVideoOpen(false)}>×</button><h3>Study Stream</h3><input placeholder="Paste YouTube/video URL" value={url} onChange={e => setUrl(e.target.value)} />{embedUrl && <iframe title="Study stream" src={embedUrl} allowFullScreen />}</div></div>}
  </>
}
