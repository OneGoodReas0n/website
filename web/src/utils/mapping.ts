export const categoryNames: string[] = [
  "Backend",
  "Frontend",
  "Database",
  "Test",
  "Other",
];

export const statusName: string[] = ["In develop", "Completed", "Planned"];

export const mapCategoryNumByName = (
  name: string,
  categories: string[]
): number => {
  if (categories.indexOf(name) !== undefined) {
    return categories.indexOf(name);
  }
  return -1;
};

export const mapCategoryNameByNum = (
  num: number,
  categories: string[]
): string | null => {
  if (categories[num]) {
    return categories[num];
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
