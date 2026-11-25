import type { CSSProperties } from 'react';
import type { Profile } from '../model/schema';
import type { Template } from '../model/templates';
export function Document({profile,template}: {profile:Profile;template:Template}){
 return <article className={`paper cv-${template.layout} font-${template.font} density-${template.density} head-${template.header}`} style={{'--accent':template.accent} as CSSProperties}>
  <header className="cv-header"><div><h1>{profile.name||'Your name'}</h1><p className="cv-title">{profile.title||'Professional title'}</p></div><div className="cv-contact">{[profile.email,profile.phone,profile.location,profile.website,profile.linkedin].filter(Boolean).map(x=><span key={x}>{x}</span>)}</div></header>
  <div className="cv-body"><main>
   {profile.summary&&<section><h2>Profile</h2><p>{profile.summary}</p></section>}
   {profile.experience.length>0&&<section><h2>Experience</h2>{profile.experience.map(job=><div className="cv-entry" key={job.id}><div className="cv-entry-head"><strong>{job.title||'Role'}</strong><span>{job.start}{job.start||job.end?' – ':''}{job.current?'Present':job.end}</span></div><div className="cv-subhead">{job.employer}{job.location?` · ${job.location}`:''}</div>{job.description&&<p>{job.description}</p>}<ul>{job.achievements.filter(a=>a.selected&&a.text).map(a=><li key={a.id}>{a.text}</li>)}</ul></div>)}</section>}
   {profile.education.length>0&&<section><h2>Education</h2>{profile.education.map(e=><div className="cv-entry" key={e.id}><div className="cv-entry-head"><strong>{e.degree}{e.field?`, ${e.field}`:''}</strong><span>{e.start}{e.start||e.end?' – ':''}{e.end}</span></div><div className="cv-subhead">{e.institution}</div>{e.detail&&<p>{e.detail}</p>}</div>)}</section>}
  </main><aside>{profile.skills.length>0&&<section><h2>Skills</h2><div className="cv-skills">{profile.skills.map(s=><span key={s.id}>{s.name}</span>)}</div></section>}{profile.languages.length>0&&<section><h2>Languages</h2><p>{profile.languages.join(' · ')}</p></section>}</aside></div>
 </article>
}
