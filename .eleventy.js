const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const md = new markdownIt({ html: true });

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Ignore the markdown files so they don't get built as separate pages
  eleventyConfig.ignores.add("src/writeups/**/*.md");
  eleventyConfig.ignores.add("src/writeups/*.md");

  // Shortcode to read and parse markdown
  eleventyConfig.addShortcode("renderMarkdown", function(filePath) {
    const fullPath = path.join(__dirname, 'src', 'writeups', filePath);
    try {
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        return md.render(content);
      } else {
        console.warn(`Markdown file not found: ${fullPath}`);
        return '';
      }
    } catch (err) {
      console.error(`Error reading markdown file: ${err}`);
      return '';
    }
  });

  // Shortcode for title (first line)
  eleventyConfig.addShortcode("renderMarkdownTitle", function(filePath) {
    const fullPath = path.join(__dirname, 'src', 'writeups', filePath);
    try {
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const firstLine = content.split('\n').find(line => line.trim() !== '') || '';
        return md.render(firstLine);
      }
    } catch (err) {
      console.error(`Error reading markdown file for title: ${err}`);
    }
    return '';
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};