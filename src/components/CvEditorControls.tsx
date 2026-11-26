import type { CvSnapshot, CvVersion } from '../model/schema';
import { cvSectionIds, cvSectionLabels, type CvSectionId } from '../model/cvSections';

type Design = CvVersion['design'];

export function CvEditorControls({
  version,
  accent,
  font,
  density,
  onSectionOrder,
  onToggleSection,
  onDesign,
  onSaveSnapshot,
  onRestoreSnapshot,
  onDeleteSnapshot,
}: {
  version: CvVersion;
  accent: string;
  font: CvVersion['design']['font'];
  density: CvVersion['design']['density'];
  onSectionOrder: (order: CvSectionId[]) => void;
  onToggleSection: (section: CvSectionId) => void;
  onDesign: (design: Design) => void;
  onSaveSnapshot: () => void;
  onRestoreSnapshot: (snapshot: CvSnapshot) => void;
  onDeleteSnapshot: (snapshotId: string) => void;
}) {
  const order = [...cvSectionIds].sort((a, b) => { const ai=version.sectionOrder.indexOf(a), bi=version.sectionOrder.indexOf(b); return (ai<0?Number.MAX_SAFE_INTEGER:ai)-(bi<0?Number.MAX_SAFE_INTEGER:bi); });
  const move = (section: CvSectionId, delta: -1 | 1) => {
    const index = order.indexOf(section);
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    [order[index], order[target]] = [order[target], order[index]];
    onSectionOrder(order);
  };
  const updateDesign = (value: Partial<Design>) => onDesign({ ...version.design, ...value });

  return <div className="cv-editor-controls">
    <section className="panel editor-control-card">
      <div className="panel-title"><div><h3>Document design</h3><p>Adjust type and accent for this CV.</p></div></div>
      <div className="design-controls">
        <label className="field">Accent color<input aria-label="Accent color" type="color" value={version.design.accent || accent} onChange={e => updateDesign({ accent: e.target.value })}/></label>
        <label className="field">Font<select value={version.design.font || font || 'sans'} onChange={e => updateDesign({ font: e.target.value as Design['font'] })}><option value="sans">Sans</option><option value="serif">Serif</option><option value="hybrid">Hybrid</option><option value="mono">Monospace</option></select></label>
        <label className="field">Spacing<select value={version.design.density || density || 'balanced'} onChange={e => updateDesign({ density: e.target.value as Design['density'] })}><option value="spacious">Spacious</option><option value="balanced">Balanced</option><option value="compact">Compact</option></select></label>
      </div>
    </section>
    <section className="panel editor-control-card">
      <div className="panel-title"><div><h3>Sections</h3><p>Choose what appears and arrange the order.</p></div></div>
      <ol className="section-order-list">{order.map((section, index) => <li key={section}>
        <label><input type="checkbox" checked={!version.hiddenSections.includes(section)} onChange={() => onToggleSection(section)}/>{cvSectionLabels[section]}</label>
        <span><button type="button" className="icon-button" aria-label={`Move ${cvSectionLabels[section]} up`} disabled={index===0} onClick={() => move(section, -1)}>↑</button><button type="button" className="icon-button" aria-label={`Move ${cvSectionLabels[section]} down`} disabled={index===order.length-1} onClick={() => move(section, 1)}>↓</button></span>
      </li>)}</ol>
    </section>
    <section className="panel editor-control-card">
      <div className="panel-title"><div><h3>Version snapshots</h3><p>Save and restore named points in this CV’s history.</p></div><button type="button" className="button secondary small-button" onClick={onSaveSnapshot}>Save snapshot</button></div>
      {version.snapshots.length ? <ul className="snapshot-list">{version.snapshots.map(snapshot => <li key={snapshot.id}><span><b>{snapshot.name}</b><small>{new Date(snapshot.createdAt).toLocaleString()}</small></span><button type="button" className="text-link" onClick={() => onRestoreSnapshot(snapshot)}>Restore</button><button type="button" className="text-link danger" onClick={() => onDeleteSnapshot(snapshot.id)}>Delete</button></li>)}</ul> : <p className="hint">No snapshots saved yet.</p>}
    </section>
  </div>;
}
