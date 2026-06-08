import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  role: string;
  duration: string;
  highlights: string[];
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [ReactiveFormsModule],
})
export class ProfilePage implements OnInit, OnDestroy {
  protected scrollIndicator = true;
  protected selectedProject: Project | null = null;

  constructor(private fb: FormBuilder) {}

  protected openProject(project: Project): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  protected closeProject(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.Escape')
  protected onEscape(): void {
    if (this.selectedProject) {
      this.closeProject();
    }
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (this.scrollIndicator) {
      this.scrollIndicator = false;
    }
  }

  readonly name = 'Akshit Vaishnav';
  readonly headline = 'Digital Specialist Engineer (Software Engineer 2) | Java FullStack | AI/ML/Gen-AI Enthusiast';

  get yearsOfExperience(): string {
    const start = new Date('2021-10-18');
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return (totalMonths / 12).toFixed(1);
  }

  get summary(): string {
    return `Full Stack Java Engineer with ${this.yearsOfExperience}+ years of experience at Infosys, specializing in Core Java, Spring Boot API development, Angular UI integration, and enterprise microservices including Kafka framework.`;
  }

  readonly skillCategories = [
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

  readonly experience = [
    {
      title: 'Digital Specialist Engineer (Full Stack Java + Angular + DB)',
      company: 'Infosys Limited',
      startYear: 'Oct 2021',
      endYear: 'Present',
      description: 'Full Stack Java + Angular + DB development across multiple enterprise projects including mainframe modernization, data localization, and lending services.',
    },
  ];

  readonly projects: Project[] = [
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

  readonly education = [
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

  readonly contact = {
    email: 'akshitvaishnav96@gmail.com',
    github: 'https://github.com/axit96',
    linkedin: 'https://www.linkedin.com/in/axit96/',
  };
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName:     ['', [Validators.required, Validators.minLength(2)]],
      lastName:      ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      emailId:       ['', [Validators.required, Validators.email]],
      city:          ['', ],
      state:         ['', ],
      query:         ['', [Validators.minLength(10)]]
    });
    if (window.scrollY > 0) {
      this.scrollIndicator = false;
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onMouseMove(e: MouseEvent) {
    const cards = document.querySelectorAll('.category-card-inner');
    cards.forEach(card => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      (card as HTMLElement).style.transform =
        `perspective(1000px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
    });
  }

  onMouseLeave(e: MouseEvent) {
    const card = (e.currentTarget as HTMLElement).closest('.category-card-inner');
    if (card) {
      (card as HTMLElement).style.transform = '';
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // shows all errors on submit
      return;
    }
    console.log('Form Data:', this.contactForm.value);
    this.contactForm.reset();
    // hook up EmailJS or API call here
  }
}
