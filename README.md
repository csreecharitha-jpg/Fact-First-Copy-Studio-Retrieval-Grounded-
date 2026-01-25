# Fact-First Copy Studio

> AI copywriting that proves its work - generate content grounded in verified facts with full citation tracking.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Genkit](https://img.shields.io/badge/Genkit-1.20-green)](https://firebase.google.com/docs/genkit)

## 🎯 The Problem

Traditional AI (ChatGPT, Copy.ai, Jasper) generates content from training data, leading to **hallucinations** - confident but incorrect information. This makes AI unusable for:
- Marketing teams (legal liability for false claims)
- Healthcare & legal industries (one wrong fact = lawsuit)  
- Content creators (spend 80% of time fact-checking AI output)

## ✅ The Solution

**Fact-First Copy Studio** enforces fact-grounding through architecture:

1. **Provide Source Material** - Product specs, research papers, company data
2. **AI Extracts Facts** - Before generating anything, AI lists key claims
3. **Generate with Citations** - Creates content using ONLY extracted facts

Every sentence is traceable. Every claim has a source. No hallucinations.

## 🚀 Features

- ✅ **6 Content Types** - Blog Post, Social Media, Ad Copy, Email, Product Description, Education
- ✅ **Citation Tracking** - See which facts were used in each generation
- ✅ **Source Attribution** - Know where every claim came from
- ✅ **Confidence Scoring** - AI evaluates if it has enough source material (High/Medium/Low)
- ✅ **Analytics Dashboard** - Track your content performance and fact-grounding quality
- ✅ **No Hallucinations** - AI admits when it doesn't have enough information

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with Server Actions
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **ShadCN/UI** - Beautiful, accessible components

### AI Layer
- **Genkit** - Google's AI framework for structured outputs
- **Zod** - Schema validation that enforces fact-grounding
- **Google Gemini** - LLM model via Genkit

### Key Innovation
**Zod Schemas** enforce that AI must return `factsUsed`, `sources`, and `confidenceLevel` - making hallucination prevention architectural, not aspirational.

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Google AI API key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/fact-first-copy-studio.git
cd fact-first-copy-studio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your Google AI API key to `.env.local`:
```
GOOGLE_GENAI_API_KEY=your_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

5. **Run Genkit Dev UI** (optional - for AI flow testing)
```bash
npm run genkit:dev
```

## 🎓 How to Use

1. **Paste Source Material** - Add factual information (product specs, research data, etc.)
2. **Select Content Type** - Choose from 6 types (Blog Post, Social Media, Ad Copy, Email, Product Description, Education)
3. **Enter Your Prompt** - Describe what content you want to create
4. **Generate** - AI creates content grounded in your source material
5. **Review Citations** - Check "Facts Used", "Sources", and "Confidence Level"

### Example

**Source Material:**
```
EcoGlow Smart LED Bulb
- Power: 9 Watts
- Brightness: 800 Lumens  
- Price: $24.99
- Lifespan: 25,000 hours
- Rating: 4.8/5 stars
```

**Prompt:** "Create an Instagram post announcing this product"

**Output:** Engaging social media post + list of facts used + confidence score

## 🏗️ Architecture

```
User Input (Source + Prompt)
    ↓
Next.js Server Action
    ↓
Genkit AI Flow
    ↓
Zod Schema Validation (enforces citations)
    ↓
Structured Output (Copy + Facts + Sources + Confidence)
```

### Key Files
- `src/ai/flows/generate-copy.ts` - AI flow with fact-grounding prompt
- `src/app/actions.ts` - Server actions for AI generation
- `src/app/(main)/page.tsx` - Main UI
- `src/app/(main)/dashboard/page.tsx` - Analytics dashboard

## 📊 Roadmap

### V1 (Current)
- ✅ Single source input
- ✅ 6 content types
- ✅ Citation tracking
- ✅ Confidence scoring

### V2 (Next 30 days)
- [ ] Multi-document upload (PDF, TXT, MD)
- [ ] Vector database (Pinecone) for semantic search
- [ ] Fact-check existing content mode
- [ ] Export to PDF/Markdown

### V3 (90 days)
- [ ] Chrome extension
- [ ] Team workspaces
- [ ] API for developers
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built during a hackathon project
- Powered by [Google Genkit](https://firebase.google.com/docs/genkit)
- UI components from [ShadCN/UI](https://ui.shadcn.com/)

## 📬 Contact

- **GitHub:** [Your GitHub Profile]
- **LinkedIn:** [Your LinkedIn]
- **Twitter:** [@YourHandle]

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

**Built with ❤️ to make AI honest, not just creative.**
