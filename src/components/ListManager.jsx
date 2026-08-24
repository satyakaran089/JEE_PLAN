import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const today = () => new Date().toISOString().slice(0, 10)

export function CheckList({ storageKey, title, description, dateBased = false, timed = false }) {
  const [items, setItems] = useLocalStorage(storageKey, [])
  const [text, setText] = useState('')
  const [date, setDate] = useState(today())
  const [time, setTime] = useState('')
  const visible = dateBased ? items.filter(i => i.date === date) : items
  const add = () => { if (!text.trim()) return; setItems(list => [...list, { id: crypto.randomUUID(), text: text.trim(), done: false, date: dateBased ? date : undefined, time: timed ? time : '' }]); setText(''); setTime('') }
  const toggle = id => setItems(list => list.map(i => i.id === id ? { ...i, done: !i.done } : i))
  const remove = id => setItems(list => list.filter(i => i.id !== id))
  return <section className="panel checklist"><div className="section-title"><div><h2>{title}</h2><small>{description}</small></div>{dateBased && <input type="date" value={date} onChange={e => setDate(e.target.value)} />}{timed && <small>{items.filter(i => i.done).length} / {items.length} today</small>}</div><div className="add-row"><input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Add a task or goal" />{timed && <input type="time" value={time} onChange={e => setTime(e.target.value)} />}<button onClick={add}>Add</button></div><ul>{visible.length ? visible.map(item => <li key={item.id}><label><input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} /><span className={item.done ? 'done' : ''}>{item.text}</span></label><span>{item.time}</span><button className="danger icon-button" onClick={() => remove(item.id)}>×</button></li>) : <li className="empty">No items added yet.</li>}</ul></section>
}

export function GoalLists() { return <section className="goal-grid"><CheckList storageKey="jee_weekly_todos" title="Weekly goals" description="Focus targets for this week" /><CheckList storageKey="jee_monthly_todos" title="Monthly goals" description="Bigger goals for the month" /></section> }
