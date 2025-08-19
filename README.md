# AgroW - AI Model Interface

A mobile-friendly React web application for interacting with cloud-based AI models from Azure OpenAI, AWS Bedrock, OpenAI, and Anthropic.

## Features

- 🚀 **Modern React Stack**: Built with React 18, TypeScript, and Vite for fast development
- 📱 **Mobile-First Design**: Responsive UI optimized for mobile devices using Material-UI
- ☁️ **Multi-Cloud Support**: Connect to Azure OpenAI, AWS Bedrock, OpenAI, and Anthropic
- 🔒 **Secure API Management**: Local storage of API keys with no server-side storage
- 💬 **Interactive Chat Interface**: Real-time conversation with AI models
- ⚙️ **Configurable Settings**: Customize model parameters and app behavior
- 🎨 **Beautiful UI**: Modern Material Design with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Styling**: Material-UI + CSS3

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- API keys from your chosen cloud provider

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd agrow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Configuration

### API Keys Setup

The application supports multiple cloud providers. You'll need to obtain API keys from your chosen provider:

#### Azure OpenAI
1. Go to Azure Portal → Azure OpenAI Service
2. Create a new resource or use an existing one
3. Navigate to "Keys and Endpoint" section
4. Copy your API key and endpoint URL

#### AWS Bedrock
1. Go to AWS Console → Amazon Bedrock
2. Enable model access for the models you want to use
3. Create an IAM user with Bedrock permissions
4. Generate access keys for the IAM user

#### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to API Keys section
3. Create a new API key

#### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Navigate to API Keys section
3. Create a new API key

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_DEFAULT_PROVIDER=azure
VITE_APP_NAME=AgroW
```

## Usage

1. **Configure Provider**: Select your cloud provider and enter your API credentials
2. **Choose Model**: Select the AI model you want to interact with
3. **Start Chatting**: Type your message and receive AI-powered responses
4. **Customize Settings**: Adjust model parameters, UI preferences, and more

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── HomePage.tsx    # Landing page
│   ├── ModelInterface.tsx  # Main chat interface
│   └── Settings.tsx    # Configuration page
├── services/           # API services and utilities
│   └── modelService.ts # Cloud provider integrations
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Features in Detail

### Mobile-First Design
- Responsive layout that works on all screen sizes
- Touch-friendly interface elements
- Optimized for mobile browsers
- Progressive Web App capabilities

### Multi-Cloud Support
- Azure OpenAI Service integration
- AWS Bedrock support
- OpenAI API compatibility
- Anthropic Claude integration

### Security Features
- API keys stored locally in browser
- No server-side storage of credentials
- Secure HTTPS communication
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## Environment Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/agrow/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## Roadmap

- [ ] Dark mode support
- [ ] Conversation history persistence
- [ ] Multiple conversation threads
- [ ] File upload support
- [ ] Voice input/output
- [ ] Custom model fine-tuning integration
- [ ] Team collaboration features
- [ ] Advanced prompt templates

---

**Note**: This application handles sensitive API keys. Always ensure you're following security best practices and never commit API keys to version control.
