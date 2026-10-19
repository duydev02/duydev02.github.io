import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Duy",
  EMAIL: "",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};
export const HOME: Metadata = {
  TITLE: "Một góc trời",
  DESCRIPTION: "Mình là Duy, một Java/backend dev ở TP. Hồ Chí Minh. Thích ngắm trời, nghe mưa, đọc sách và nghịch thêm với công nghệ.",
};
export const BLOG: Metadata = {
  TITLE: "Ghi chép",
  DESCRIPTION: "Vài điều đang học, đang thử và muốn ghi lại.",
};
export const PROJECTS: Metadata = {
  TITLE: "Mấy thứ mình nghịch",
  DESCRIPTION: "Một vài trang web và thử nghiệm nhỏ của Duy.",
};
export const SOCIALS: Socials = [
  { NAME: "GitHub", HREF: "https://github.com/duydev02" },
  { NAME: "LinkedIn", HREF: "https://www.linkedin.com/in/duy-hoang-minh" },
];
