export const DATA_SOURCE_MOCK = {
  getRepository: (repo: { name: unknown }) => {
    console.info(repo.name);
    return repo;
  },
};
