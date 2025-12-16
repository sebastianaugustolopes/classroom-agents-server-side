# Classroom Agents Server

This project is the backend server for the Classroom Agents application, designed to work independently from the frontend. The backend is hosted on Railway, allowing for scalable and reliable deployment, while the frontend is served separately.

## Table of Contents

- [Project Structure](#project-structure)
- [Main Technologies](#main-technologies)
- [Development Logic](#development-logic)
- [Application Flow](#application-flow)
- [Key Files and Code](#key-files-and-code)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## Project Structure

```
client.http
src/
  env.ts
  server.ts
  db/
    connection.ts
    seed.ts
    migrations/
      ...
    schema/
      audio-chunks.ts
      questions.ts
      rooms.ts
      index.ts
  http/
    routes/
      create-question.ts
      create-room.ts
      get-room-questions.ts
      get-rooms.ts
      upload-audio.ts
  services/
    gemini.ts
drizzle.config.ts
docker-compose.yml
package.json
tsconfig.json
.env
```

## Main Technologies

- **Node.js**: JavaScript runtime for server-side logic
- **TypeScript**: Type safety and modern JS features
- **Drizzle ORM**: Database abstraction and migrations
- **Zod**: Schema validation for environment and request data
- **Express (or similar)**: HTTP server and routing
- **Railway**: Cloud hosting for backend services

## Development Logic

- The backend exposes RESTful HTTP endpoints for room and question management, as well as audio upload and processing.
- Database access is managed via Drizzle ORM, with schema definitions and migrations under `src/db/`.
- Environment variables are validated using Zod in `src/env.ts`.
- The backend is decoupled from the frontend, communicating via HTTP APIs.

## Application Flow

1. **Room Creation**: The frontend sends a request to `/http/routes/create-room.ts` to create a new room.
2. **Question Management**: Questions are created and fetched via `/http/routes/create-question.ts` and `/http/routes/get-room-questions.ts`.
3. **Audio Upload**: Audio chunks are uploaded to `/http/routes/upload-audio.ts` and processed/stored in the database.
4. **Database**: All persistent data (rooms, questions, audio) is managed via Drizzle ORM and PostgreSQL.
5. **AI Integration**: The `services/gemini.ts` file integrates with the Gemini API for AI-powered features.

## Key Files and Code

### `src/server.ts`

Main entry point. Sets up the HTTP server, loads environment variables, and registers routes.

```ts
import { app } from "./http/app";
import { env } from "./env";

app.listen(env.PORT || 3333, () => {
  console.log(`Server running on port ${env.PORT || 3333}`);
});
```

### `src/env.ts`

Loads and validates environment variables using Zod.

```ts
import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GEMINI_API_KEY: z.string(),
  FRONTEND_URL: z.string(),
  PORT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

### `src/db/`

- **connection.ts**: Sets up the database connection using Drizzle ORM.
- **seed.ts**: Seeds the database with initial data.
- **migrations/**: SQL migration files for schema changes.
- **schema/**: TypeScript schema definitions for tables (rooms, questions, audio-chunks).

### `src/http/routes/`

- **create-room.ts**: Handles room creation requests.
- **create-question.ts**: Handles question creation for a room.
- **get-room-questions.ts**: Fetches all questions for a room.
- **get-rooms.ts**: Lists all available rooms.
- **upload-audio.ts**: Handles audio file uploads and processing.

### `src/services/gemini.ts`

Integrates with the Gemini API for AI features (e.g., question answering, audio analysis).

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: API key for Gemini AI
- `FRONTEND_URL`: URL of the frontend application
- `PORT`: (optional) Port for the server (default: 3333)

## Deployment

- The backend is deployed on [Railway](https://railway.app/), allowing the frontend and backend to run independently.
- Ensure all environment variables are set in Railway's dashboard.
- Use `npm run build` to compile TypeScript, and `npm run start` to launch the server.

---

For more details, see the code in each file and the comments provided. Contributions and issues are welcome!
