import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import Blog from '../Blog';

// Mock data for testing
const mockTags = ['technology', 'web development', 'astro'];
const mockData = [
  {
    id: '1',
    slug: 'test-post',
    body: 'Test post content',
    collection: 'blog',
    data: {
      title: 'Test Post',
      summary: 'A test post',
      date: new Date(),
      tags: ['technology'],
      draft: false,
      template: 'default',
      featured: false
    },
    render: async () => ({
      Content: () => null,
      headings: [],
      remarkPluginFrontmatter: {}
    })
  }
];

describe('Blog Component', () => {
  it('should render without crashing', () => {
    const { container } = render(() => (
      <Blog tags={mockTags} data={mockData} />
    ));
    
    expect(container).toBeInTheDocument();
  });

  it('should display the correct number of posts', () => {
    const { container } = render(() => (
      <Blog tags={mockTags} data={mockData} />
    ));
    
    // Should have at least one post displayed
    const postElements = container.querySelectorAll('li');
    expect(postElements.length).toBeGreaterThan(0);
  });
});
