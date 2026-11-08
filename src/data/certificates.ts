import { CertificateData } from "@/types";

export const certificates: CertificateData[] = [
  {
    id: "cert-slot-1",
    title: "Certified Computer & Network Engineering",
    issuer: "Issued by BNSP",
    category: "engineering",
    status: "completed",
    summary: "Achieved the Certificate of Competence in Computer and Network Engineering (Teknik Komputer dan Jaringan - KKNI Level II) issued by the Badan Nasional Sertifikasi Profesi (BNSP), the Indonesian Professional Certification Authority. This nationally recognized certification validates competency in the field of Network Infrastructure, Routing & Switching Configuration, and Network Security Monitoring.",
    date: "2026",
    previewImage: "/certificates/bnsp.png",
    credentialUrl: "https://drive.google.com/file/d/11tnMIT9PrOYkyGUM9_U2scrTRc3MRUjx/view?usp=sharing"
  },

  {
    id: "cert-slot-2",
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
    id: "cert-slot-3",
    title: "Javascript",
    issuer: "Issued by freecodecamp",
    category: "web",
    status: "completed",
    summary: "Earned the JavaScript Developer Certification issued by freeCodeCamp. This professional certification validates a comprehensive mastery of programming logic, data structures, and modern development processes using the JavaScript programming language.",
    date: "2026",
    previewImage: "/certificates/js.png",
    credentialUrl: "https://drive.google.com/file/d/1kB-NFAHrrKqplvgDm2gDvJHIOpVmFbhX/view?usp=drive_link"
  },
];
