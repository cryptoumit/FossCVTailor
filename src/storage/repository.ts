import { openDB } from 'idb';
import { AppDataSchema, initialData, type AppData } from '../model/schema';

const DB_NAME='foss-cv-tailor-local';
const dbPromise=openDB(DB_NAME,1,{upgrade(db){db.createObjectStore('workspace');}});
export async function loadWorkspace():Promise<AppData>{
 try { const db=await dbPromise; const value=await db.get('workspace','current'); if(!value)return initialData(); return AppDataSchema.parse(value); }
 catch { return initialData(); }
}
export async function saveWorkspace(data:AppData):Promise<void>{
 const validated=AppDataSchema.parse(data); const db=await dbPromise; await db.put('workspace',validated,'current');
}
export async function clearWorkspace():Promise<void>{const db=await dbPromise;await db.clear('workspace');}
export function downloadBackup(data:AppData){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`cvtailor-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);}
export async function parseBackup(file:File):Promise<AppData>{const raw=JSON.parse(await file.text());return AppDataSchema.parse(raw);}
