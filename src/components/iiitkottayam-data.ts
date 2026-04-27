import {
  Cpu,
  Activity,
  Droplets,
  Database,
} from "lucide-react";
import type { Company } from "./innovilla-data";

export const iiitKottayamCompany: Company = {
  name: "IIIT Kottayam",
  url: "https://www.iiitkottayam.ac.in/#!/home",
  logo: "/images/IIIT_kottayam_logo.jpg",
  joinDate: "May 2023",
  endDate: "August 2023",
  role: "Summer Research Intern",
  isCurrent: false,
  workMode: "hybrid",
  missions: [
    {
      id: "smart-irrigation",
      title: "IoT-based Smart Irrigation Devices",
      subtitle: "Automated Sensor-Driven Agricultural System",
      status: "SHIPPED",
      role: "Summer Research Intern — Under Dr. Panchami V",
      timeline: "May 2023 — Aug 2023",
      objective:
        "This research project focuses on developing an IoT-based smart irrigation system using a Raspberry Pi single-board computer. The system is programmed with Python to interface with various environmental sensors, including soil moisture, temperature, and humidity sensors. The collected data is analyzed in real-time, enabling efficient monitoring and control of the irrigation process.",
      impact: "Research & Implementation",
      liveUrl: "", 
      videoUrl: "https://www.youtube.com/embed/e_dB83uS6lU", 
      techStack: [
        "Raspberry Pi",
        "Python",
        "IoT",
        "ThingSpeak",
        "Environmental Sensors",
        "Proteus PCB Simulator",
      ],
      dataLogs: [
        { name: "Project_Report.pdf", url: "https://drive.google.com/file/d/1E5aoXUp9wQzPg4uvU4UzmxIlcunOWjYn/view?usp=drive_link" },
        { name: "Completion_Certificate", url: "https://drive.google.com/file/d/187rQOdD9keZBOCLtiNHUbMsEA8X-ygTu/view?usp=sharing" },
        { name: "GitHub_Repository", url: "https://github.com/HiMaN108/IoT_project" },
        { name: "Faculty Profile (Dr. Panchami V)", url: "https://www.iiitkottayam.ac.in/#!/faculty/panchami" },
      ],
      features: [
        {
          name: "Proteus Circuit Simulation",
          icon: Cpu,
          detail:
            "Designed and simulated the IoT hardware architecture using Proteus PCB Design and Circuit Simulator Software for professional schematic capture.",
        },
        {
          name: "Real-time Data Collection",
          icon: Activity,
          detail:
            "The Raspberry Pi collects data from soil moisture, temperature, and humidity sensors continuously.",
        },
        {
          name: "Data Visualization & Analysis",
          icon: Database,
          detail:
            "Sensor data is transmitted to the ThingSpeak platform for real-time visualization as graphs, enabling efficient monitoring.",
        },
        {
          name: "Automated Irrigation Control",
          icon: Droplets,
          detail:
            "Based on the sensor data, the system automatically operates water pumps to maintain optimal soil moisture levels, ensuring efficient water usage.",
        },
      ],
      intelReport: {
        problem:
          "Traditional irrigation systems often lead to water wastage and require constant manual monitoring. There was a need for an automated, data-driven approach to maintain optimal soil conditions for agriculture.",
        execution:
          "Developed a complete IoT hardware solution using a Raspberry Pi. Interfaced soil moisture, temperature, and humidity sensors. Wrote Python scripts to collect and transmit this data to ThingSpeak for real-time tracking. Implemented control logic to trigger water pumps automatically when moisture levels drop below a specific threshold.",
        aftermath:
          "Successfully built and demonstrated a working prototype that automates the irrigation process based on real-time environmental data, significantly improving water usage efficiency.",
      },
      accentColor: "var(--cyan)",
    },
  ],
};


