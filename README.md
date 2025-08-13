# Spaghet.io

Welcome to my personal website! This site showcases my projects, blog posts, and professional experience. It's built with Astro and hosted using a modern deployment pipeline.

## Deployment Pipeline

My website follows a robust deployment workflow:

1. **Development**: I develop content and code locally using Gitea as my Git hosting solution
2. **Auto-push**: Changes are automatically pushed from Gitea to GitHub via configured webhooks
3. **Hosting**: The site is hosted on Appwrite, which provides a scalable and secure hosting environment
4. **Delivery**: NGINX reverse proxy handles routing and serves content with optimal performance

This pipeline ensures that my website is always up-to-date with the latest changes while leveraging modern hosting technologies.

## Site Components

This website is built using Astro with the following key components:

- **Blog**: Articles about technology, development, and personal insights
- **Projects**: Showcasing my various projects and contributions
- **Work Experience**: Professional background and career history
- **Legal**: Privacy policy and terms of service

## Technologies Used

- **Framework**: Astro (Static site generation)
- **Styling**: Tailwind CSS
- **TypeScript**: Type-safe development
- **Deployment**: Gitea → GitHub → Appwrite → NGINX reverse proxy

## Getting Started

To run this site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

For more information about the Astro framework and its features, please refer to the [Astro documentation](https://docs.astro.build/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
