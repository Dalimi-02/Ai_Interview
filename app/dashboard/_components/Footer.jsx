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
    className="group flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300"
  >
    <span>{children}</span>
    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </a>
);
<footer className="mt-12 pt-8 bg-gray-200">
    <div className="max-w-4xl mx-auto px-4">
      {/* Wave Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="space-y-10 text-left md:text-left">
          <h3 className="font-bold text-xl text-green-900 flex items-center gap-2">
            Interview Prep AI 💻
            
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
              <QuickLink href="#">Practice Questions Bank</QuickLink>
            </li>
            <li>
              <QuickLink href="#">Success Stories</QuickLink>
            </li>
            <li>
              <QuickLink href="#">Career Resources</QuickLink>
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