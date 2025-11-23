const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '..', 'questions');
const readmePath = path.join(__dirname, '..', 'README.md');

const technologies = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'reactjs', name: 'React.js' },
];

function getQuestions(techId) {
  const techDir = path.join(questionsDir, techId);
  
  if (!fs.existsSync(techDir)) {
    return [];
  }

  const files = fs.readdirSync(techDir);
  const questions = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(techDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const slug = file.replace('.md', '');
      
      // Extract title from first line (should be # Title)
      const lines = fileContents.split('\n');
      let title = '';
      for (const line of lines) {
        if (line.trim().startsWith('#')) {
          title = line.replace(/^#+\s*/, '').trim();
          break;
        }
      }
      
      // Fallback to slug if no title found
      if (!title) {
        title = slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      return {
        slug,
        title,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return questions;
}

function generateTOC() {
  let toc = '## Table of Contents\n\n';
  
  technologies.forEach((tech) => {
    const questions = getQuestions(tech.id);
    
    if (questions.length > 0) {
      toc += `### ${tech.name}\n\n`;
      
      questions.forEach((question) => {
        const link = `questions/${tech.id}/${question.slug}.md`;
        toc += `- [${question.title}](./${link})\n`;
      });
      
      toc += '\n';
    }
  });

  return toc;
}

function updateREADME() {
  let readmeContent = '';
  
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
  } else {
    readmeContent = `# Interview Questions Platform

An open source platform for interview questions and answers covering JavaScript, TypeScript, Node.js, and React.js.

## Features

- 📚 Comprehensive collection of interview questions
- 🎯 Organized by technology
- 📝 Questions and answers in Markdown format
- 🌐 Beautiful web interface built with Next.js
- 🔍 Easy navigation and search

`;
  }

  // Find the Table of Contents section
  const tocStart = readmeContent.indexOf('## Table of Contents');
  const nextSection = readmeContent.indexOf('\n## ', tocStart + 1);
  
  if (tocStart !== -1) {
    // Replace existing TOC
    if (nextSection !== -1) {
      readmeContent = 
        readmeContent.substring(0, tocStart) +
        generateTOC() +
        readmeContent.substring(nextSection);
    } else {
      readmeContent = 
        readmeContent.substring(0, tocStart) +
        generateTOC();
    }
  } else {
    // Add TOC after the initial content
    const insertPoint = readmeContent.indexOf('\n## ');
    if (insertPoint !== -1) {
      readmeContent = 
        readmeContent.substring(0, insertPoint) +
        '\n' + generateTOC() +
        readmeContent.substring(insertPoint);
    } else {
      readmeContent += '\n' + generateTOC();
    }
  }

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('✅ Table of Contents generated successfully in README.md');
}

updateREADME();

