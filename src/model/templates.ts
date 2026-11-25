export type Category = 'Classic & Professional'|'Modern Minimal'|'Executive & Leadership'|'Creative & Design'|'Technical & Engineering'|'Academic & Research'|'Compact & Dense'|'ATS-Focused';
export interface Template { id:string; name:string; category:Category; description:string; ats:'ATS-focused'|'ATS-conscious'|'Visual/creative'; layout:'single'|'sidebar'|'split'|'editorial'|'timeline'; header:'left'|'center'|'large'|'compact'|'band'; font:'serif'|'sans'|'hybrid'|'mono'; accent:string; density:'spacious'|'balanced'|'compact'; tags:string[] }
const sets: Array<[Category,number,string[]]> = [
 ['Classic & Professional',7,['Meridian','Westminster','Ledger','Civic','Sterling','Borough','Chancery']],['Modern Minimal',8,['Forma','Whitespace','Mono','North','Contour','Still','Gridline','Lucent']],['Executive & Leadership',5,['Chairman','Summit','Principal','Mandate','Legacy']],['Creative & Design',7,['Gallery','Folio','Studio','Typeface','Chromatic','Canvas','Margin']],['Technical & Engineering',6,['Stack','Systems','Signal','Circuit','Kernel','Blueprint']],['Academic & Research',4,['Scholar','Thesis','Colloquium','Fieldnotes']],['Compact & Dense',5,['Efficient','Columnist','Brief','Portfolio','Index']],['ATS-Focused',8,['Plainspoken','Clearline','Open text','Chronicle','Standard','Sequence','Readable','Direct']]
];
const accents=['#234d48','#375c81','#8a5638','#563f70','#a2463d','#256c67','#6b6a42','#35434d'];
const layouts: Template['layout'][]=['single','sidebar','split','editorial','timeline'];
const headers: Template['header'][]=['left','center','large','compact','band'];
const fonts: Template['font'][]=['serif','sans','hybrid','mono'];
const descriptions=['Quietly traditional with a finely ruled title block.','A two-column hierarchy with a compact contact rail.','Editorial spacing and a distinctive oversized name.','A disciplined timeline for clear career progression.','A restrained accent band anchors the document.','Grouped information with a strong typographic rhythm.','Purpose-built hierarchy for quick scanning.','Open margins and a thoughtful reading pace.'];
let templatesCount=0;
export const templates: Template[] = sets.flatMap(([category,_count,names], group) => (names as string[]).map((name,index) => {
 const n=templatesCount++; const isATS=category==='ATS-Focused';
 return {id:`cv-${String(n).padStart(2,'0')}`,name,category:category as Category,description:descriptions[(n+index)%descriptions.length],ats:isATS?'ATS-focused':category==='Creative & Design'?'Visual/creative':'ATS-conscious',layout:isATS?'single':layouts[(group+index)%layouts.length],header:headers[(group*2+index)%headers.length],font:fonts[(group+index)%fonts.length],accent:accents[(n+group)%accents.length],density:category==='Compact & Dense'?'compact':index%3===0?'spacious':'balanced',tags:[category.split(' ')[0],isATS?'Text-first':layouts[(group+index)%layouts.length]]};
}));
