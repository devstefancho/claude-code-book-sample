---
description: Generate technical implementation plan from specification
argument-hint: tech-stack (optional, Korean/English)
model: inherit
---

## Arguments

$1 (optional, Korean/English support): Tech stack specification (e.g., "React, TypeScript, Vite" or "React, TypeScript")

## Instructions

1. **Read `docs/{current_branch}/spec.md`**: Analyze the specification document to understand the feature requirements and constraints.
   - Extract functional and non-functional requirements
   - Identify key features and user stories
   - Note performance targets and accessibility requirements
   - Understand data models and business logic

2. **Determine Technology Stack**:
   - **If user provides tech stack** (`$1` is provided):
     - Use the exact technologies specified by the user
     - Validate compatibility and completeness
     - Fill in missing pieces (e.g., if only "React" is provided, suggest appropriate build tools, state management, etc.)

   - **If no tech stack provided** (`$1` is empty):
     - Analyze existing project structure (package.json, config files)
     - If new project: Recommend modern, best-practice tech stack based on requirements
     - Consider project requirements (performance, accessibility, complexity)
     - Select appropriate framework, build tool, state management, libraries

3. **Generate `docs/{current_branch}/plan.md`**: Create a comprehensive technical implementation plan with the following structure:

   ### Document Structure

   #### 1. Original Tech Stack Request

   Record what the user requested (if provided).

   ```markdown
   ## Original Tech Stack Request

   [User input verbatim, or "Not specified - Auto-selected based on requirements"]
   ```

   #### 2. Technology Stack

   List all technologies, frameworks, and libraries with versions and justifications.

   ```markdown
   ## Technology Stack

   ### Frontend Framework

   - **[Framework Name]** (v[version]): [Why this choice - relates to requirements]

   ### Build Tool

   - **[Build Tool]** (v[version]): [Justification]

   ### Language

   - **[Language]**: [Benefits for this project]

   ### State Management

   - **[Library/Pattern]**: [Why suitable for this use case]

   ### Key Libraries

   - **[Library 1]**: [Purpose and reason]
   - **[Library 2]**: [Purpose and reason]

   ### Development Tools

   - **Linting**: [Tool and config]
   - **Formatting**: [Tool]
   - **Testing**: [Framework]

   ### Package Manager

   - **[npm/yarn/pnpm]**: [Justification if relevant]
   ```

   #### 3. Architecture Overview

   High-level system design and component relationships.

   ```markdown
   ## Architecture Overview

   ### System Design

   - Application type: [SPA/MPA/SSR/SSG]
   - Architecture pattern: [Component-based/Feature-based/etc.]
   - Rendering strategy: [CSR/SSR/Static]

   ### Directory Structure
   ```

   [Proposed folder structure]

   ```

   ### Component Hierarchy
   - [High-level component breakdown]
   - [Data flow patterns]
   - [Separation of concerns]

   ### Design Patterns
   - [Patterns to use and why]
   ```

   #### 4. Data Models

   Database schemas, data structures, and interfaces.

   ````markdown
   ## Data Models

   ### Entity Definitions

   ```typescript
   [TypeScript interfaces or type definitions]
   ```
   ````

   ### Data Relationships
   - [How entities relate to each other]

   ### Storage Strategy
   - **Primary Storage**: [LocalStorage/IndexedDB/API/Database]
   - **Caching**: [Strategy if applicable]
   - **Data Validation**: [Approach]

   ### State Shape

   ```typescript
   [Global state structure if using state management]
   ```

   ````

   #### 5. API Design
   Endpoints, requests, and responses (if applicable).
   ```markdown
   ## API Design

   [If backend exists or is planned:]

   ### Endpoints

   #### [Resource Name]
   - **GET /api/[resource]**
     - Description: [Purpose]
     - Response: [Schema]

   - **POST /api/[resource]**
     - Description: [Purpose]
     - Request Body: [Schema]
     - Response: [Schema]

   ### API Client
   - [How frontend communicates with backend]
   - [Error handling strategy]
   - [Authentication flow if applicable]

   [If no backend:]
   Not applicable - Client-side only application using [LocalStorage/IndexedDB]
   ````

   #### 6. Component Structure

   Component hierarchy and organization.

   ```markdown
   ## Component Structure

   ### Core Components
   ```

   App
   ├── [Layout Component]
   │ ├── [Feature Component 1]
   │ │ ├── [Sub-component]
   │ │ └── [Sub-component]
   │ ├── [Feature Component 2]
   │ └── [Feature Component 3]
   └── [Shared Components]
   ├── [Button]
   ├── [Modal]
   └── [Input]

   ```

   ### Component Responsibilities
   - **[Component Name]**: [What it does, props, state]
   - **[Component Name]**: [What it does, props, state]

   ### Composition Strategy
   - [How components compose together]
   - [Props drilling vs context usage]
   - [Reusability patterns]

   ### Styling Approach
   - **Method**: [CSS Modules/Styled Components/Tailwind/CSS-in-JS]
   - **Theming**: [If applicable]
   - **Responsive Design**: [Breakpoint strategy]
   ```

   #### 7. State Management

   Data flow and state handling strategy.

   ```markdown
   ## State Management

   ### State Architecture

   - **Global State**: [What lives in global state]
   - **Local State**: [What stays in component state]
   - **Server State**: [If applicable - caching, sync]

   ### State Management Library

   - **[Library Name]**: [Why chosen for this project]

   ### Data Flow
   ```

   [Diagram or description of how data flows through the app]

   ```

   ### State Operations
   - **Create**: [How new data is added]
   - **Read**: [How data is accessed]
   - **Update**: [How data is modified]
   - **Delete**: [How data is removed]

   ### Side Effects
   - [How to handle async operations]
   - [Error handling in state]
   - [Optimistic updates if applicable]
   ```

   #### 8. Security Considerations

   Authentication, authorization, and data protection.

   ```markdown
   ## Security Considerations

   ### Input Validation

   - **Client-side**: [Validation strategy and libraries]
   - **Server-side**: [If applicable]
   - **Sanitization**: [XSS prevention]

   ### Data Protection

   - **Sensitive Data**: [How to handle]
   - **Storage Security**: [Encryption if needed]
   - **HTTPS**: [Enforcement strategy]

   ### Common Vulnerabilities

   - **XSS Prevention**: [Approach]
   - **CSRF Protection**: [If applicable]
   - **SQL Injection**: [If using database]

   ### Authentication & Authorization

   [If applicable:]

   - **Auth Strategy**: [JWT/Session/OAuth]
   - **Protected Routes**: [Implementation]
   - **Permission Management**: [RBAC/ABAC]

   [If not applicable:]

   - Not required for MVP - single-user, client-side only
   - Future consideration for multi-user version

   ### Security Headers

   - [Content Security Policy]
   - [CORS configuration if needed]
   ```

   #### 9. Testing Strategy

   Unit, integration, and E2E testing approach.

   ````markdown
   ## Testing Strategy

   ### Testing Framework

   - **Unit Testing**: [Framework and tools]
   - **Integration Testing**: [Framework and tools]
   - **E2E Testing**: [Framework and tools - if applicable]

   ### Test Coverage Goals

   - **Unit Tests**: [Target coverage %]
   - **Integration Tests**: [Key flows to test]
   - **E2E Tests**: [Critical user journeys]

   ### What to Test

   - **Components**: [Component testing strategy]
   - **State Management**: [State logic testing]
   - **Utilities**: [Pure function testing]
   - **API Integration**: [Mocking strategy]

   ### Testing Patterns

   ```typescript
   [Example test structure]
   ```
   ````

   ### Continuous Integration
   - **CI Pipeline**: [GitHub Actions/GitLab CI/etc.]
   - **Pre-commit Hooks**: [Husky + lint-staged]
   - **Test Automation**: [When tests run]

   ### Accessibility Testing
   - **Tools**: [axe-core, jest-axe, etc.]
   - **Manual Testing**: [Screen reader testing]
   - **WCAG Validation**: [Level AA compliance checks]

   ````

   #### 10. Deployment Plan
   Build process and environment configuration.
   ```markdown
   ## Deployment Plan

   ### Build Process
   ```bash
   [Build commands and steps]
   ````

   ### Environment Configuration
   - **Development**: [Local setup]
   - **Staging**: [If applicable]
   - **Production**: [Optimizations]

   ### Environment Variables

   ```
   [List of env vars needed]
   ```

   ### Hosting Platform
   - **Recommended**: [Vercel/Netlify/GitHub Pages/etc.]
   - **Why**: [Benefits for this project]
   - **Cost**: [Free tier/paid]

   ### Deployment Steps
   1. [Step-by-step deployment process]
   2. [Configuration needed]
   3. [Verification steps]

   ### CI/CD Pipeline
   - **Trigger**: [When deployment happens]
   - **Build**: [Automated build process]
   - **Deploy**: [Automated deployment]

   ### Performance Optimization
   - **Code Splitting**: [Strategy]
   - **Asset Optimization**: [Images, fonts, etc.]
   - **Caching Strategy**: [Browser caching, CDN]
   - **Bundle Size**: [Target size and monitoring]

   ### Monitoring
   - **Error Tracking**: [Sentry/LogRocket/etc. if applicable]
   - **Analytics**: [If applicable]
   - **Performance Monitoring**: [Web Vitals tracking]

   ````

   #### 11. Dependencies
   Complete list of packages with versions and purposes.
   ```markdown
   ## Dependencies

   ### Production Dependencies
   ```json
   {
     "[package-name]": "^[version]"  // [Purpose]
   }
   ````

   ### Development Dependencies

   ```json
   {
     "[package-name]": "^[version]" // [Purpose]
   }
   ```

   ### Dependency Justification
   - **[Package]**: [Why needed, alternatives considered]
   - **[Package]**: [Why needed, alternatives considered]

   ### Version Strategy
   - [How to manage dependency updates]
   - [Security vulnerability scanning]
   - [Breaking change management]

   ```

   ```

## Report

After creating the plan, provide a concise summary to the user:

1. **Technical Decisions Summary**:
   - Tech stack selected and key reasons
   - Major architectural patterns chosen
   - Important trade-offs made
   - Risk mitigation strategies

2. **Next Steps Guidance**:

   ```
   ✅ Technical Implementation Plan created: docs/{current_branch}/plan.md

   📋 Summary:
   - **Tech Stack**: [Framework] + [Language] + [Key Libraries]
   - **Architecture**: [Pattern/Approach]
   - **Storage**: [Strategy]
   - **Testing**: [Framework and approach]
   - **Deployment**: [Platform]

   💡 Key Technical Decisions:
   1. [Decision 1 and rationale]
   2. [Decision 2 and rationale]
   3. [Decision 3 and rationale]

   🚀 Next Step:
   Run `/sdd:tasks` to generate detailed implementation tasks from this plan.

   This will break down the implementation into concrete, actionable steps.
   ```

## Quality

Ensure the generated plan meets these criteria:

- **Technically Feasible**: All proposed technologies are compatible and production-ready
- **Aligned with Spec**: Architecture directly addresses functional and non-functional requirements
- **Detailed Enough**: Implementation team can start coding immediately with this plan
- **Best Practices**: Follows industry standards and modern development practices
- **Justified Decisions**: Each technology choice has clear reasoning
- **Complete**: All aspects of development covered (code, test, deploy, monitor)
- **Realistic**: Dependencies, timeline, and complexity are appropriate for the project scope
- **Secure**: Security considerations are addressed proactively
- **Accessible**: WCAG and accessibility requirements are integrated into the plan
- **Maintainable**: Code organization and testing support long-term maintenance

## Notes

- If user input is in Korean, write the plan in Korean (except code examples)
- If user input is in English, write the plan in English
- Code examples, schemas, and technical snippets should use English identifiers
- Focus on **how to implement** rather than **what to implement** (spec already covers "what")
- Consider the team's expertise level when selecting technologies
- Balance "best practice" with "practical" - don't over-engineer
- When auto-selecting tech stack, prefer modern, well-maintained, and widely-adopted tools
- Include specific version numbers for all dependencies
- Address the specific requirements from the spec (performance targets, browser support, etc.)
