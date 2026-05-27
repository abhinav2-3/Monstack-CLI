export const validateProjectName = (name: string): string | boolean => {
  if (!name) return 'Project name is required';
  
  const isValid = /^[a-z0-9-_]+$/.test(name);
  if (!isValid) {
    return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
  }

  return true;
};
