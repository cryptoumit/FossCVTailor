import { Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { makeId, type Profile } from '../model/schema';
import './profile-extras.css';

type Identified = { id: string };
type Field<T> = { key: keyof T & string; label: string; multiline?: boolean; placeholder?: string };

export function ProfileExtrasEditor({ profile, onChange }: { profile: Profile; onChange: (profile: Profile) => void }) {
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => onChange({ ...profile, [key]: value });

  return <div className="extras-page">
    <div className="eyebrow">YOUR CAREER STORY</div>
    <div className="page-heading"><div><h1>Additional sections</h1><p>Add credentials, work samples, recognition, and any sections that fit your story.</p></div></div>
    <div className="extras-grid">
      <CollectionSection title="Certifications" description="Professional credentials and licenses." items={profile.certifications} onChange={items => update('certifications', items)} createItem={() => ({ id: makeId(), name: '', issuer: '', date: '', url: '' })} fields={[{ key: 'name', label: 'Certification' }, { key: 'issuer', label: 'Issuing organization' }, { key: 'date', label: 'Date' }, { key: 'url', label: 'Credential link' }]} />
      <CollectionSection title="Projects" description="Selected projects, products, and independent work." items={profile.projects} onChange={items => update('projects', items)} createItem={() => ({ id: makeId(), name: '', role: '', start: '', end: '', description: '', url: '' })} fields={[{ key: 'name', label: 'Project' }, { key: 'role', label: 'Your role' }, { key: 'start', label: 'Start' }, { key: 'end', label: 'End' }, { key: 'description', label: 'Description', multiline: true }, { key: 'url', label: 'Project link' }]} />
      <CollectionSection title="Publications" description="Articles, research, books, and other published work." items={profile.publications} onChange={items => update('publications', items)} createItem={() => ({ id: makeId(), title: '', publisher: '', date: '', url: '', description: '' })} fields={[{ key: 'title', label: 'Title' }, { key: 'publisher', label: 'Publisher or venue' }, { key: 'date', label: 'Date' }, { key: 'url', label: 'Publication link' }, { key: 'description', label: 'Details', multiline: true }]} />
      <CollectionSection title="Awards & recognition" description="Awards, honors, and professional recognition." items={profile.awards} onChange={items => update('awards', items)} createItem={() => ({ id: makeId(), name: '', issuer: '', date: '', description: '' })} fields={[{ key: 'name', label: 'Award or honor' }, { key: 'issuer', label: 'Awarding organization' }, { key: 'date', label: 'Date' }, { key: 'description', label: 'Details', multiline: true }]} />
      <section className="panel extras-section">
        <div className="extras-heading"><div><h2>Custom sections</h2><p>Make a section for volunteering, memberships, interests, or anything else.</p></div><button className="button secondary small-button" onClick={() => update('customSections', [...profile.customSections, { id: makeId(), title: '', content: '' }])}><Plus size={15}/> Add section</button></div>
        {profile.customSections.map(section => <div className="extra-entry" key={section.id}>
          <div className="extra-entry-title"><span>Custom section</span><button className="icon-button danger" aria-label="Remove custom section" onClick={() => update('customSections', profile.customSections.filter(item => item.id !== section.id))}><Trash2 size={15}/></button></div>
          <label className="field">Section title<input value={section.title} onChange={event => update('customSections', profile.customSections.map(item => item.id === section.id ? { ...item, title: event.target.value } : item))} placeholder="e.g. Volunteering"/></label>
          <label className="field">Content<textarea rows={3} value={section.content} onChange={event => update('customSections', profile.customSections.map(item => item.id === section.id ? { ...item, content: event.target.value } : item))} placeholder="Add details for this section…"/></label>
        </div>)}
        {!profile.customSections.length&&<p className="extras-empty">No custom sections yet.</p>}
      </section>
    </div>
  </div>;
}

function CollectionSection<T extends Identified>({ title, description, items, onChange, createItem, fields }: {
  title: string;
  description: string;
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  fields: Field<T>[];
}) {
  const setField = (item: T, key: Field<T>['key'], value: string) => onChange(items.map(current => current.id === item.id ? { ...current, [key]: value } as T : current));
  return <section className="panel extras-section">
    <div className="extras-heading"><div><h2>{title}</h2><p>{description}</p></div><button className="button secondary small-button" onClick={() => onChange([...items, createItem()])}><Plus size={15}/> Add</button></div>
    {items.map(item => <div className="extra-entry" key={item.id}>
      <div className="extra-entry-title"><span>{title.replace(/s$/, '')}</span><button className="icon-button danger" aria-label={`Remove ${title.toLowerCase()} entry`} onClick={() => onChange(items.filter(current => current.id !== item.id))}><Trash2 size={15}/></button></div>
      <div className="extra-fields">{fields.map(field => <FieldControl key={field.key} field={field} value={String(item[field.key] ?? '')} onChange={value => setField(item, field.key, value)}/>)}</div>
    </div>)}
    {!items.length&&<p className="extras-empty">Nothing here yet.</p>}
  </section>;
}

function FieldControl<T extends Identified>({ field, value, onChange }: { field: Field<T>; value: string; onChange: (value: string) => void }): ReactNode {
  return <label className="field">{field.label}{field.multiline
    ? <textarea rows={3} value={value} onChange={event => onChange(event.target.value)} placeholder={field.placeholder}/>
    : <input value={value} onChange={event => onChange(event.target.value)} placeholder={field.placeholder}/>}</label>;
}
