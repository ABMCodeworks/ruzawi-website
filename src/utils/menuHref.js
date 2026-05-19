import { slugify } from "./slugify";

const pageSectionMap = {
  "Welcome from the Headmaster": "/welcome-from-the-headmaster",
  "Why Ruzawi": "/why-ruzawi",
  "Tradition at Ruzawi": "/tradition-at-ruzawi",
  Governance: "/governance",
  Staff: "/staff",
  "Junior Masters & Mistresses": "/junior-masters-and-mistresses",

  "Ruzawi Magazines": "/magazines",
  Magazines: "/magazines",

  "Online Applications": "/online-applications",
  "Apply Now": "/online-applications",

  Contact: "/contact",
  "Contact Us": "/contact",

  "Ruzawi Old Pupils’ Association": "/ropa-and-alumni",
  "ROPA & Alumni": "/ropa-and-alumni",

  "Academics at Ruzawi": "/academic-life#academics-at-ruzawi",
  "Curriculum Support": "/academic-life#curriculum-support",
  "Kipper Department": "/academic-life#kipper-department",
  "Subject Teaching": "/academic-life#subject-teaching",
  "Ruzawi Library": "/academic-life#ruzawi-library",
  "Outdoor Education": "/academic-life#outdoor-education",

  "Dorm Life": "/boarding-life#dorm-life",
  "Kitchen, Housekeeping & Laundry":
    "/boarding-life#kitchen-housekeeping-laundry",
  "Pastoral Care": "/boarding-life#pastoral-care",
  "Ruzawi Families": "/boarding-life#ruzawi-families",
  "Ruzawi Sanatorium": "/boarding-life#ruzawi-sanatorium",

  Chapel: "/school-life#chapel",
  "Charities We Support": "/school-life#charities-we-support",
  "Leadership at Ruzawi": "/school-life#leadership-at-ruzawi",
  "Learning Knights Award": "/school-life#learning-knights-award",
  "RuzChats, Life Skills and The Chat Room":
    "/school-life#ruzchats-life-skills-and-the-chat-room",
  "World Peace Games": "/school-life#world-peace-games",

  "Sport at Ruzawi": "/sports-and-clubs#sport-at-ruzawi",
  "Clubs & Culture": "/sports-and-clubs#clubs",

  "Ruzawi Projects & Venture Capital": "/projects-and-venture-capital",
};

export function getMenuHref(label) {
  return pageSectionMap[label] || slugify(label);
}
