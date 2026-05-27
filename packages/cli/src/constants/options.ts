export const FRAMEWORKS = [
  { title: 'Express', value: 'express' }
] as const;

export const ARCHITECTURES = [
  { title: 'Traditional', value: 'traditional' },
  { title: 'Modular Monolith', value: 'modular' }
] as const;

export const DATABASES = [
  { title: 'MongoDB', value: 'mongodb' },
  { title: 'PostgreSQL', value: 'postgres' }
] as const;

export const PACKAGE_MANAGERS = [
  { title: 'npm', value: 'npm' },
  { title: 'yarn', value: 'yarn' },
  { title: 'pnpm', value: 'pnpm' }
] as const;

export const FEATURES = [
  { title: 'Docker', value: 'docker' },
  { title: 'Swagger/OpenAPI', value: 'swagger' },
  { title: 'Authentication', value: 'auth' },
  { title: 'Unit Testing', value: 'testing' },
  { title: 'Redis', value: 'redis' },
  { title: 'Zod Validation', value: 'validation-zod' }
] as const;
