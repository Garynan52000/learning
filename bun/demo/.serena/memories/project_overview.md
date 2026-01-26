# Project Overview

This is a minimal demo for generating Alt text and structured descriptions from images.
It is built using **Bun** and **TypeScript**.

## Core Functionality
- **OCR**: Uses `tesseract.js` to extract text from images (supports English and Simplified Chinese). Exposed via `/alt` endpoint.
- **Vision Analysis**: Uses **Ollama** (default model: `llava-phi3`) to generate structured JSON descriptions of images, including summary, layout, color palette, typography, and components. Exposed via `/describe` endpoint.

## Tech Stack
- **Runtime**: Bun
- **Language**: TypeScript
- **OCR**: Tesseract.js
- **AI/Vision**: Ollama (local inference)
- **Framework**: Bun.serve (native HTTP server)
