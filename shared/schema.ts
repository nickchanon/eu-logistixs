// schema.ts — EU Logistics Dashboard
// No user authentication in this app; users table removed to avoid
// accidental exposure of a plaintext-password column.
// If auth is added in future, use bcrypt/argon2 before storing passwords.

import { z } from "zod";

// Placeholder export to satisfy any imports that previously referenced this module
export type InsertUser = { username: string };
export type User = { id: number; username: string };
