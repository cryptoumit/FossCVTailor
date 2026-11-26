import { describe, expect, it } from 'vitest';
import { AppDataSchema, emptyProfile, initialData, makeId } from './schema';
import { templates } from './templates';

describe('workspace data',()=>{
 it('creates a valid empty local workspace',()=>{expect(AppDataSchema.parse(initialData()).schemaVersion).toBe(1)});
 it('uses stable unique ids for independent records',()=>{expect(makeId()).not.toBe(makeId())});
 it('accepts a profile with reusable achievements and validates status',()=>{
  const profile=emptyProfile(); profile.experience.push({id:makeId(),employer:'Studio',title:'Designer',location:'',start:'2022',end:'',current:true,description:'',achievements:[{id:makeId(),text:'Improved onboarding',selected:true}]});
  expect(AppDataSchema.parse({...initialData(),profile}).profile.experience[0].achievements).toHaveLength(1);
  expect(AppDataSchema.safeParse({...initialData(),applications:[{id:makeId(),status:'Maybe'}]}).success).toBe(false);
 });
 it('fills added profile sections with empty collections for existing version-one data',()=>{
  const parsed=AppDataSchema.parse({...initialData(),profile:{id:makeId()}});
  expect(parsed.schemaVersion).toBe(1);
  expect(parsed.profile.certifications).toEqual([]);
  expect(parsed.profile.projects).toEqual([]);
  expect(parsed.profile.publications).toEqual([]);
  expect(parsed.profile.awards).toEqual([]);
  expect(parsed.profile.customSections).toEqual([]);
 });
 it('validates structured additional profile entries',()=>{
  const profile=emptyProfile();
  profile.certifications.push({id:makeId(),name:'Cloud Certificate',issuer:'Example Institute',date:'2025',url:'https://example.com/cert'});
  profile.projects.push({id:makeId(),name:'Open data tool',role:'Maintainer',start:'2024',end:'2025',description:'Built a public data browser.',url:'https://example.com/project'});
  profile.publications.push({id:makeId(),title:'Systems study',publisher:'Example Journal',date:'2025',url:'',description:''});
  profile.awards.push({id:makeId(),name:'Design Award',issuer:'Example Guild',date:'2024',description:''});
  profile.customSections.push({id:makeId(),title:'Volunteering',content:'Mentored early-career designers.'});
  const parsed=AppDataSchema.parse({...initialData(),profile});
  expect(parsed.profile.certifications[0].name).toBe('Cloud Certificate');
  expect(parsed.profile.customSections[0].title).toBe('Volunteering');
 });
});
describe('template catalog',()=>{
 it('contains 50 uniquely identified designs in the requested category counts',()=>{
  expect(templates).toHaveLength(50);expect(new Set(templates.map(x=>x.id)).size).toBe(50);
  expect(templates.filter(x=>x.category==='Classic & Professional')).toHaveLength(7);
  expect(templates.filter(x=>x.category==='Modern Minimal')).toHaveLength(8);
  expect(templates.filter(x=>x.category==='Executive & Leadership')).toHaveLength(5);
  expect(templates.filter(x=>x.category==='Creative & Design')).toHaveLength(7);
  expect(templates.filter(x=>x.category==='Technical & Engineering')).toHaveLength(6);
  expect(templates.filter(x=>x.category==='Academic & Research')).toHaveLength(4);
  expect(templates.filter(x=>x.category==='Compact & Dense')).toHaveLength(5);
  expect(templates.filter(x=>x.category==='ATS-Focused')).toHaveLength(8);
 });
 it('classifies the ATS collection as single column and text-first',()=>{
  expect(templates.filter(x=>x.ats==='ATS-focused').every(x=>x.layout==='single')).toBe(true);
 });
});
