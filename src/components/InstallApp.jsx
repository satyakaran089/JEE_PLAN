import { useEffect, useState } from 'react'

export default function InstallApp() {
  const [installEvent, setInstallEvent] = useState(null)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const ready = event => { event.preventDefault(); setInstallEvent(event) }
    const complete = () => { setInstalled(true); setInstallEvent(null) }
    window.addEventListener('beforeinstallprompt', ready)
    window.addEventListener('appinstalled', complete)
    return () => { window.removeEventListener('beforeinstallprompt', ready); window.removeEventListener('appinstalled', complete) }
  }, [])

  const install = async () => {
    if (!installEvent) return
    installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  if (installed) return <span className="installed-badge">✓ Installed</span>
  return <button className="install-button" onClick={install} disabled={!installEvent} title={installEvent ? 'Install on your device' : 'Use your browser menu: Install app / Add to Home Screen'}>⌄ Install app</button>
}
