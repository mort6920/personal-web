import { ProjectData } from "@/types";

export const projects: ProjectData[] = [
  {
    id: "assetra",
    title: "To do list",
    description: `A personal productivity dashboard built using plain HTML, CSS, and JavaScript — no frameworks, no backend. 

    To-Do List is a modern productivity web application designed to help users manage daily tasks, maintain focus through a built-in timer, and access various important links—all within a single, clean, and responsive interface.`,
    category: "daily",
    status: "in-progress",
    stack: ["HTML", "CSS", "JAVASCRIPT", "Localstorage"],
    previewImages: ["/images/to do list/to do list.png"],
    featured: true,
    githubUrl: "https://github.com/mort6920/revou-coding-camp.git",
    liveUrl: "https://to-do-listgacor.netlify.app/",
  },
  {
    id: "panen-pas",
    title: "weather app",
    description:
      `Weather App is a web-based weather forecasting application developed as one of the key challenges for the FreeCodeCamp JavaScript Certification. The application is designed to fetch and display real-time weather data through an intuitive and responsive interface.`,
    category: "daily",
    status: "live",
    stack: ["html", "css", "javascript"],
    previewImages: ["/images/weather app/wa.png"],
    featured: true,
    githubUrl: "https://github.com/mort6920/weather-app.git",
    liveUrl: "https://weatherappcihuy.netlify.app/",
  },
  {
    id: "bebas-qc",
    title: "Drum machine",
    description:
      `Drum Machine is an interactive, web-based music application developed as part of the requirements for the FreeCodeCamp JavaScript Certification challenge. The application allows users to play various drum sound samples in real-time by clicking on the interface or pressing keys on their keyboard.`,
    category: "web-development",
    status: "in-progress",
    stack: ["html", "css", "javascript"],
    previewImages: ["/images/drum machine/a1.png"],
    featured: true,
    githubUrl: "https://github.com/mort6920/drum-machine.git",
    liveUrl: "https://beatboxcihuy.netlify.app/",
  },
  // {
  //   id: "auth-attack-simulator",
  //   title: "Auth Attack Simulator",
  //   description:
  //     "Simulation suite for brute force, token replay, and MFA bypass defense testing.",
  //   category: "security",
  //   status: "archived",
  //   stack: ["python", "docker", "redis"],
  //   previewImage: "/assets/gerald.webp",
  //   githubUrl: "https://github.com/yourusername/auth-attack-simulator",
  // },
];
