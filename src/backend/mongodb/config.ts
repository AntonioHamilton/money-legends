import mongoose from "mongoose";

// Variável global para reusar a conexão no desenvolvimento
let cached = globalThis.mongoose;

if (!cached) {
	cached = globalThis.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(process.env.MONGODB_URI as string, opts)
			.then((mongoose) => {
				console.log("MongoDB Connected!");
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
