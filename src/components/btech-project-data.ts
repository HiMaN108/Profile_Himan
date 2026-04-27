import {
  ShieldAlert,
  Activity,
  Server,
  Network,
  Cpu,
} from "lucide-react";
import type { Company } from "./innovilla-data";

export const btechProjectData: Company = {
  name: "B.Tech Capstone Project",
  url: "",
  logo: "/images/btech_logo.png",
  joinDate: "2023",
  endDate: "2024",
  role: "Security Researcher",
  isCurrent: false,
  workMode: "onsite",
  missions: [
    {
      id: "ddos-mitigation",
      title: "DDoS Detection & Mitigation System",
      subtitle: "IP-based Network Security Research",
      status: "SHIPPED",
      role: "Supervised by Mr. Shubhendra Singh",
      timeline: "Final Year Project",
      objective: "Research into the detection and mitigation of IP-based Distributed Denial of Service (DDoS) attacks. The project proposes a comprehensive defense strategy utilizing traffic analysis, machine learning for anomaly detection, and simulated attack environments to test system resilience.",
      impact: "Cybersecurity Research",
      liveUrl: "",
      pdfUrl: "https://drive.google.com/file/d/1WJPS45gWxsaMlzWTC276iKiRap0c25Q6/preview",
      techStack: [
        "Wireshark",
        "Nagios",
        "Apache Server",
        "GoldenEye",
        "Machine Learning",
      ],
      dataLogs: [
        { name: "Project_Thesis.pdf", url: "https://drive.google.com/file/d/1WJPS45gWxsaMlzWTC276iKiRap0c25Q6/view?usp=drive_link" },
      ],
      features: [
        {
          name: "Network Monitoring & Analysis",
          icon: Activity,
          detail: "Utilized Wireshark for real-time packet capture and Nagios for monitoring network equipment and performance.",
        },
        {
          name: "Anomaly Detection (ML)",
          icon: Cpu,
          detail: "Applied statistical analysis and machine learning heuristics to establish baselines and detect traffic spikes or unusual flow patterns.",
        },
        {
          name: "Attack Simulation",
          icon: ShieldAlert,
          detail: "Simulated a DDoS attack environment using GoldenEye to generate attack traffic against a local Apache Server target to test resilience.",
        },
        {
          name: "Traffic Mitigation Strategy",
          icon: Network,
          detail: "Implemented traffic filtering, rate limiting, and traffic shaping to block malicious traffic while preserving resources for legitimate users.",
        },
      ],
      intelReport: {
        problem: "DDoS attacks involve using multiple compromised devices (botnets) to overwhelm a target host, rendering it unable to serve legitimate requests. This poses a significant threat to network availability and organizational stability.",
        execution: "Established a comprehensive defense strategy starting with network baseline establishment. Simulated DDoS attacks using GoldenEye against an Apache Server. Used Wireshark to analyze the traffic impact and implemented anomaly detection via machine learning to identify deviations.",
        aftermath: "Demonstrated that combining real-time traffic analysis, machine learning heuristics, and traffic shaping offers a robust defense against evolving DDoS landscapes, ultimately improving network availability and resilience.",
      },
      accentColor: "var(--valorant-red)",
    },
  ],
};
