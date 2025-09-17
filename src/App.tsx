import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Experience from './pages/Experience'
import ExperienceDetail from './pages/ExperienceDetail'
import Skills from './pages/Skills'
import Education from './pages/Education'
import Contact from './pages/Contact'
import resume from './data/resume.json'

function App() {
  return (
    <div className="min-h-full bg-[var(--bg)] text-[var(--text)]">
      <Navbar name={resume.name} title={resume.title} links={resume.links} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/experience/:slug" element={<ExperienceDetail />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer name={resume.name} />
    </div>
  )
}

export default App
