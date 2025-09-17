import { Icon } from '@iconify/react'

// Map specific skills to Iconify icon names (devicon or simple-icons preferred)
const ICONS: Record<string, string> = {
  // Frontend
  React: 'devicon:react',
  'Next.js': 'simple-icons:nextdotjs',
  'Angular 17': 'devicon:angular',
  TypeScript: 'devicon:typescript',
  'Redux Toolkit': 'devicon:redux',
  'Tailwind CSS': 'devicon:tailwindcss',
  HTML5: 'devicon:html5',
  CSS3: 'devicon:css3',
  Bootstrap: 'devicon:bootstrap',
  'Material-UI': 'simple-icons:mui',
  Ajax: 'mdi:ajax',
  'Vue.js': 'devicon:vuejs',
  Formik: 'simple-icons:formik',
  'moment.js': 'simple-icons:moment',

  // Backend / Java / Node / .NET
  'Java 17+': 'devicon:java',
  'Spring Boot 3': 'devicon:spring',
  'Spring Cloud': 'devicon:spring',
  WebFlux: 'devicon:spring',
  Hibernate: 'devicon:hibernate',
  J2EE: 'devicon:java',
  JDBC: 'mdi:database-cog-outline',
  'Node.js': 'devicon:nodejs',
  'Express.js': 'simple-icons:express',
  'Python (Flask)': 'devicon:flask',
  'ASP.NET': 'simple-icons:dotnet',
  gRPC: 'simple-icons:grpc',
  GraphQL: 'devicon:graphql',
  WebSockets: 'mdi:lan-connect',
  'API Gateway': 'mdi:api',
  OpenAPI: 'simple-icons:openapiinitiative',
  RESTful: 'mdi:api',
  SOAP: 'mdi:soap',

  // Databases / Messaging / Data
  PostgreSQL: 'devicon:postgresql',
  MySQL: 'devicon:mysql',
  MongoDB: 'devicon:mongodb',
  DynamoDB: 'simple-icons:amazondynamodb',
  Redis: 'devicon:redis',
  Cassandra: 'devicon:cassandra',
  Firebase: 'devicon:firebase',
  'SQL Server': 'simple-icons:microsoftsqlserver',
  Oracle: 'devicon:oracle',
  'Apache Kafka': 'simple-icons:apachekafka',
  RabbitMQ: 'simple-icons:rabbitmq',
  'Apache Spark': 'simple-icons:apachespark',
  'Apache Airflow': 'simple-icons:apacheairflow',

  // Cloud & DevOps
  AWS: 'devicon:amazonwebservices',
  'AWS Lambda': 'simple-icons:awslambda',
  'AWS ECS': 'simple-icons:amazonecs',
  'AWS EKS': 'simple-icons:amazoneks',
  'AWS S3': 'simple-icons:amazons3',
  'AWS RDS': 'simple-icons:amazonrds',
  'AWS API Gateway': 'simple-icons:amazonapigateway',
  'AWS CloudFormation': 'simple-icons:awscloudformation',
  Azure: 'devicon:azure',
  AKS: 'devicon:azure',
  'Azure Functions': 'simple-icons:azurefunctions',
  Docker: 'devicon:docker',
  Kubernetes: 'devicon:kubernetes',
  Terraform: 'devicon:terraform',
  Helm: 'simple-icons:helm',
  'GitHub Actions': 'simple-icons:githubactions',
  ArgoCD: 'simple-icons:argo',
  Jenkins: 'devicon:jenkins',
  'CI/CD pipelines': 'simple-icons:githubactions',
  OpenShift: 'simple-icons:redhatopenshift',
  Nginx: 'devicon:nginx',

  // Testing & Security
  'JUnit 5': 'devicon:junit',
  TestNG: 'simple-icons:testng',
  Mockito: 'simple-icons:mockito',
  Selenium: 'devicon:selenium',
  Cucumber: 'devicon:cucumber',
  'Pact (Contract Testing)': 'simple-icons:pact',
  Cypress: 'devicon:cypressio',
  OAuth2: 'mdi:lock-check',
  JWT: 'mdi:form-textbox-password',
  Keycloak: 'simple-icons:keycloak',
  'Spring Security': 'devicon:spring',
  SonarQube: 'simple-icons:sonarqube',
  'Zero Trust Security': 'mdi:shield-key',

  // Observability
  Prometheus: 'simple-icons:prometheus',
  Grafana: 'simple-icons:grafana',
  OpenTelemetry: 'simple-icons:opentelemetry',
  Jaeger: 'simple-icons:jaeger',
  ELK: 'simple-icons:elastic',
  AppDynamics: 'simple-icons:appdynamics',
  Splunk: 'simple-icons:splunk',

  // Tools
  Git: 'devicon:git',
  GitHub: 'devicon:github',
  GitLab: 'devicon:gitlab',
  Bitbucket: 'devicon:bitbucket',
  SVN: 'simple-icons:subversion',
  'Visual Studio Code': 'devicon:vscode',
  Postman: 'devicon:postman',
  Swagger: 'simple-icons:swagger',
  JIRA: 'devicon:jira',
  Confluence: 'simple-icons:confluence',
  'Linux (Bash)': 'devicon:bash',
  TFS: 'simple-icons:azuredevops',
  Zenhub: 'simple-icons:zenhub',
  Maven: 'devicon:maven',
  Gradle: 'devicon:gradle',
  Ant: 'simple-icons:apacheant',
  RLM: 'mdi:progress-wrench',
  Harness: 'simple-icons:harness',
  'Light Speed': 'mdi:speedometer',
  'Fluent Library': 'mdi:library',
  'Azure Databricks': 'simple-icons:databricks',

  // Languages / OS
  Java: 'devicon:java',
  'JavaScript (ES6+)': 'devicon:javascript',
  Python: 'devicon:python',
  'C#': 'devicon:csharp',
  'C++': 'devicon:cplusplus',
  Tornado: 'mdi:weather-windy',
  Windows: 'devicon:windows8',
  Linux: 'devicon:linux',
  Unix: 'mdi:console'
}

// Icons that are typically dark/monochrome on black backgrounds
const DARK_ICON_HINTS = [
  'simple-icons:', 'nextdotjs', 'express', 'mui', 'swagger', 'elastic', 'github', 'jira', 'confluence'
]

function normalizeName(name: string) {
  return name.replace(/\s*\(.*?\)/g, '').trim()
}

function fallbackIconFor(skill: string): string {
  const s = normalizeName(skill)
  // Heuristic fallbacks
  if (/angular/i.test(s)) return 'devicon:angular'
  if (/spring/i.test(s)) return 'devicon:spring'
  if (/junit/i.test(s)) return 'devicon:junit'
  if (/aws/i.test(s)) return 'devicon:amazonwebservices'
  if (/azure/i.test(s)) return 'devicon:azure'
  if (/kubernetes|k8s/i.test(s)) return 'devicon:kubernetes'
  if (/docker/i.test(s)) return 'devicon:docker'
  if (/mysql/i.test(s)) return 'devicon:mysql'
  if (/postgres/i.test(s)) return 'devicon:postgresql'
  if (/oracle/i.test(s)) return 'devicon:oracle'
  if (/redis/i.test(s)) return 'devicon:redis'
  if (/mongo/i.test(s)) return 'devicon:mongodb'
  if (/kafka/i.test(s)) return 'simple-icons:apachekafka'
  if (/rabbitmq/i.test(s)) return 'simple-icons:rabbitmq'
  if (/spark/i.test(s)) return 'simple-icons:apachespark'
  if (/airflow/i.test(s)) return 'simple-icons:apacheairflow'
  if (/graphql/i.test(s)) return 'devicon:graphql'
  if (/grpc/i.test(s)) return 'simple-icons:grpc'
  if (/react/i.test(s)) return 'devicon:react'
  if (/typescript/i.test(s)) return 'devicon:typescript'
  if (/javascript/i.test(s)) return 'devicon:javascript'
  // Generic dev icon
  return 'mdi:toolbox'
}

export default function SkillCard({ name }: { name: string }) {
  const direct = ICONS[name]
  const iconName = direct || fallbackIconFor(name)
  const isDark = DARK_ICON_HINTS.some(h => iconName.includes(h))

  return (
    <div className="group w-44 sm:w-48 shrink-0 rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-white/10 hover:border-white/20 transition hover:shadow-card">
      <div className="aspect-video bg-[var(--bg)]/70 grid place-items-center overflow-hidden">
        <div className={isDark ? 'bg-white rounded-full p-2' : ''}>
          <Icon icon={iconName} className={"w-12 h-12 " + (isDark ? 'text-black' : 'text-white')} />
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium line-clamp-1">{name}</div>
      </div>
    </div>
  )
}
