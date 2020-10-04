import { FC } from "react";
import {
  Apollographql,
  Graphql,
  ReactJs,
  Typescript,
  Html5,
  Css3,
  Sass,
  Javascript,
  Postgresql,
  Mysql,
  Mongodb,
  NodeDotJs,
  Trello,
  Github,
  Figma,
} from "@icons-pack/react-simple-icons";

type IconItem = {
  name: string;
  icon: FC;
};

// export enum IconColor {
//   "apollo" = "#311C87",
//   "react" = "#61DAFB",
//   "typescript" = "#007AAC",
//   "graphql" = "#E10098",
//   "nodejs" = "#339933",
//   "html" = "#E34F26",
//   "css" = "#1572B6",
//   "sass" = "#CC6699",
//   "vanillajs" = "#F7DF1E",
//   "postgresql" = "#336791",
//   "mysql" = "#4479A1",
//   "mongodb" = "#47A248",
// }

export const getIconsMap = (): Map<string, FC> => {
  const iconsMap = new Map<string, any>();
  const icons: IconItem[] = [
    { name: "apollo", icon: Apollographql },
    { name: "react", icon: ReactJs },
    { name: "typescript", icon: Typescript },
    { name: "graphql", icon: Graphql },
    { name: "nodejs", icon: NodeDotJs },
    { name: "html", icon: Html5 },
    { name: "css", icon: Css3 },
    { name: "sass", icon: Sass },
    { name: "vanillajs", icon: Javascript },
    { name: "postgresql", icon: Postgresql },
    { name: "mysql", icon: Mysql },
    { name: "mongodb", icon: Mongodb },
    { name: "trello", icon: Trello },
    { name: "github", icon: Github },
    { name: "figma", icon: Figma },
  ];
  icons.forEach((i) => {
    iconsMap.set(i.name, i.icon);
  });
  return iconsMap;
};
