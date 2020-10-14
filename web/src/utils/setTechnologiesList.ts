export const setTechnologiesList = (name: string, technologyList: string[]) => {
  const inputs = document.getElementsByName(name);
  inputs.forEach((i) => {
    i.innerHTML = "";
  });

  const datalist = document.createElement("datalist");
  datalist.id = "technologiesList";

  technologyList.sort().forEach((tech) => {
    const option = document.createElement("option");
    option.value = tech;
    datalist.appendChild(option);
  });

  inputs.forEach((i) => {
    i.setAttribute("list", datalist.id);
    i.appendChild(datalist);
  });
};
