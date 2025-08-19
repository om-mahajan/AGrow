import { useState, useRef } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  IconButton,
  Paper,
  Avatar,
  InputAdornment
} from '@mui/material'
import {
  Send as SendIcon,
  Clear as ClearIcon,
  CameraAlt as CameraIcon,
  AttachFile as AttachIcon,
  Person as PersonIcon,
  SmartToy as BotIcon
} from '@mui/icons-material'

interface ModelConfig {
  provider: string
  model: string
  apiKey: string
  endpoint?: string
  language: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  image?: string
}

const ModelInterface = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [config, setConfig] = useState<ModelConfig>({
    provider: 'azure',
    model: 'gpt-3.5-turbo',
    apiKey: '',
    endpoint: '',
    language: 'en'
  })
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' },
    { value: 'ar', label: 'العربية' },
    { value: 'hi', label: 'हिंदी' }
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        const userMessage: Message = {
          role: 'user',
          content: inputMessage || 'I uploaded an image',
          timestamp: new Date(),
          image: imageDataUrl
        }
        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        
        // Simulate AI response to image
        setTimeout(() => {
          const assistantMessage: Message = {
            role: 'assistant',
            content: `I can see your image! This appears to be a ${file.type.includes('image') ? 'photo' : 'file'}. I can analyze images and provide insights about what I see. What would you like to know about this image?`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
        }, 1000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.click()
    }
  }

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      setError('Please enter a message')
      return
    }

    setLoading(true)
    setError(null)

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: `Response in ${languages.find(l => l.value === config.language)?.label}: This is a simulated response to "${inputMessage}". I'm using ${config.provider} ${config.model} to provide helpful assistance in your selected language.`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('Failed to get response from the model')
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }])
    setError(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#f5f5f5'
    }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: 'primary.main' }}>
          🤖 AI Chat Assistant
        </Typography>
        
        {/* Quick Settings */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Language</InputLabel>
              <Select
                value={config.language}
                label="Language"
                onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value }))}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '40px' }}>
              <Typography variant="body2" color="text.secondary">
                📸 Tap camera to take photo • 📎 Tap attach to upload image
              </Typography>
              <Button
                startIcon={<ClearIcon />}
                onClick={clearMessages}
                size="small"
                variant="outlined"
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Chat Messages */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                maxWidth: '80%',
                gap: 1
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                  width: 32,
                  height: 32
                }}
              >
                {message.role === 'user' ? <PersonIcon /> : <BotIcon />}
              </Avatar>
              
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  bgcolor: message.role === 'user' ? 'primary.main' : 'white',
                  color: message.role === 'user' ? 'white' : 'text.primary',
                  borderRadius: 2,
                  maxWidth: '100%'
                }}
              >
                {message.image && (
                  <Box sx={{ mb: 1 }}>
                    <img
                      src={message.image}
                      alt="Uploaded"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                )}
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                  {message.content}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.7, 
                    mt: 1, 
                    display: 'block',
                    fontSize: '0.75rem'
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <BotIcon />
              </Avatar>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="body2">Thinking...</Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 0 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={handleKeyPress}
            disabled={loading}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCameraCapture}
                    disabled={loading}
                    size="small"
                    title="Take Photo"
                    sx={{ color: 'primary.main' }}
                  >
                    <CameraIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleFileSelect}
                    disabled={loading}
                    size="small"
                    title="Upload Image"
                    sx={{ color: 'secondary.main' }}
                  >
                    <AttachIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
            sx={{ minWidth: '56px', height: '40px' }}
          >
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </Button>
        </Box>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={languages.find(l => l.value === config.language)?.label}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label="📸 Camera Ready"
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip
            label="🌐 Global Access"
            size="small"
            color="info"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default ModelInterface
