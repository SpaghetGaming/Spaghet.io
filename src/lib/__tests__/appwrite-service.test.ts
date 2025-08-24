import { describe, it, expect } from 'vitest';
import { getBlogPosts, getProjects, getWorkExperiences, getLegalDocuments } from '../appwrite-service';

describe('AppWrite Service', () => {
  describe('getBlogPosts', () => {
    it('should return an array of blog posts', async () => {
      const posts = await getBlogPosts();
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      
      // Check that each post has the expected properties
      posts.forEach((post) => {
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('summary');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('tags');
        expect(post).toHaveProperty('draft');
        expect(post).toHaveProperty('content');
        expect(post).toHaveProperty('template');
        expect(post).toHaveProperty('featured');
      });
    });
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      const projects = await getProjects();
      
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
      
      // Check that each project has the expected properties
      projects.forEach((project) => {
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('summary');
        expect(project).toHaveProperty('date');
        expect(project).toHaveProperty('tags');
        expect(project).toHaveProperty('draft');
        expect(project).toHaveProperty('content');
        expect(project).toHaveProperty('demoUrl');
        expect(project).toHaveProperty('repoUrl');
      });
    });
  });

  describe('getWorkExperiences', () => {
    it('should return an array of work experiences', async () => {
      const workExperiences = await getWorkExperiences();
      
      expect(Array.isArray(workExperiences)).toBe(true);
      expect(workExperiences.length).toBeGreaterThan(0);
      
      // Check that each work experience has the expected properties
      workExperiences.forEach((work) => {
        expect(work).toHaveProperty('company');
        expect(work).toHaveProperty('role');
        expect(work).toHaveProperty('dateStart');
        expect(work).toHaveProperty('content');
        expect(work).toHaveProperty('dateEnd');
      });
    });
  });

  describe('getLegalDocuments', () => {
    it('should return an array of legal documents', async () => {
      const legalDocuments = await getLegalDocuments();
      
      expect(Array.isArray(legalDocuments)).toBe(true);
      expect(legalDocuments.length).toBeGreaterThan(0);
      
      // Check that each legal document has the expected properties
      legalDocuments.forEach((doc) => {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('date');
        expect(doc).toHaveProperty('content');
      });
    });
  });
});
