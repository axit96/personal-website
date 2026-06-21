export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  role: string;
  duration: string;
  highlights: string[];
}

export interface Certificate {
  title: string;
  slug: string;
  issuer: string;
  icon: string;
  color: string;
  date: Date;
  filename: string;
}

export const skillCategories = [
  {
    name: 'Programming Languages',
    icon: '💻',
    skills: ['Java', 'Python', 'TypeScript', 'HTML5', 'CSS3'],
    color: '#2563eb',
  },
  {
    name: 'Frameworks & Libraries',
    icon: '⚙️',
    skills: ['Spring Boot', 'Spring REST/Data JPA', 'Angular', 'TensorFlow', 'Keras'],
    color: '#7c3aed',
  },
  {
    name: 'Databases',
    icon: '🗄️',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Couchbase'],
    color: '#059669',
  },
  {
    name: 'DevOps & Testing',
    icon: '🚀',
    skills: ['Git', 'Maven & Gradle', 'Jenkins', 'GitHub Actions', 'SonarQube', 'JUnit', 'Karma-Jasmine'],
    color: '#d97706',
  },
];

export const experience = [
  {
    title: 'Fullstack Software Engineer',
    company: 'Infosys Limited',
    startYear: 'Oct 2021',
    endYear: 'Present',
    description: 'Full stack software development across multiple enterprise-scale projects — designing APIs, building frontend interfaces, optimizing databases, and modernizing legacy systems for performance and maintainability.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Mainframe Modernization',
    description: 'Analyzed COBOL-to-Java Spring Boot code via AWS Blu Age. Developed stub programs with REST Template as REST APIs.',
    detailedDescription: 'Led the modernization of a legacy mainframe system by analyzing COBOL programs and transforming them into Java Spring Boot microservices using AWS Blu Age. Designed and developed stub programs that simulated mainframe behavior, exposing them as REST APIs for seamless integration with modern frontend applications. Created Liquibase migration scripts to manage database schema changes across environments. Implemented AWS CloudWatch alarms and dashboards for proactive monitoring of application health and performance. Collaborated with cross-functional teams to ensure zero-downtime deployment and data integrity throughout the migration process.',
    technologies: ['Java', 'Spring Boot', 'AWS Blu Age', 'Liquibase', 'AWS CloudWatch', 'REST APIs', 'COBOL'],
    role: 'Full Stack Developer',
    duration: '8 months',
    highlights: [
      'Successfully migrated 40+ COBOL programs to Java microservices',
      'Reduced legacy system maintenance costs by 60%',
      'Achieved 99.9% uptime during cutover',
      'Implemented comprehensive monitoring reducing incident response time by 70%',
    ],
  },
  {
    id: 2,
    title: 'Client Setup Utility (CSU) Localization',
    description: 'Localized CSU application for RBI data residency compliance with Kafka-based cross-region replication.',
    detailedDescription: 'Spearheaded the localization of the Client Setup Utility (CSU) application to comply with RBI data residency regulations requiring all customer data to remain within Indian borders. Architected and implemented a Kafka-based replication pipeline to synchronize data between US and India regions while ensuring complete data isolation. Conducted extensive end-to-end testing using Kibana for log analysis and troubleshooting. Worked closely with the security team to implement encryption at rest and in transit, ensuring compliance with financial data protection standards. Performed load testing to validate system performance under peak transaction volumes.',
    technologies: ['Kafka', 'Java', 'Spring Boot', 'Kibana', 'Elasticsearch', 'REST APIs', 'Angular'],
    role: 'Software Engineer',
    duration: '6 months',
    highlights: [
      'Achieved full RBI compliance ahead of regulatory deadline',
      'Designed Kafka replication handling 10K+ messages/second',
      'Reduced data synchronization latency from 5 minutes to under 2 seconds',
      'Zero data loss during cross-region replication',
    ],
  },
  {
    id: 3,
    title: 'Correspondent Lending as a Service (CLaaS)',
    description: 'Led a 6-member team designing microservice architectures and Angular components with RESTful APIs and CI/CD deployment.',
    detailedDescription: 'Served as lead developer for a Correspondent Lending as a Service (CLaaS) platform, handling a 6-member team for seamless development, deployment, testing, and bug fixing across the full delivery lifecycle. Designed and implemented microservice architectures with Spring Boot, ensuring loose coupling and high scalability. Developed reusable Angular components for the frontend, including dynamic form builders and real-time loan status dashboards. Built comprehensive RESTful APIs with thorough JUnit test coverage exceeding 90%. Integrated AWS S3 for secure document storage and retrieval. Automated deployments using Jenkins pipelines on OpenShift, reducing release cycles from weeks to days.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'AWS S3', 'Jenkins', 'OpenShift', 'JUnit', 'REST APIs'],
    role: 'Lead Developer',
    duration: '12 months',
    highlights: [
      'Led a 6-member team through seamless development, deployment, testing, and bug fixing',
      'Designed and implemented over 15+ screens and 4+ different workflows',
      'Achieved 90%+ code coverage with JUnit, Karma-Jasmin and integration tests',
      'Reduced deployment cycle from 2 weeks to 2 days via CI/CD automation',
    ],
  },
  {
    id: 4,
    title: 'Weather Forecasting using Time Series Dataset',
    description: 'Designed ML/DL models (ANN, CNN, RNN, LSTM, SVM, Random Forest, KNN) for multi-year weather forecasting.',
    detailedDescription: 'Designed and implemented multiple machine learning and deep learning models for weather forecasting using a multi-year time series dataset. Developed and compared Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), Long Short-Term Memory (LSTM), Support Vector Machines (SVM), Random Forest, and K-Nearest Neighbors models. Applied comprehensive data preprocessing including handling missing values, feature scaling, and temporal feature engineering. Evaluated model performance using Mean Absolute Error (MAE) and Root Mean Square Error (RMSE) metrics. Conducted hyperparameter tuning using grid search and cross-validation to optimize each model architecture.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    role: 'AI/ML Engineer',
    duration: '4 months',
    highlights: [
      'LSTM model achieved lowest RMSE of 2.3% error rate across all models',
      'Processed and analyzed 10+ years of historical weather data',
      'Published results showing LSTM outperformed traditional ML by 25%',
      'Implemented automated data pipeline for real-time forecasting',
    ],
  },
];

export const certificates: Certificate[] = [
  {
    title: 'Deploy Agent with ADK',
    slug: 'deploy-agent-with-adk',
    issuer: 'Google',
    icon: '⚡',
    color: '#4285F4',
    date: new Date('2026-06-20'),
    filename: 'deploy-agent-with-adk.pdf',
  },
  {
    title: 'GitHub Copilot GH-300',
    slug: 'github-copilot-gh-300',
    issuer: 'Microsoft',
    icon: '💻',
    color: '#6C5CE7',
    date: new Date('2026-06-12'),
    filename: 'github-copilot-gh-300.pdf',
  },
  {
    title: 'AWS Transform — Mainframe Advanced',
    slug: 'aws-transform-mainframe-advanced',
    issuer: 'Amazon Web Services',
    icon: '🖥️',
    color: '#FF7675',
    date: new Date('2026-04-09'),
    filename: 'aws-transform-mainframe-advanced.pdf',
  },
  {
    title: 'Insta Award — Infosys 2026',
    slug: 'insta-award-infosys-2026',
    issuer: 'Infosys',
    icon: '🏆',
    color: '#FDCB6E',
    date: new Date('2026-04-01'),
    filename: 'insta-award-infosys-2026.pdf',
  },
  {
    title: 'API Technology Ecosystem',
    slug: 'api-technology-ecosystem',
    issuer: 'Infosys',
    icon: '🌐',
    color: '#74B9FF',
    date: new Date('2026-01-01'),
    filename: 'api-technology-ecosystem.pdf',
  },
  {
    title: 'Infosys L2 — Java Programmer',
    slug: 'infosys-l2-java-programmer',
    issuer: 'Infosys',
    icon: '☕',
    color: '#E17055',
    date: new Date('2025-09-19'),
    filename: 'infosys-l2-java-programmer.pdf',
  },
  {
    title: 'AWS Blu Age — Level 2',
    slug: 'aws-blu-age-level-2',
    issuer: 'Amazon Web Services',
    icon: '☁️',
    color: '#A29BFE',
    date: new Date('2025-09-04'),
    filename: 'aws-blu-age-level-2.pdf',
  },
  {
    title: 'Gen AI — Professional Foundation',
    slug: 'gen-ai-professional-foundation',
    issuer: 'Infosys',
    icon: '🧠',
    color: '#55EFC4',
    date: new Date('2025-06-17'),
    filename: 'gen-ai-professional-foundation.pdf',
  },
];

export const education = [
  {
    degree: 'Master of Technology (M.Tech)',
    school: 'National Institute of Technology, Goa',
    year: '2019-2021',
    field: 'Computer Science',
  },
  {
    degree: 'Bachelor of Engineering (BE)',
    school: 'Parul Institute of Engineering and Technology',
    year: '2014-2018',
    field: 'Computer Engineering',
  },
];

export const contact = {
  email: 'akshitvaishnav96@gmail.com',
  github: 'https://github.com/axit96',
  linkedin: 'https://www.linkedin.com/in/axit96/',
};
