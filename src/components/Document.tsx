import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { Profile } from '../model/schema';
import type { CvPageSize } from '../model/schema';
import type { Template } from '../model/templates';
import { cvSectionIds, type CvSectionId } from '../model/cvSections';

export function Document({
  profile,
  template,
  sectionOrder = [...cvSectionIds],
  hiddenSections = [],
  pageSize = 'A4',
  zoom = 75,
}: {
  profile: Profile;
  template: Template;
  sectionOrder?: CvSectionId[];
  hiddenSections?: CvSectionId[];
  pageSize?: CvPageSize;
  zoom?: number;
}) {
  const documentRef = useRef<HTMLElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const element = documentRef.current;
    if (!element) return;
    const measure = () => setContentHeight(element.scrollHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [profile, template, pageSize]);
  const ordered = [...sectionOrder, ...cvSectionIds.filter(id => !sectionOrder.includes(id))];
  const renderSection = (id: CvSectionId): ReactNode => {
    switch (id) {
      case 'summary':
        return profile.summary && <section key={id}><h2>Profile</h2><p>{profile.summary}</p></section>;
      case 'experience':
        return profile.experience.length > 0 && <section key={id}><h2>Experience</h2>{profile.experience.map(job => <div className="cv-entry" key={job.id}><div className="cv-entry-head"><strong>{job.title || 'Role'}</strong><span>{job.start}{job.start || job.end ? ' – ' : ''}{job.current ? 'Present' : job.end}</span></div><div className="cv-subhead">{job.employer}{job.location ? ` · ${job.location}` : ''}</div>{job.description && <p>{job.description}</p>}<ul>{job.achievements.filter(item => item.selected && item.text).map(item => <li key={item.id}>{item.text}</li>)}</ul></div>)}</section>;
      case 'education':
        return profile.education.length > 0 && <section key={id}><h2>Education</h2>{profile.education.map(item => <div className="cv-entry" key={item.id}><div className="cv-entry-head"><strong>{item.degree}{item.field ? `, ${item.field}` : ''}</strong><span>{item.start}{item.start || item.end ? ' – ' : ''}{item.end}</span></div><div className="cv-subhead">{item.institution}</div>{item.detail && <p>{item.detail}</p>}</div>)}</section>;
      case 'skills':
        return profile.skills.length > 0 && <section className="cv-side-section" key={id}><h2>Skills</h2><div className="cv-skills">{profile.skills.map(skill => <span key={skill.id}>{skill.name}</span>)}</div></section>;
      case 'languages':
        return profile.languages.length > 0 && <section className="cv-side-section" key={id}><h2>Languages</h2><p>{profile.languages.join(' · ')}</p></section>;
      case 'certifications':
        return profile.certifications.length > 0 && <section key={id}><h2>Certifications</h2>{profile.certifications.map(item => <div className="cv-entry" key={item.id}><div className="cv-entry-head"><strong>{item.name}</strong><span>{item.date}</span></div><div className="cv-subhead">{item.issuer}</div>{item.url && <p>{item.url}</p>}</div>)}</section>;
      case 'projects':
        return profile.projects.length > 0 && <section key={id}><h2>Projects</h2>{profile.projects.map(item => <div className="cv-entry" key={item.id}><div className="cv-entry-head"><strong>{item.name}</strong><span>{item.start}{item.start || item.end ? ' – ' : ''}{item.end}</span></div>{item.role && <div className="cv-subhead">{item.role}</div>}{item.description && <p>{item.description}</p>}{item.url && <p>{item.url}</p>}</div>)}</section>;
      case 'publications':
        return profile.publications.length > 0 && <section key={id}><h2>Publications</h2>{profile.publications.map(item => <div className="cv-entry" key={item.id}><div className="cv-entry-head"><strong>{item.title}</strong><span>{item.date}</span></div>{item.publisher && <div className="cv-subhead">{item.publisher}</div>}{item.description && <p>{item.description}</p>}</div>)}</section>;
      case 'awards':
        return profile.awards.length > 0 && <section key={id}><h2>Awards & Recognition</h2>{profile.awards.map(item => <div className="cv-entry" key={item.id}><div className="cv-entry-head"><strong>{item.name}</strong><span>{item.date}</span></div>{item.issuer && <div className="cv-subhead">{item.issuer}</div>}{item.description && <p>{item.description}</p>}</div>)}</section>;
      case 'customSections':
        return profile.customSections.filter(item => item.title || item.content).map(item => <section key={item.id}><h2>{item.title || 'Additional information'}</h2>{item.content.split('\n').filter(Boolean).map((line, index) => <p key={`${item.id}-${index}`}>{line}</p>)}</section>);
    }
  };

  return <div className="document-preview" style={{ '--preview-scale': zoom / 100, '--preview-width': pageSize === 'A4' ? '210mm' : '8.5in', '--preview-content-height': `${Math.max(contentHeight, pageSize === 'A4' ? 1123 : 1056) * zoom / 100}px` } as CSSProperties}>
    <article ref={documentRef} className={`paper page-${pageSize.toLowerCase()} cv-${template.layout} font-${template.font} density-${template.density} head-${template.header}`} style={{ '--accent': template.accent } as CSSProperties}>
    <header className="cv-header"><div><h1>{profile.name || 'Your name'}</h1><p className="cv-title">{profile.title || 'Professional title'}</p></div><div className="cv-contact">{[profile.email, profile.phone, profile.location, profile.website, profile.linkedin].filter(Boolean).map(value => <span key={value}>{value}</span>)}</div></header>
    <div className="cv-body">{ordered.filter(id => !hiddenSections.includes(id)).map(id => renderSection(id))}</div>
    </article>
  </div>;
}
