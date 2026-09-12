import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { Section } from "@/components/layout/Section";

// Generate static routes at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article className="bg-bg-primary text-text-primary pt-24">
      {/* Project Hero */}
      <Section id="project-hero" className="pb-12 md:pb-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/#work" className="font-mono text-sm tracking-widest text-text-secondary hover:text-accent flex items-center mb-12 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO WORK
          </Link>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-12">
            {project.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-sm border-t border-border pt-8">
            <div>
              <span className="block text-text-tertiary mb-2">Role</span>
              <span className="text-text-primary">{project.role}</span>
            </div>
            <div>
              <span className="block text-text-tertiary mb-2">Year</span>
              <span className="text-text-primary">{project.year}</span>
            </div>
            <div className="col-span-2 md:col-span-2">
              <span className="block text-text-tertiary mb-2">Technologies</span>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {project.technologies.map(tech => (
                  <li key={tech} className="text-text-primary">{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Hero Visual */}
      <div className="w-full h-[60vh] md:h-[80vh] relative bg-bg-elevated">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="object-cover w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
        />
      </div>

      {/* Case Study Content */}
      <Section id="case-study" variant="light" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl md:text-3xl font-medium sticky top-32">The Problem</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-dark-muted leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl md:text-3xl font-medium sticky top-32">The Approach</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-dark-muted leading-relaxed">
                {project.caseStudy.approach}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl md:text-3xl font-medium sticky top-32">The Solution</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-dark-muted leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl md:text-3xl font-medium sticky top-32">The Outcome</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-dark-muted leading-relaxed">
                {project.caseStudy.outcome}
              </p>
              
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-4 mt-8">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm tracking-widest text-accent hover:text-accent-hover uppercase underline underline-offset-4">
                      Visit Live Site
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm tracking-widest text-text-dark hover:text-accent uppercase underline underline-offset-4">
                      View Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </Section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="py-24 bg-bg-primary">
          <div className="container mx-auto px-6 max-w-6xl space-y-24">
            {project.gallery.map((img, index) => (
              <figure key={index} className="w-full">
                <div className="relative w-full overflow-hidden bg-bg-elevated rounded-sm">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-4 font-mono text-xs text-text-tertiary tracking-wide uppercase text-center">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Project Navigation */}
      <div className="border-t border-border py-24 bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            
            {prev && (
              <Link href={`/work/${prev.slug}`} className="group flex-1">
                <span className="block font-mono text-xs tracking-widest text-text-tertiary uppercase mb-4 transition-colors group-hover:text-accent">
                  Previous Project
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-medium transition-transform origin-left group-hover:translate-x-2">
                  {prev.title}
                </h3>
              </Link>
            )}

            {next && (
              <Link href={`/work/${next.slug}`} className="group flex-1 text-right">
                <span className="block font-mono text-xs tracking-widest text-text-tertiary uppercase mb-4 transition-colors group-hover:text-accent">
                  Next Project
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-medium transition-transform origin-right group-hover:-translate-x-2">
                  {next.title}
                </h3>
              </Link>
            )}

          </div>
        </div>
      </div>
    </article>
  );
}
