#!/bin/bash

echo "Starting Astro migration process..."

# Step 1: Update dependencies
echo "Updating Astro and related packages..."
npm install astro@latest
npm install @astrojs/mdx@latest
npm install @astrojs/tailwind@latest
npm install @astrojs/solid-js@latest
npm install @astrojs/sitemap@latest

# Step 2: Check for any build issues
echo "Checking if project builds correctly..."
npm run build

# Step 3: Run tests to ensure everything works
echo "Running tests..."
npm test

echo "Migration process completed. Please review any warnings or errors above."
