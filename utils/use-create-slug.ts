export const useCreateSlug = (str: string) => {
  return str?.replace(/\s+/g, '-').replace('/', '').toLowerCase()
}
