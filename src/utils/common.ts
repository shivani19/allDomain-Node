
export const commonModule = {
  getPagination: (page: Number, limit: Number) => {
    const climit = limit ? Number(limit) : 10;
    const offset = page ? Number(page) * climit : 0;

    return { climit, offset };
  }
}