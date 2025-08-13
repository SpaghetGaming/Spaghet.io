---
title: "Building My Personal Website: From Idea to Deployment"
summary: "A journey through creating my personal portfolio site, from initial concept to hosting on Appwrite with NGINX Proxy Manager."
date: "Aug 12 2025"
draft: false
tags:
- Tutorial
- Astro
- Portfolio
- Hosting
- Appwrite
- Docker
---

As someone who loves spaghetti and all things tech, I've always been fascinated by the perfect balance of structure and creativity. When it came time to create my personal website, I wanted to build something that reflected both my passion for technology and my love for well-organized systems.

## The Concept

I decided to use Astro as the foundation for my portfolio site because of its excellent performance and flexibility. The idea was to create a modern, responsive website that showcases my work and projects while demonstrating my technical skills through the implementation itself.

The site needed to be:
- Fast and performant
- Responsive across all devices
- Easy to maintain and update
- A reflection of my technical expertise

## Development Process

I started by setting up the basic structure using Astro's capabilities. The site features:
- A clean, modern design with dark/light mode support
- Smooth animations and transitions for enhanced user experience
- Integrated blog section for technical articles
- Project showcase with detailed descriptions
- Contact form with email integration
- SEO optimization for better search engine visibility

## Deployment Strategy

This is where things get interesting. As someone running 2 Unraid servers with powerful hardware configurations (128GB RAM, 2 x E5 Xeon CPU, 200TB raw storage on NetApp arrays), I wanted to leverage my existing infrastructure for hosting this personal website.

### My Hosting Setup

I'm planning to host this site on my Appwrite instance, which is part of my comprehensive Docker container ecosystem. The setup includes:
- Appwrite for backend services and database management
- NGINX Proxy Manager (NPM) to expose the site via HTTPS at https://spaghet.io
- A robust Docker infrastructure supporting PostgreSQL, MariaDB, MySQL, MongoDB, Redis, and Minio

### Challenges with Appwrite

While setting up the deployment, I've been working through some configuration challenges with Appwrite. Getting it to behave properly has been a learning experience, but also a great opportunity to dive deep into the platform's capabilities.

The process has involved:
- Understanding Appwrite's API structure
- Configuring proper database connections
- Setting up authentication and user management
- Ensuring proper security configurations

## Technical Details

The site leverages modern web development practices including:
- Component-based architecture with React
- Responsive design principles using Tailwind CSS
- Performance optimization techniques
- Integration with my existing Docker ecosystem

## Why This Approach?

I chose this approach because it reflects how I think about technology - structured, well-organized, and efficient. Just like a perfect bowl of spaghetti, everything has its place and works together seamlessly.

The experience of building and deploying this site has been both challenging and rewarding, showcasing my ability to work with complex systems while maintaining a clear focus on the end-user experience.

## Looking Forward

As I continue to develop this site, I plan to:
- Add more technical articles about my Docker setups and infrastructure
- Expand the blog section with detailed tutorials
- Continue refining the user experience based on feedback
- Document my journey of getting Appwrite to work properly

This project represents not just a portfolio, but also a demonstration of my approach to technology - structured yet creative, efficient yet elegant.
