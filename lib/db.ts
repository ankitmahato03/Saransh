// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    if (!process.env.DATABASE_URL) {
      throw new Error ('Neon Database url not defien')
        
    }
    const sql = neon(process.env.DATABASE_URL);
return sql;  
}