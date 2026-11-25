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
