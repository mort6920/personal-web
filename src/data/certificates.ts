import { CertificateData } from "@/types";

export const certificates: CertificateData[] = [
  {
    id: "cert-slot-1",
    title: "Intro to software engineering",
    issuer: "Issued by RevoU",
    category: "web",
    status: "completed",
    summary: "Earned a certificate of completion for the 'Intro to Software Engineering' course—a one-week, certified online program offered by RevoU. This certificate validates active participation and a grasp of the fundamentals of software engineering, while demonstrating an initial commitment to building a solid foundation in the field.",
    date: "2026",
    previewImage: "/certificates/se.png",
    credentialUrl: "https://drive.google.com/file/d/1-jiq4oQ5myCjnmjrgYI8mAX17_oAQ13b/view?usp=drive_link"
  },

  {
    id: "cert-slot-2",
    title: "Javascript",
    issuer: "Issued by freecodecamp",
    category: "web",
    status: "completed",
    summary: "Earned the JavaScript Developer Certification issued by freeCodeCamp. This professional certification represents the completion of the equivalent of 300 hours of programming training and validates a deep mastery of the logic, structure, and development processes based on the JavaScript programming language.",
    date: "2026",
    previewImage: "/certificates/js.png",
    credentialUrl: "https://drive.google.com/file/d/1kB-NFAHrrKqplvgDm2gDvJHIOpVmFbhX/view?usp=drive_link"
  },
];
