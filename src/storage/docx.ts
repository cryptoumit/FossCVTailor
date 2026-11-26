import { Document as WordDocument, HeadingLevel, Packer, Paragraph, TextRun } from 'docx';
import type { CvSectionId } from '../model/cvSections';
import type { Profile, Letter } from '../model/schema';
import type { Template } from '../model/templates';

const tidy = (text: string) => text.trim();

export async function exportCvDocx(
  profile: Profile,
  template: Template,
  options: { sectionOrder?: CvSectionId[]; hiddenSections?: CvSectionId[] } = {},
) {
  const children: Paragraph[] = [];
  const font = template.font === 'serif' ? 'Georgia' : template.font === 'mono' ? 'Courier New' : 'Arial';
  const spacing = template.density === 'compact' ? 100 : template.density === 'spacious' ? 340 : 220;
  const section = (title: string) => children.push(new Paragraph({
    children: [new TextRun({ text: title, bold: true, color: template.accent.replace('#', '') })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: spacing, after: 100 },
  }));
  const renderers: Record<CvSectionId, () => void> = {
    summary: () => {
      if (!tidy(profile.summary)) return;
      section('Profile'); children.push(new Paragraph({ text: profile.summary }));
    },
    experience: () => {
      if (!profile.experience.length) return;
      section('Experience');
      for (const job of profile.experience) {
        children.push(new Paragraph({ children: [new TextRun({ text: job.title, bold: true }), new TextRun({ text: job.start || job.end ? `  ${job.start} – ${job.current ? 'Present' : job.end}` : '' })] }));
        children.push(new Paragraph({ text: [job.employer, job.location].filter(Boolean).join(' · ') }));
        if (job.description) children.push(new Paragraph({ text: job.description }));
        for (const item of job.achievements.filter(a => a.selected && a.text.trim())) children.push(new Paragraph({ text: item.text, bullet: { level: 0 } }));
      }
    },
    education: () => {
      if (!profile.education.length) return;
      section('Education');
      for (const item of profile.education) {
        children.push(new Paragraph({ children: [new TextRun({ text: [item.degree, item.field].filter(Boolean).join(', '), bold: true })] }));
        children.push(new Paragraph({ text: item.institution }));
        if (item.detail) children.push(new Paragraph({ text: item.detail }));
      }
    },
    skills: () => { if (profile.skills.length) { section('Skills'); children.push(new Paragraph({ text: profile.skills.map(x => x.name).join('  ·  ') })); } },
    languages: () => { if (profile.languages.length) { section('Languages'); children.push(new Paragraph({ text: profile.languages.join('  ·  ') })); } },
    certifications: () => {
      if (!profile.certifications.length) return;
      section('Certifications');
      for (const item of profile.certifications) {
        children.push(new Paragraph({ children: [new TextRun({ text: item.name, bold: true }), new TextRun({ text: item.date ? `  ${item.date}` : '' })] }));
        if (item.issuer) children.push(new Paragraph({ text: item.issuer }));
        if (item.url) children.push(new Paragraph({ text: item.url }));
      }
    },
    projects: () => {
      if (!profile.projects.length) return;
      section('Projects');
      for (const item of profile.projects) {
        children.push(new Paragraph({ children: [new TextRun({ text: item.name, bold: true }), new TextRun({ text: item.start || item.end ? `  ${item.start} – ${item.end}` : '' })] }));
        if (item.role) children.push(new Paragraph({ text: item.role }));
        if (item.description) children.push(new Paragraph({ text: item.description }));
        if (item.url) children.push(new Paragraph({ text: item.url }));
      }
    },
    publications: () => {
      if (!profile.publications.length) return;
      section('Publications');
      for (const item of profile.publications) {
        children.push(new Paragraph({ children: [new TextRun({ text: item.title, bold: true }), new TextRun({ text: item.date ? `  ${item.date}` : '' })] }));
        if (item.publisher) children.push(new Paragraph({ text: item.publisher }));
        if (item.description) children.push(new Paragraph({ text: item.description }));
        if (item.url) children.push(new Paragraph({ text: item.url }));
      }
    },
    awards: () => {
      if (!profile.awards.length) return;
      section('Awards & Recognition');
      for (const item of profile.awards) {
        children.push(new Paragraph({ children: [new TextRun({ text: item.name, bold: true }), new TextRun({ text: item.date ? `  ${item.date}` : '' })] }));
        if (item.issuer) children.push(new Paragraph({ text: item.issuer }));
        if (item.description) children.push(new Paragraph({ text: item.description }));
      }
    },
    customSections: () => {
      for (const item of profile.customSections.filter(value => value.title || value.content)) {
        section(item.title || 'Additional information');
        for (const line of item.content.split(/\r?\n/).filter(Boolean)) children.push(new Paragraph({ text: line }));
      }
    },
  };
  const order = [...(options.sectionOrder || []), ...Object.keys(renderers).filter(id => !options.sectionOrder?.includes(id as CvSectionId)) as CvSectionId[]];
  const hidden = options.hiddenSections || [];
  for (const id of order) if (!hidden.includes(id)) renderers[id]();

  children.unshift(
    new Paragraph({ text: profile.name || 'Your name', heading: HeadingLevel.TITLE }),
    ...(profile.title ? [new Paragraph({ children: [new TextRun({ text: profile.title, bold: true })] })] : []),
    ...([profile.email, profile.phone, profile.location, profile.website, profile.linkedin].filter(Boolean).length ? [new Paragraph({ text: [profile.email, profile.phone, profile.location, profile.website, profile.linkedin].filter(Boolean).join('  ·  ') })] : []),
  );
  const word = new WordDocument({
    styles: { default: { document: { run: { font, size: template.density === 'compact' ? 18 : template.density === 'spacious' ? 22 : 20 } } } },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1020, right: 1020, bottom: 1020, left: 1020 } } }, children }],
  });
  const blob = await Packer.toBlob(word);
  saveBlob(blob, `${safeName(profile.name || 'cv')}-${safeName(template.name)}.docx`);
}

export async function exportLetterDocx(letter: Letter, profile: Profile) {
  const lines = letter.body.split(/\r?\n/);
  const children = [new Paragraph({ text: profile.name || 'Your name', heading: HeadingLevel.TITLE }), new Paragraph({ text: [profile.email, profile.phone, profile.location].filter(Boolean).join('  ·  ') }), new Paragraph({ text: letter.company || 'Company' }), new Paragraph({ text: letter.role || 'Cover letter', heading: HeadingLevel.HEADING_1 }), ...lines.map(text => new Paragraph({ text }))];
  const word = new WordDocument({ styles: { default: { document: { run: { font: 'Arial', size: 22 } } } }, sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children }] });
  saveBlob(await Packer.toBlob(word), `${safeName(letter.name)}.docx`);
}

function safeName(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'document'; }
function saveBlob(blob: Blob, name: string) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
