import { Github, Linkedin, Mail, Code } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { 
      label: "GitHub",
      icon: Github, 
      href: "https://github.com/anko2603" 
    },
    { 
      label: "LinkedIn",
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/ankitagautam0/" 
    },
    { 
      label: "LeetCode",
      icon: Code, 
      href: "https://leetcode.com/u/gautamankita2603/" 
    },
    { 
      label: "HackerRank",
      icon: Code, 
      href: "https://www.hackerrank.com/profile/gautamankita2603" 
    },
  ];

  return (
    <footer className="bg-black text-white py-24 px-6 md:px-12 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Let's build something<br/>
            <span className="text-white/40">extraordinary.</span>
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-md">
            I'm currently available for freelance and full-time opportunities. Let's connect!
          </p>
          <a 
            href="mailto:gautamankita2603@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
            data-testid="link-email"
          >
            <Mail className="w-4 h-4" />
            gautamankita2603@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-8 md:text-right">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">Socials</h4>
            <div className="flex gap-4 md:justify-end">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  data-testid={`link-${social.label.toLowerCase()}`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
             <h4 className="text-sm uppercase tracking-widest text-white/40 mb-2">Location</h4>
             <p className="text-white/80">Kanpur, Uttar Pradesh</p>
             <p className="text-white/40 text-sm mt-1">Local Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
        <p>© 2025 Ankita Gautam. All rights reserved.</p>
        <p>Designed & Developed with ❤️</p>
      </div>
    </footer>
  );
}
