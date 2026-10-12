import { MongoClient, type Db } from "mongodb";

// Keep one connection alive across hot reloads (dev) and warm invocations (Vercel).
const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

function connect() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set");
    return (g._mongo ??= new MongoClient(uri).connect());
}

export async function getDb(): Promise<Db> {
    const client = await connect();
    return client.db(process.env.MONGODB_DB ?? "comtech");
}