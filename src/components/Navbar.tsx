import { Menu, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "../assets/yogi.jpeg";

type Links = {
  github?: string;
  linkedin?: string;
  email?: string;
};

export default function Navbar({ name, title, links }: { name: string; title: string; links?: Links }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur border-b border-white/5">
      <div className="container-safe flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          {/* Avatar */}
          <img src={avatar} alt="Yogesh avatar" className="size-9 rounded-full object-cover" />
          <div>
            <div className="text-sm text-[var(--muted)]">{title}</div>
            <div className="text-lg font-semibold">{name}</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/resume" className="hover:text-white">Resume</Link>
          <Link to="/projects" className="hover:text-white">Projects</Link>
          <Link to="/experience" className="hover:text-white">Experience</Link>
          <Link to="/skills" className="hover:text-white">Skills</Link>
          <Link to="/education" className="hover:text-white">Education</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          {links?.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-white/5" aria-label="GitHub">
              <Github className="size-5" />
            </a>
          )}
          {links?.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-white/5" aria-label="LinkedIn">
              <Linkedin className="size-5" />
            </a>
          )}
          <button className="md:hidden p-2 rounded hover:bg-white/5" aria-label="Menu">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
