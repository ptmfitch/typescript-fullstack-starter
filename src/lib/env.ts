import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
});

export default env;
