import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Gauge,
  PlusCircle,
  Edit,
  HelpCircle,
  MessageSquare,
  Settings,
  Code,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Heart
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-200">
    <div className="mt-1">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h3 className="font-semibold text-lg text-blue-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, href }) => (
  <a 
    href={href} 
    target="_blank"  // Ensures link opens in a new tab
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-blue-500 hover:text-white text-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
  >
    <Icon className="h-5 w-5" />
  </a>
);

const QuickLink = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank"  // Ensures link opens in a new tab
    rel="noopener noreferrer" // Recommended for security reasons
    className="group flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300"
  >
    <span>{children}</span>
    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </a>
);

const Footer = () => (
  <footer className="mt-12 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      {/* Wave Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="space-y-10 text-left md:text-left">
          <h3 className="font-bold text-xl text-green-900 flex items-center gap-2">
            Interview Prep AI
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </h3>
          
        </div>
        
        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-green-900">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <QuickLink href="#">Getting Started Guide</QuickLink>
            </li>
            <li>
              <QuickLink href="https://neetcode.io/">Practice Questions Bank</QuickLink>
            </li>
            <li>
              <QuickLink href="#">Success Stories</QuickLink>
            </li>
            <li>
              <QuickLink href="https://github.com/ashishps1/awesome-system-design-resources">Career Resources</QuickLink>
            </li>
          </ul>
        </div>
        
        {/* Connect Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-green-900">Stay Connected</h3>
          <p className="text-gray-600 mb-4">
            Join our community of successful job seekers
          </p>
          <div className="flex space-x-3">
            <SocialLink icon={Github} href="https://github.com/Dalimi-02" />
            <SocialLink icon={Twitter} href="https://x.com/DalimiSonowal" />
            <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/dalimi-sonowal-701457235/" />
            <SocialLink icon={Mail} href="mailto:dalimisonowal33@gmail.com" />
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Interview Prep AI. All rights reserved.
          </p>
          
        </div>
      </div>
    </div>
  </footer>
);

export default function HowItWorks() {
  const features = [
    {
      icon: Gauge,
      title: "Access Dashboard",
      description: "Navigate to your personalized dashboard from the homepage"
    },
    {
      icon: PlusCircle,
      title: "Create Interview",
      description: "Start a new mock interview session with one click"
    },
    {
      icon: Edit,
      title: "Configure Details",
      description: "Customize the interview by specifying job role, description, and experience level"
    },
    {
      icon: HelpCircle,
      title: "Mock Interview",
      description: "Receive AI-generated questions tailored to your profile"
    },
    {
      icon: MessageSquare,
      title: "Get Instant Feedback",
      description: "Receive detailed feedback and suggestions after each response"
    },
    {
      icon: Settings,
      title: "System Design Practice",
      description: "Master system design concepts with interactive challenges"
    },
    {
      icon: Code,
      title: "Code Practice",
      description: "Enhance your technical skills with coding exercises"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-blue-600">
            How It Works
          </CardTitle>
          <p className="mt-4 text-lg text-gray-600">
            Prepare for your next job interview with our AI-powered platform!
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg text-blue-600 italic">
              Start your preparation today and approach your interviews with confidence!
            </p>
          </div>

          <Footer />
        </CardContent>
      </Card>
    </div>
  );
}
