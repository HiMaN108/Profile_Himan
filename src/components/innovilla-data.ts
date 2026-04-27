import {
  Globe,
  MapPin,
  QrCode,
  Wallet,
  CreditCard,
  Warehouse,
  Package,
  Navigation,
  Zap,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MissionStatus = "ACTIVE" | "SHIPPED" | "PROTOTYPE";

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  status: MissionStatus;
  role: string;
  timeline: string;
  objective: string;
  impact: string;
  liveUrl: string;
  techStack: string[];
  videoUrl?: string;
  pdfUrl?: string;
  dataLogs: { name: string; url: string }[];
  features: { name: string; icon: LucideIcon; detail: string }[];
  intelReport: {
    problem: string;
    execution: string;
    aftermath: string;
  };
  accentColor: string;
}

export interface Company {
  name: string;
  url: string;
  logo: string;
  joinDate: string;
  endDate?: string;
  role: string;
  isCurrent: boolean;
  workMode: "remote" | "onsite" | "hybrid";
  missions: Mission[];
}

export const innovillaCompany: Company = {
  name: "Innovilla Private Limited",
  url: "https://innovilla.in/",
  logo: "/images/innovilla_logo.png",
  joinDate: "June 2025",
  endDate: "October 2025",
  role: "Software Developer Intern",
  isCurrent: false,
  workMode: "onsite",
  missions: [
    {
      id: "clearo",
      title: "Clearo",
      subtitle: "Subscription-Based RO Purifier Rental Platform",
      status: "SHIPPED",
      role: "Frontend Developer",
      timeline: "Jun 2025 — Jul 2025",
      objective:
        "Worked on the static website for Clearo, a company vertical platform offering subscription-based and rental RO water purifier systems.",
      impact: "Fully Built & Deployed",
      liveUrl: "https://clearro.com/",
      techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      dataLogs: [],
      features: [
        {
          name: "Static Pages & Landing",
          icon: Globe,
          detail:
            "Worked on the complete static website including product pages, pricing, subscription plans, and contact sections.",
        },
        {
          name: "Responsive Design",
          icon: Zap,
          detail:
            "Ensured the website works seamlessly across all screen sizes — desktop, tablet, and mobile.",
        },
      ],
      intelReport: {
        problem:
          "Clearo needed a clean, professional web presence to showcase their RO purifier subscription and rental service. The site needed to clearly communicate pricing, plans, and service areas to drive customer conversions.",
        execution:
          "Worked on the static pages for the website with a focus on clean UI, fast loading, and clear CTAs for subscription sign-ups. Built responsive layouts that work across all devices.",
        aftermath:
          "The website is fully built and deployed at clearro.com, serving as the primary digital storefront for the Clearo RO purifier rental service.",
      },
      accentColor: "var(--cyan)",
    },
    {
      id: "wish-delivery",
      title: "Wish Delivery App",
      subtitle: "Android Delivery App with Live Tracking & Relay System",
      status: "PROTOTYPE",
      role: "Flutter Developer",
      timeline: "Jul 2025 — Aug 2025",
      objective:
        "Worked on a prototype delivery application in Flutter with rider KYC, live GPS tracking, zone-based delivery routing, and a relay system for cross-zone orders.",
      impact: "Prototype Complete",
      liveUrl: "",
      techStack: [
        "Flutter",
        "Google Maps API",
        "Geolocation",
        "Firebase",
        "REST APIs",
      ],
      dataLogs: [],
      features: [
        {
          name: "Rider KYC Verification",
          icon: FileText,
          detail:
            "Worked on the complete KYC flow for rider/delivery boy onboarding including document upload, verification status, and approval workflow.",
        },
        {
          name: "Live GPS Tracking",
          icon: MapPin,
          detail:
            "Integrated Google Maps API and geolocation for real-time live tracking of riders, showing their position on the map during deliveries.",
        },
        {
          name: "Zone-Based Delivery & Relay",
          icon: Navigation,
          detail:
            "Worked on zone-based delivery routing where riders operate within assigned zones. For cross-zone orders, introduced a relay-based system to reduce rider distance by handing off between zones.",
        },
        {
          name: "Rider Wallet System",
          icon: Wallet,
          detail:
            "Worked on the wallet system for riders to collect cash on delivery, manage cash overflow limits, and handle settlements.",
        },
      ],
      intelReport: {
        problem:
          "The delivery operations needed a dedicated mobile app for riders with proper KYC verification, real-time location tracking, and intelligent routing. Cross-zone deliveries were inefficient with single riders covering long distances.",
        execution:
          "Worked on the Flutter Android application with rider KYC onboarding, integrated Google Maps API for live GPS tracking, and designed a zone-based delivery system. For orders crossing zone boundaries, implemented a relay-based handoff system that splits the delivery between zone riders, significantly reducing individual rider distances. Also built a wallet system for cash collection and overflow management.",
        aftermath:
          "The prototype was completed with all core features functional — KYC, live tracking, zone routing, relay handoffs, and wallet management. The system validated the concept of relay-based cross-zone delivery for reducing rider workload.",
      },
      accentColor: "var(--green)",
    },
    {
      id: "sellio",
      title: "Sellio.in",
      subtitle: "Local-First E-Commerce Platform for Indian Sellers",
      status: "SHIPPED",
      role: "Full Stack Developer",
      timeline: "Aug 2025 — Oct 2025",
      objective:
        "Worked as a full stack developer on Sellio, a local-first e-commerce platform empowering small businesses and local sellers to sell online — handling Razorpay integration, seller accounts, Delhivery warehousing, and the complete order-to-delivery pipeline.",
      impact: "Live E-Commerce Platform",
      liveUrl: "https://sellio.in/",
      techStack: [
        "Next.js",
        "Laravel",
        "Razorpay",
        "Delhivery API",
        "QR Code",
        "REST APIs",
      ],
      dataLogs: [
        { name: "Sellio_Traffic_Report.pdf", url: "https://drive.google.com/file/d/19ffRPlYIBTsc8NET8TrVeOSoVyXetioY/view?usp=sharing" },
        { name: "Contributors Hub (My Name Listed)", url: "https://sellio.in/contributors-hub" },
      ],
      features: [
        {
          name: "Razorpay Payment Integration",
          icon: CreditCard,
          detail:
            "Integrated Razorpay for seamless payment processing across the platform, handling transactions, refunds, and payment lifecycle.",
        },
        {
          name: "Seller Fast Payout System",
          icon: Zap,
          detail:
            "Worked on seller account creation for faster payouts — reduced the standard 7-day pay cycle to 3–4 day account settlements, improving seller cash flow.",
        },
        {
          name: "Delhivery Warehouse Integration",
          icon: Warehouse,
          detail:
            "Integrated Delhivery API for warehouse creation, enabling sellers to set up faster pickup and drop logistics for their products.",
        },
        {
          name: "QR-Based Seller Registration",
          icon: QrCode,
          detail:
            "Worked on a unique QR code based seller account registration flow for quick and verified onboarding of new sellers.",
        },
        {
          name: "Order-to-Delivery Pipeline",
          icon: Package,
          detail:
            "Worked on the complete order creation to delivery system — from customer checkout to seller notification, packaging, pickup, and final delivery tracking.",
        },
      ],
      intelReport: {
        problem:
          "Millions of local sellers in India struggle to go digital. Sellio needed a platform that makes online selling simple, fair, and growth-driven — connecting merchants with nearby buyers first, then expanding to regional and national markets.",
        execution:
          "Worked as a full stack developer using Next.js for the frontend and Laravel for the backend APIs. Integrated Razorpay for payments and implemented faster seller payouts (reducing from 7 days to 3–4 days). Set up Delhivery API for warehouse creation and logistics. Built a QR-based seller registration flow and the complete order-to-delivery pipeline.",
        aftermath:
          "Sellio is live at sellio.in as a fully operational e-commerce platform helping local sellers step into the digital marketplace while retaining their local identity and customer trust. My contribution is recognized on the official contributors page at sellio.in/contributors-hub.",
      },
      accentColor: "var(--valorant-red)",
    },
  ],
};
