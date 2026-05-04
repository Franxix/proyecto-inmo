import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    adapter: undefined,
    url: process.env.DATABASE_URL,
  },
})