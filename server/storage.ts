// storage.ts — EU Logistics Dashboard
// No user auth in this app; users CRUD methods removed (BLOCK-1 fix).
// Add entries are stored in-memory via the React store on the client.
// If a persistent server-side store is needed in future, wire Supabase.

export type InsertUser = { username: string };
export type User = { id: number; username: string };

export interface IStorage {
  // Reserved for future use — no methods needed for current feature set
}

export class MemStorage implements IStorage {}

export const storage = new MemStorage();
