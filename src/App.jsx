import React, { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'

const roles = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Engineer',
    type: 'Web applications',
    summary: 'I build clear, scalable React interfaces for products people use every day.',
    skills: ['React', 'TypeScript', 'Redux', 'REST APIs'],
    projects: ['Ahhaa mental wellness platform', 'Barmer Chemists Association'],
    tags: ['Web', 'React', 'Full-time', 'Contract'],
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Flutter Developer',
    type: 'Mobile applications',
    summary: 'I take cross-platform apps from a reliable UI to a store-ready release.',
    skills: ['Flutter', 'Firebase', 'iOS', 'Android'],
    projects: ['Production mobile app at Ahhaa'],
    tags: ['Mobile', 'Flutter', 'Contract'],
  },
  {
    id: 'delivery',
    number: '03',
    title: 'Product Delivery Engineer',
    type: 'Launch & maintain',
    summary: 'I connect product UI to the practical work of performance, deployment, and ongoing support.',
    skills: ['GCP', 'CI/CD', 'Cloud Run', 'Performance'],
    projects: ['GCP production deployments', 'Client marketing websites'],
    tags: ['Web', 'GCP', 'Full-time', 'Contract'],
  },
]

const projects = [
  {
    title: 'Barmer Chemists Association',
    label: 'Internal web platform',
    description: 'Membership and records management for medical-shop owners, with renewals and announcements.',
    stack: 'React · REST APIs · Firebase · GCP',
  },
  {
    title: 'Ahhaa World',
    label: 'Mental wellness platform',
    description: 'Production web and mobile product work spanning React, Flutter, Django APIs, and releases.',
    stack: 'React · TypeScript · Flutter · Django',
  },
  {
    title: 'DropTonight',
    label: 'Music-request platform',
    description: 'Responsive product landing page and UI strategy for a nightlife platform.',
    stack: 'React · GCP',
  },
]

const filterOptions = ['All', 'Web', 'Mobile', 'React', 'Flutter', 'GCP', 'Full-time', 'Contract']

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function App() {
  const [filter, setFilter] = useState('All')
  const [shortlist, setShortlist] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')

  const visibleRoles = useMemo(
    () => roles.filter((role) => filter === 'All' || role.tags.includes(filter)),
    [filter],
  )

  function addToShortlist(role) {
    setShortlist((current) => current.includes(role.id) ? current : [...current, role.id])
    document.getElementById('shortlist').scrollIntoView({ behavior: 'smooth' })
  }

  function scrollTo(id) {
    setMenuOpen(false)
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

  async function submitContactForm(event) {
    event.preventDefault()
    setFormStatus('submitting')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if (!serviceId || !templateId || !publicKey) throw new Error('Missing EmailJS configuration')

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('project'),
        },
        { publicKey },
      )
      setFormStatus('success')
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Back to top">MJ<span>_</span></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <button onClick={() => scrollTo('roles')}>Roles</button>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
        </nav>
        <div className="header-actions">
          <button className="shortlist-link" onClick={() => scrollTo('shortlist')}>
            Shortlist <span>{shortlist.length.toString().padStart(2, '0')}</span>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">Menu</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="availability"><span className="status-dot" /> Available for selected opportunities</div>
        <p className="eyebrow">Candidate profile / 2026</p>
        <h1>Your next frontend hire,<br /><em>already production-tested.</em></h1>
        <div className="hero-bottom">
          <p>Frontend engineer with 5 years of experience building dependable web and mobile products—from interface to release.</p>
          <button className="circle-action" onClick={() => scrollTo('roles')} aria-label="Explore roles"><ArrowIcon /></button>
        </div>
      </section>

      <section className="roles-section" id="roles">
        <div className="section-heading">
          <div><p className="eyebrow">Find the right fit</p><h2>Areas of fit</h2></div>
          <p className="section-copy">Choose the role that best matches what you need. Each profile is backed by relevant production work.</p>
        </div>
        <div className="filters" aria-label="Filter roles">
          {filterOptions.map((option) => <button key={option} onClick={() => setFilter(option)} className={filter === option ? 'active' : ''}>{option}</button>)}
        </div>
        <div className="role-list">
          {visibleRoles.map((role) => {
            const isAdded = shortlist.includes(role.id)
            return <article className="role-card" key={role.id}>
              <div className="role-card-top"><span>{role.number}</span><span>{role.type}</span></div>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <div className="skill-list">{role.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              <div className="role-card-footer">
                <span>{role.projects.length} relevant {role.projects.length === 1 ? 'project' : 'projects'}</span>
                <button onClick={() => addToShortlist(role)} disabled={isAdded}>{isAdded ? 'Shortlisted' : 'Shortlist'} <ArrowIcon /></button>
              </div>
            </article>
          })}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading"><div><p className="eyebrow">Selected evidence</p><h2>Work that ships</h2></div><p className="section-copy">A small selection of products where I owned meaningful frontend and delivery work.</p></div>
        <div className="project-list">
          {projects.map((project, index) => <article className="project-row" key={project.title}>
            <span className="project-number">0{index + 1}</span>
            <div><p className="project-label">{project.label}</p><h3>{project.title}</h3></div>
            <p className="project-description">{project.description}</p>
            <p className="project-stack">{project.stack}</p>
          </article>)}
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow">A practical collaborator</p>
        <h2>I work best where thoughtful UI meets the reality of a production product.</h2>
        <div className="about-grid"><p>I collaborate with product, design, and backend teams to build interfaces that are clear, responsive, and maintainable. I also bring experience in deployment, mobile releases, and mentoring junior developers.</p><a href="mailto:meghna.jain.india@gmail.com">meghna.jain.india@gmail.com <ArrowIcon /></a></div>
      </section>

      <section className="shortlist-section" id="shortlist">
        <div><p className="eyebrow">Your shortlist</p><h2>{shortlist.length ? 'Let’s discuss the fit.' : 'See a role you need?'}</h2><p>{shortlist.length ? `You shortlisted ${shortlist.length} ${shortlist.length === 1 ? 'role' : 'roles'}. Share a few details and I’ll get back to you.` : 'Pick one or more areas of fit, then start a conversation.'}</p></div>
        {formStatus === 'success' ? <div className="success-message"><p>Message received.</p><span>Thank you — I’ll be in touch soon.</span></div> : <form onSubmit={submitContactForm}>
          <label>Name<input required name="name" placeholder="Your name" /></label>
          <label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label>
          <label>What are you building?<textarea name="project" placeholder="A role, project, or problem to solve" rows="3" /></label>
          {formStatus === 'error' && <p className="form-error">Something went wrong. Please email me directly instead.</p>}
          <button type="submit" disabled={formStatus === 'submitting'}>{formStatus === 'submitting' ? 'Sending…' : 'Start a conversation'} <ArrowIcon /></button>
        </form>}
      </section>

      <footer><span>© {new Date().getFullYear()} Meghna Jain</span><div><a href="https://linkedin.com/in/meghna-2507" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Megha2508" target="_blank" rel="noreferrer">GitHub</a></div></footer>
    </main>
  )
}

export default App
