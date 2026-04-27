import {
  Lightbulb,
  Eye,
  Navigation,
  Cpu,
  Bluetooth,
  FileText,
  Zap,
} from "lucide-react";
import type { Company } from "./innovilla-data";

export const iitBhuCompany: Company = {
  name: "IIT BHU",
  url: "https://www.iitbhu.ac.in/dept/cse/people/hariprabhatcse",
  logo: "/images/iit_logo_original.png",
  joinDate: "December 2024",
  endDate: "February 2025",
  role: "Product Research Intern",
  isCurrent: false,
  workMode: "onsite",
  missions: [
    {
      id: "stem-toy",
      title: "STEM Optical Sensor Toy",
      subtitle: "Color-Coded Programmable Toy for Kids (Age 5+)",
      status: "PROTOTYPE",
      role: "Product Research Intern — Under Dr. Hari Prabhat",
      timeline: "Dec 2024 — Feb 2025",
      objective:
        "Proposed and researched a model for a STEM-based wooden toy that uses optical color sensors to detect color-coded commands, adjust speed, and follow lines — offering screen-free coding for children aged 5+.",
      impact: "Research Model Proposed",
      liveUrl: "",
      techStack: [
        "Optical Sensors",
        "Line-Following Technology",
        "Gyroscope",
        "Accelerometer",
        "Microcontroller",
        "OzoBlockly",
      ],
      dataLogs: [
        { name: "Product_Survey_Research.pdf", url: "https://docs.google.com/document/d/1bIyNNWOxkZBAM-Ji3RrPIFkeetuQgLvIHzxO7gkcxbs/edit?usp=sharing" },
      ],
      features: [
        {
          name: "Color Code Detection",
          icon: Eye,
          detail:
            "Researched optical sensor systems that read color-coded commands drawn on paper or screens to guide toy actions — enabling screen-free programming for kids.",
        },
        {
          name: "Line Following System",
          icon: Navigation,
          detail:
            "Proposed infrared sensor-based line-following technology that enables the toy to navigate custom paths drawn by children.",
        },
        {
          name: "Command Execution Engine",
          icon: Cpu,
          detail:
            "Designed a microcontroller-based system that processes color codes to perform movements, speed adjustments, turns, and programmed sequences.",
        },
        {
          name: "Advanced Features (Proposed)",
          icon: Bluetooth,
          detail:
            "Researched advanced capabilities including block-based programming (OzoBlockly), Bluetooth connectivity, obstacle detection, and speed control based on optical color sensing.",
        },
      ],
      intelReport: {
        problem:
          "There is a growing need for STEM education tools that introduce young children (5+) to programming concepts without screens. The challenge was to research and propose a wooden toy model that uses optical sensors and color codes as a tangible coding interface.",
        execution:
          "Worked under Dr. Hari Prabhat at IIT BHU's CSE Department to research existing products like Ozobot and propose an improved model. Surveyed different STEM toy products in the market, analyzed their sensor technologies (optical, infrared, gyroscope, accelerometer), and proposed a two-pathway coding approach — screen-free Color Codes for beginners and block-based OzoBlockly programming for advanced learners.",
        aftermath:
          "Completed the initial research phase with a proposed model and product survey documentation. The project validated the feasibility of a color-code-driven STEM toy using optical sensors, line-following technology, and microcontroller-based command execution. The project remains in its initial research phase.",
      },
      accentColor: "var(--purple)",
    },
  ],
};
