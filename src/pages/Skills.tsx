import { motion } from 'framer-motion'
import { useState } from 'react'
import resume from '../data/resume.json'
import SkillCard from '../components/SkillCard'

export default function Skills() {
  const { skills } = resume

  // Define categories with the exact labels you provided
  const CATEGORIES: Record<string, string[]> = {
    'Methodology': ['SDLC', 'Waterfall', 'Agile'],
    'Front-End': ['React', 'Angular 17', 'Next.js', 'TypeScript', 'Redux Toolkit', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ajax'],
    'Back-End & Middleware': ['Java 17+', 'Spring Boot 3', 'Spring Cloud', 'Microservices', 'WebFlux', 'Hibernate', 'J2EE', 'JDBC', 'Node.js', 'Express.js', 'Python (Flask)', 'ASP.NET', 'gRPC', 'GraphQL', 'WebSockets', 'API Gateway', 'OpenAPI'],
    'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis', 'Cassandra', 'Firebase', 'Apache Kafka', 'RabbitMQ', 'Apache Spark', 'Apache Airflow'],
    'Cloud & DevOps': ['AWS', 'AWS Lambda', 'AWS ECS', 'AWS EKS', 'AWS S3', 'AWS RDS', 'AWS API Gateway', 'AWS CloudFormation', 'Azure', 'AKS', 'Azure Functions', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'GitHub Actions', 'ArgoCD', 'Jenkins', 'CI/CD pipelines'],
    'Testing & Security': ['JUnit 5', 'TestNG', 'Mockito', 'Selenium', 'Cucumber', 'Pact (Contract Testing)', 'Cypress', 'OAuth2', 'JWT', 'Keycloak', 'Spring Security', 'SonarQube', 'Zero Trust Security'],
    'Monitoring & Observability': ['Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger', 'ELK'],
    'Tools': ['Git', 'Visual Studio Code', 'Postman', 'Swagger', 'Nginx', 'JIRA', 'Confluence', 'Linux (Bash)'],
    'Programming Languages': ['C#', 'Python', 'Tornado', 'Java', 'C++', 'JavaScript (ES6+)'],
    'Other Tools and Technologies': ['RLM', 'Light Speed', 'Harness', 'OpenShift', 'Fluent Library', 'Azure Databricks', 'Vue.js', 'AppDynamics', 'Formik', 'Splunk', 'WebSockets', 'moment.js', 'Bitbucket', 'Zenhub', 'TFS', 'SQL Server', 'Oracle', 'SOAP', 'RESTful', 'SVN', 'GitLab', 'Maven', 'Gradle', 'Ant']
  }

  // Intersect resume skills with each category list to ensure we only show skills present
  const grouped = Object.entries(CATEGORIES).map(([cat, list]) => {
    const items = list.filter((l) => skills.includes(l))
    return { cat, items }
  }).filter(({ items }) => items.length > 0)

  // Show-more per category (compact by default)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const initialVisible = { xs: 8, md: 12 }

  return (
    <main className="container-safe py-10 space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-[var(--muted)]">Technologies and tools grouped for a clearer view.</p>
        </div>
      </header>

      <section className="space-y-10">
        {grouped.map(({ cat, items }) => {
          const isOpen = !!expanded[cat]
          // Decide how many to show before expand
          const maxBefore = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? initialVisible.md : initialVisible.xs
          const visibleItems = isOpen ? items : items.slice(0, maxBefore)

          return (
            <div key={cat} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{cat}</h2>
                {items.length > maxBefore && (
                  <button
                    className="text-sm rounded border border-white/10 px-3 py-1.5 hover:border-white/20"
                    onClick={() => setExpanded((e) => ({ ...e, [cat]: !isOpen }))}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.05 } } }}
                className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {visibleItems.map((s) => (
                  <motion.div key={s} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                    <SkillCard name={s} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
