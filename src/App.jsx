import './App.css'
import TopTools from './components/TopTools'
import SyllabusTracker from './components/SyllabusTracker'
import RecordManager from './components/RecordManager'
import { CheckList, GoalLists } from './components/ListManager'
import { freshSyllabus } from './data/syllabus'
import { useLocalStorage } from './hooks/useLocalStorage'
import InstallApp from './components/InstallApp'

function App() {
  const [syllabus, setSyllabus] = useLocalStorage('jee_tracker_data', freshSyllabus())
  const reset = () => { if (window.confirm('Reset all syllabus progress to default?')) setSyllabus(freshSyllabus()) }
  const backup = () => {
    const blob = new Blob([JSON.stringify(syllabus, null, 2)], { type: 'application/json' })
    const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'jee-syllabus-backup.json' })
    link.click(); URL.revokeObjectURL(link.href)
  }
  return <main className="app-shell"><TopTools /><header className="panel app-header"><div className="hero-copy"><p className="eyebrow"><span /> JEE PREPARATION OS</p><h1>Mission <em>Control.</em></h1><p>Build momentum, master chapters, and turn every study session into measurable progress.</p><div className="hero-chips"><span>✦ Local-first</span><span>✦ Always saved</span><span>✦ Focus mode on</span></div></div><div className="hero-actions"><InstallApp /><div className="date-card"><small>TODAY</small><strong>{new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date())}</strong></div><div><button className="danger" onClick={reset}>Reset syllabus</button><button onClick={backup}>↓ Backup JSON</button></div></div></header><SyllabusTracker syllabus={syllabus} setSyllabus={setSyllabus} /><div className="dashboard-divider"><span>PLAN · PRACTISE · REPEAT</span></div><RecordManager type="upcoming" title="Upcoming tests" description="Schedule and track your exams" storageKey="jee_upcoming_tests" /><RecordManager type="tests" title="Test analysis" description="Log scores, rank and key observations" storageKey="jee_test_analysis" /><RecordManager type="revisions" title="Revisions" description="Plan revisions and mark them complete" storageKey="jee_revision_planner" /><div className="dashboard-divider"><span>YOUR RHYTHM</span></div><CheckList storageKey="jee_daily_habits" title="Daily habits" description="Recurring routines — tick them off today" timed /><CheckList storageKey="jee_daily_todos" title="Daily to-do list" description="One-off tasks for your selected day" dateBased /><GoalLists /><footer>Made for focused JEE preparation <span>✦</span> Your progress lives here.</footer></main>
}

export default App
