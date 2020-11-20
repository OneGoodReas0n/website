export const categoriesName: string[] = [
  "backend",
  "frontend",
  "database",
  "test",
  "other",
];

export const statusName: string[] = ["In develop", "Completed", "Planned"];

export const mapCategoryNumByName = (name: string): number => {
  switch (name) {
    case categoriesName[0]:
      return 0;
    case categoriesName[1]:
      return 1;
    case categoriesName[2]:
      return 2;
    case categoriesName[3]:
      return 3;
    case categoriesName[4]:
      return 4;
    default:
      return -1;
  }
};

export const mapCategoryNameByNum = (num: number): string | null => {
  if (categoriesName[num]) {
    return categoriesName[num];
  }
  return null;
};

export const mapStatusNumByName = (name: string): number | null => {
  switch (name) {
    case "In develop":
      return 0;
    case "Completed":
      return 1;
    case "Planned":
      return 2;
    default:
      return null;
  }
};

export const mapStatusByNum = (num: number): string | null => {
  if (statusName[num]) {
    return statusName[num];
  }
  return null;
};
