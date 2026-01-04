'use client';

import { useCVStore } from '@/lib/store';
import { CVData } from '@/types/cv';

export default function SampleDataButton() {
  const { setCVData } = useCVStore();

  const loadSampleData = () => {
    const sampleCV: CVData = {
      personalInfo: {
        fullName: 'Sarah Anderson',
        email: 'sarah.anderson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        summary: 'Full-stack software engineer with 5+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and leading high-performing teams. Proven track record of delivering mission-critical projects on schedule.',
        profilePhoto: '',
      },
      experiences: [
        {
          id: '1',
          company: 'TechCorp Solutions',
          position: 'Senior Frontend Engineer',
          startDate: 'Mar 2022',
          endDate: 'Present',
          currentlyWorking: true,
          description: 'Led a team of 4 frontend engineers to rebuild the customer dashboard using React and TypeScript, improving load time by 60%. Implemented responsive design patterns resulting in 40% increase in mobile user engagement. Mentored 3 junior developers and established coding standards improving team productivity by 30%.',
        },
        {
          id: '2',
          company: 'StartupHub Inc.',
          position: 'Full Stack Developer',
          startDate: 'Jun 2020',
          endDate: 'Feb 2022',
          currentlyWorking: false,
          description: 'Built and deployed 5 full-stack features for SaaS platform using React, Node.js, and PostgreSQL. Reduced API response time by 50% through optimization and caching strategies. Collaborated with product team to design and implement user-facing features from concept to production.',
        },
        {
          id: '3',
          company: 'Creative Digital Agency',
          position: 'Junior Developer',
          startDate: 'Jan 2019',
          endDate: 'May 2020',
          currentlyWorking: false,
          description: 'Developed responsive websites and web applications for 15+ clients using HTML, CSS, JavaScript, and Vue.js. Implemented e-commerce functionality increasing client sales by average of 25%. Maintained and updated legacy codebases while gradually modernizing with current technologies.',
        },
      ],
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          graduationDate: 'May 2019',
          description: 'GPA: 3.7/4.0 • Dean\'s List (3 semesters) • President of Programming Club • Relevant Coursework: Data Structures, Algorithms, Web Development, Database Design',
        },
        {
          id: '2',
          institution: 'Community College of San Francisco',
          degree: 'Associate Degree',
          field: 'Information Technology',
          graduationDate: 'May 2017',
          description: 'GPA: 3.9/4.0 • Honor Roll • Scholarship Recipient',
        },
      ],
      skills: [
        { id: '1', name: 'React', level: 'expert' as const },
        { id: '2', name: 'TypeScript', level: 'advanced' as const },
        { id: '3', name: 'Node.js', level: 'advanced' as const },
        { id: '4', name: 'PostgreSQL', level: 'advanced' as const },
        { id: '5', name: 'AWS', level: 'intermediate' as const },
        { id: '6', name: 'Docker', level: 'intermediate' as const },
        { id: '7', name: 'Tailwind CSS', level: 'expert' as const },
        { id: '8', name: 'Git & GitHub', level: 'expert' as const },
        { id: '9', name: 'Team Leadership', level: 'advanced' as const },
        { id: '10', name: 'Agile Methodology', level: 'advanced' as const },
      ],
      projects: [
        {
          id: '1',
          title: 'E-Commerce Platform',
          description: 'Built a full-stack e-commerce platform using React, Node.js, and Stripe. Implemented shopping cart, product filtering, user authentication, and payment processing. The platform processes 500+ transactions monthly with 99.9% uptime. Features real-time inventory management and admin dashboard.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker', 'AWS'],
          link: 'https://github.com/sarah/ecommerce-platform',
          type: 'project' as const,
        },
        {
          id: '2',
          title: 'Task Management SaaS App',
          description: 'Developed a collaborative task management application with real-time updates using WebSockets. Supports team collaboration, file attachments, and integration with Slack. Deployed to production serving 100+ paying customers. Achieved 95% user retention rate.',
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io', 'AWS Lambda'],
          link: 'https://github.com/sarah/task-manager-saas',
          type: 'project' as const,
        },
        {
          id: '3',
          title: 'Personal Portfolio Website',
          description: 'Created a modern portfolio website showcasing projects and blog articles. Optimized for SEO and performance with 100 Lighthouse score. Integrated with Contentful CMS for easy content management. Built with Next.js and deployed on Vercel.',
          technologies: ['Next.js', 'Tailwind CSS', 'Contentful', 'Vercel'],
          link: 'https://sarah-portfolio.com',
          type: 'project' as const,
        },
        {
          id: '4',
          title: 'AWS Certified Solutions Architect - Professional',
          description: 'AWS Certified Solutions Architect Professional certification. Demonstrates advanced expertise in designing distributed systems on AWS, including EC2, S3, RDS, Lambda, and CloudFormation. Passed exam with 85% score.',
          technologies: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS Lambda', 'CloudFormation', 'VPC'],
          link: 'https://aws.amazon.com/certification/',
          type: 'certificate' as const,
        },
      ],
      designTemplate: 'modern',
      colorScheme: 'blue',
    };

    setCVData(sampleCV);
  };

  return (
    <button
      onClick={loadSampleData}
      className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium whitespace-nowrap"
      title="Load sample CV data to preview the application"
    >
      ✨ Load Sample
    </button>
  );
}
