import { useMemo, useState } from 'react'

const subjects = ['Physics', 'Chemistry', 'Mathematics']
const statuses = ['Not Started', 'In Progress', 'Completed']
const pyqOptions = ['None', 'Started', 'Completed']

export default function SyllabusTracker({ syllabus, setSyllabus }) {
  const [subject, setSubject] = useState('Physics')
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('High')
  const chapters = syllabus[subject] || []
  const stats = useMemo(() => {
    const all = Object.values(syllabus).flat()
    const completed = all.filter(c => c.theory === 'Completed').length
    return { total: all.length, completed, progress: all.filter(c => c.theory === 'In Progress').length, percentage: all.length ? Math.round(completed / all.length * 100) : 0 }
  }, [syllabus])
  const update = (id, field, value) => setSyllabus(all => ({ ...all, [subject]: all[subject].map(c => c.id === id ? { ...c, [field]: value } : c) }))
  const add = () => { if (!name.trim()) return; setSyllabus(all => ({ ...all, [subject]: [...all[subject], { id: crypto.randomUUID(), name: name.trim(), weight, theory: 'Not Started', module: 0, cengage: 0, pyq: 'None', revision: 0, score: '', final: false }] })); setName('') }
  const remove = id => { if (window.confirm('Delete this chapter?')) setSyllabus(all => ({ ...all, [subject]: all[subject].filter(c => c.id !== id) })) }

  return <>
    <section className="stats-grid">{[['◈', 'Total Chapters', stats.total], ['✓', 'Completed Chapters', stats.completed], ['↗', 'In Progress', stats.progress], ['◎', 'Syllabus Completion', `${stats.percentage}%`]].map(([icon, label, value]) => <div className="panel stat" key={label}><div className="stat-top"><span>{icon}</span><small>{label}</small></div><strong>{value}</strong>{label === 'Syllabus Completion' && <div className="progress"><i style={{ width: `${stats.percentage}%` }} /></div>}</div>)}</section>
    <section className="panel syllabus-panel">
      <div className="syllabus-heading"><div><p className="eyebrow">STUDY BLUEPRINT</p><h2>Chapter tracker</h2><small>Update your preparation live, one chapter at a time.</small></div><div className="subject-count"><strong>{chapters.length}</strong><small>chapters in {subject}</small></div></div>
      <div className="tabs">{subjects.map(item => <button key={item} className={subject === item ? 'active' : ''} onClick={() => setSubject(item)}><span>{item === 'Physics' ? '⚛' : item === 'Chemistry' ? '⚗' : '∑'}</span>{item}</button>)}</div>
      <div className="quick-add"><input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Chapter name (e.g. Kinematics)" /><select value={weight} onChange={e => setWeight(e.target.value)}>{['High', 'Medium', 'Low'].map(x => <option key={x}>{x}</option>)}</select><button onClick={add}>+ Add to {subject}</button></div>
      <div className="table-wrap"><table><thead><tr><th>Chapter / Unit</th><th>Weightage</th><th>Theory status</th><th>Module Qs %</th><th>PYQs</th><th>Cengage %</th><th>Final</th><th>Revisions</th><th>Mock score %</th><th /></tr></thead><tbody>{chapters.map(c => <tr key={c.id}><td><input value={c.name} onChange={e => update(c.id, 'name', e.target.value)} /></td><td><select value={c.weight} onChange={e => update(c.id, 'weight', e.target.value)}>{['High', 'Medium', 'Low'].map(x => <option key={x}>{x}</option>)}</select></td><td><select value={c.theory} onChange={e => update(c.id, 'theory', e.target.value)}>{statuses.map(x => <option key={x}>{x}</option>)}</select></td><td><input type="number" min="0" max="100" value={c.module} onChange={e => update(c.id, 'module', +e.target.value)} /></td><td><select value={c.pyq} onChange={e => update(c.id, 'pyq', e.target.value)}>{pyqOptions.map(x => <option key={x}>{x}</option>)}</select></td><td><input type="number" min="0" max="100" value={c.cengage} onChange={e => update(c.id, 'cengage', +e.target.value)} /></td><td><input aria-label="Final complete" type="checkbox" checked={c.final} onChange={e => update(c.id, 'final', e.target.checked)} /></td><td><input type="number" min="0" value={c.revision} onChange={e => update(c.id, 'revision', +e.target.value)} /></td><td><input type="number" min="0" max="100" value={c.score} onChange={e => update(c.id, 'score', e.target.value)} /></td><td><button className="danger icon-button" onClick={() => remove(c.id)}>×</button></td></tr>)}</tbody></table></div>
    </section>
  </>
}
