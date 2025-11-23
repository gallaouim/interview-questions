# Interview Questions Platform

An open source platform for interview questions and answers covering JavaScript, TypeScript, Node.js, and React.js.

## Features

- 📚 Comprehensive collection of interview questions
- 🎯 Organized by technology
- 📝 Questions and answers in Markdown format
- 🌐 Beautiful web interface built with Next.js
- 🔍 Easy navigation and search

## Table of Contents

### JavaScript

- [What is JavaScript?](./questions/javascript/01-what-is-javascript.md)
- [What is the difference between var, let, and const?](./questions/javascript/02-var-let-const.md)

### TypeScript

- [What is TypeScript?](./questions/typescript/01-what-is-typescript.md)
- [What is the difference between type and interface in TypeScript?](./questions/typescript/02-type-vs-interface.md)

### Node.js

- [What is Node.js?](./questions/nodejs/01-what-is-nodejs.md)
- [What is the Event Loop in Node.js?](./questions/nodejs/02-event-loop.md)

### React.js

- [What is React?](./questions/reactjs/01-what-is-react.md)
- [What is the difference between Props and State in React?](./questions/reactjs/02-props-vs-state.md)


## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interview
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Generating Table of Contents

To update the table of contents in the README after adding new questions:

```bash
npm run generate-toc
```

## Project Structure

```
interview/
├── app/                    # Next.js app directory
│   ├── questions/          # Question pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── questions/              # Question markdown files
│   ├── javascript/
│   ├── typescript/
│   ├── nodejs/
│   └── reactjs/
├── scripts/                # Utility scripts
│   └── generate-toc.js     # TOC generator
└── README.md               # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
