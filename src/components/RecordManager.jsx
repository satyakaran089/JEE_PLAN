import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const today = () => new Date().toISOString().slice(0, 10)
const fields = {
  tests: [{ key: 'date', type: 'date' }, { key: 'target', label: 'Target', type: 'number' }, { key: 'obtain', label: 'Obtained', type: 'number' }, { key: 'rank', label: 'Rank' }, { key: 'mistake', label: 'Mistakes / notes' }, { key: 'opponent', label: 'Opponent / notes' }],
  revisions: [{ key: 'date', type: 'date' }, { key: 'subject', label: 'Subject', options: ['Physics', 'Chemistry', 'Mathematics', 'Other'] }, { key: 'chapter', label: 'Chapter / topic' }, { key: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'] }, { key: 'notes', label: 'Notes' }],
  upcoming: [{ key: 'date', type: 'date' }, { key: 'name', label: 'Test name' }, { key: 'duration', label: 'Duration (e.g. 3h)' }, { key: 'marks', label: 'Total marks', type: 'number' }, { key: 'target', label: 'Target score', type: 'number' }, { key: 'notes', label: 'Notes' }],
}

export default function RecordManager({ type, title, description, storageKey }) {
  const columns = fields[type]
  const [records, setRecords] = useLocalStorage(storageKey, [])
  const [form, setForm] = useState({ date: today(), subject: 'Physics', priority: 'Medium' })
  const [editing, setEditing] = useState(null)
  const change = (key, value) => setForm(f => ({ ...f, [key]: value }))
  const save = () => {
    const record = { ...form, id: editing ?? crypto.randomUUID(), done: editing ? records.find(r => r.id === editing)?.done : false }
    setRecords(list => editing ? list.map(x => x.id === editing ? record : x) : [...list, record])
    setForm({ date: today(), subject: 'Physics', priority: 'Medium' }); setEditing(null)
  }
  const edit = record => { setForm(record); setEditing(record.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <section className="panel records"><div className="section-title"><div><h2>{title}</h2><small>{description}</small></div><small>Total: {records.length}</small></div><div className="record-form">{columns.map(col => col.options ? <select key={col.key} value={form[col.key] || col.options[0]} onChange={e => change(col.key, e.target.value)}>{col.options.map(o => <option key={o}>{o}</option>)}</select> : <input key={col.key} type={col.type || 'text'} value={form[col.key] || ''} placeholder={col.label || 'Date'} onChange={e => change(col.key, e.target.value)} />)}<button onClick={save}>{editing ? 'Save changes' : `Add ${title.slice(0, -1)}`}</button><button className="danger" onClick={() => { if (window.confirm(`Clear all ${title.toLowerCase()}?`)) setRecords([]) }}>Clear all</button></div><div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.label || c.key}</th>)}{type === 'revisions' && <th>Done</th>}<th>Actions</th></tr></thead><tbody>{records.length ? [...records].sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(record => <tr key={record.id}>{columns.map(c => <td key={c.key}>{record[c.key]}</td>)}{type === 'revisions' && <td><input aria-label="Mark revision done" type="checkbox" checked={Boolean(record.done)} onChange={() => setRecords(list => list.map(x => x.id === record.id ? { ...x, done: !x.done } : x))} /></td>}<td><button className="text-button" onClick={() => edit(record)}>Edit</button><button className="danger text-button" onClick={() => setRecords(list => list.filter(x => x.id !== record.id))}>Delete</button></td></tr>) : <tr><td className="empty" colSpan={columns.length + 2}>No records yet.</td></tr>}</tbody></table></div></section>
}
