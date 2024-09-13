/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:4ptACVhwGaN8@ep-empty-lab-a564kzot.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };