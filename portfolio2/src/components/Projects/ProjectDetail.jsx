// src/components/Projects/ProjectDetail.jsx
import React, { useRef, useEffect } from "react";

const ProjectDetail = ({ project, activeSection }) => {
  const sectionRefs = useRef({});

  useEffect(() => {
    if (activeSection && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection]);
  const sampleProject = {
    id: 1,
    title: "E-Commerce Platform Redesign",
    overview: `A comprehensive redesign and rebuild of an existing e-commerce platform, 
    focusing on performance optimization and user experience enhancement. This project 
    showcases modern web development practices and advanced React patterns.`,
    sections: {
      challenges: `The existing platform faced multiple challenges including poor performance, 
      lack of mobile responsiveness, and outdated UI/UX. The database structure needed 
      significant optimization, and the codebase required modernization to support new features.
      
      Key challenges included:
      • Managing large-scale state across multiple user sessions
      • Implementing real-time inventory tracking
      • Optimizing database queries for faster product searches
      • Handling complex shopping cart calculations
      • Supporting multiple payment gateways
      • Implementing secure user authentication`,

      features: [
        "Advanced product filtering and search functionality",
        "Real-time inventory management system",
        "Responsive design supporting all device sizes",
        "Optimized checkout process with smart form validation",
        "Integration with multiple payment gateways",
        "Advanced admin dashboard with sales analytics",
        "Customer review and rating system",
        "Wishlist and save for later functionality",
        "Email notification system for order updates",
        "Advanced security features including 2FA",
      ],

      technical_stack: `Frontend:
      • React.js for UI components
      • Redux for state management
      • Styled-components for styling
      • React Query for server state management
      • Jest and React Testing Library for testing
      
      Backend:
      • Node.js with Express
      • MongoDB for main database
      • Redis for caching
      • AWS S3 for image storage
      • Stripe API for payments
      
      DevOps:
      • Docker for containerization
      • CI/CD pipeline using GitHub Actions
      • AWS for hosting
      • CloudFront for CDN`,

      implementation: `The implementation process followed a phased approach:

      Phase 1: Planning and Architecture
      • Conducted thorough analysis of existing system
      • Identified key pain points and areas for improvement
      • Designed new database schema
      • Created detailed component hierarchy
      • Established coding standards and practices
      
      Phase 2: Core Development
      • Set up development environment and tools
      • Implemented basic e-commerce functionality
      • Developed authentication system
      • Created product management system
      
      Phase 3: Advanced Features
      • Implemented real-time inventory tracking
      • Developed advanced search functionality
      • Added review and rating system
      • Integrated payment processing
      
      Phase 4: Testing and Optimization
      • Conducted performance testing
      • Implemented security measures
      • Optimized database queries
      • Performed cross-browser testing`,

      results: `The project achieved significant improvements:
      
      Performance Metrics:
      • 65% improvement in page load time
      • 45% reduction in database query times
      • 80% increase in mobile responsiveness score
      
      Business Metrics:
      • 35% increase in conversion rate
      • 50% reduction in cart abandonment
      • 40% increase in average session duration
      
      Technical Achievements:
      • 100% test coverage for critical paths
      • 99.9% uptime since deployment
      • Successfully handling 10,000+ concurrent users
      • 60% reduction in server costs`,

      lessons_learned: `Key takeaways from the project:
      
      1. Early Performance Optimization
      The importance of considering performance from day one became evident as the application 
      grew. Implementing lazy loading, code splitting, and efficient caching strategies early 
      in the development cycle proved crucial.
      
      2. State Management Complexity
      While Redux provided robust state management, we learned the importance of carefully 
      planning the state structure. Some features could have used simpler state management 
      solutions.
      
      3. Testing Strategy
      Investing time in setting up a comprehensive testing strategy early in the project paid 
      off significantly during later stages of development.
      
      4. Database Optimization
      Regular monitoring and optimization of database queries proved essential for maintaining 
      performance as the data grew.
      
      5. User Feedback
      Implementing a system for gathering and acting on user feedback helped us identify and 
      prioritize important features and fixes.`,
    },
  };

  return (
    <div className="project-detail">
      <h1>{sampleProject.title}</h1>
      <p className="overview">{sampleProject.overview}</p>

      {Object.entries(sampleProject.sections).map(([section, content]) => (
        <section key={section} className={`section ${section}`}>
          <h2>{section.replace("_", " ").toUpperCase()}</h2>
          {Array.isArray(content) ? (
            <ul className="feature-list">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <div className="content">{content}</div>
          )}
        </section>
      ))}
    </div>
  );
};

export default ProjectDetail;
