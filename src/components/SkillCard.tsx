const ICONS: Record<string, string> = {
  // Web / Frontend
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  Angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Redux Toolkit': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',

  // Backend / Java
  'Java 17+': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'Spring Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  WebFlux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  Hibernate: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg',

  // Node / Python
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Python (Flask)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',

  // Data / APIs
  gRPC: '',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  Redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',

  // DevOps
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  Kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  Terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',

  // Testing / CI
  Jenkins: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
  Cypress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg',
  JUnit: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg',
  Selenium: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',

  // Observability
  Prometheus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
  Grafana: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg',
  ELK: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
}

function mapSkillToIcon(skill: string): string | undefined {
  if (ICONS[skill]) return ICONS[skill]
  // Fallbacks for similar names
  if (/java/i.test(skill)) return ICONS['Java 17+']
  if (/spring/i.test(skill)) return ICONS['Spring Boot']
  if (/react/i.test(skill)) return ICONS['React']
  if (/redux/i.test(skill)) return ICONS['Redux Toolkit']
  if (/tailwind/i.test(skill)) return ICONS['Tailwind CSS']
  if (/node/i.test(skill)) return ICONS['Node.js']
  if (/express/i.test(skill)) return ICONS['Express.js']
  if (/python|flask/i.test(skill)) return ICONS['Python (Flask)']
  if (/postgres/i.test(skill)) return ICONS['PostgreSQL']
  if (/mongo/i.test(skill)) return ICONS['MongoDB']
  if (/redis/i.test(skill)) return ICONS['Redis']
  if (/aws/i.test(skill)) return ICONS['AWS']
  if (/docker/i.test(skill)) return ICONS['Docker']
  if (/kubernetes|k8s/i.test(skill)) return ICONS['Kubernetes']
  if (/terraform/i.test(skill)) return ICONS['Terraform']
  if (/jenkins/i.test(skill)) return ICONS['Jenkins']
  if (/cypress/i.test(skill)) return ICONS['Cypress']
  if (/junit/i.test(skill)) return ICONS['JUnit']
  if (/selenium/i.test(skill)) return ICONS['Selenium']
  if (/prometheus/i.test(skill)) return ICONS['Prometheus']
  if (/grafana/i.test(skill)) return ICONS['Grafana']
  if (/elk|elastic/i.test(skill)) return ICONS['ELK']
  return undefined
}

export default function SkillCard({ name }: { name: string }) {
  const icon = mapSkillToIcon(name)

  return (
    <div className="group w-44 sm:w-48 shrink-0 rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-white/10 hover:border-white/20 transition hover:shadow-card">
      <div className="aspect-video bg-[var(--bg)]/70 grid place-items-center overflow-hidden">
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt={name} className="w-12 h-12 object-contain opacity-90 group-hover:scale-105 transition" />
        ) : (
          <div className="text-sm text-[var(--muted)]">{name.charAt(0)}</div>
        )}
      </div>
      <div className="p-3">
        <div className="text-sm font-medium line-clamp-1">{name}</div>
      </div>
    </div>
  )
}
