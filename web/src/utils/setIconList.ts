import { IconColor } from "./iconsMap";

export const setIconList = (name: string) => {
  const iconNames = [];
  const inputs = document.getElementsByName(name);
  for (let iconName in IconColor) {
    iconNames.push(iconName);
  }
  const datalist = document.createElement("datalist");
  datalist.id = "icons";
  iconNames.sort();
  iconNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });

  inputs.forEach((input) => {
    input?.setAttribute("list", datalist.id);
    input?.appendChild(datalist);
  });
};
