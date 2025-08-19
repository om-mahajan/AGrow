import { Box, Typography } from '@mui/material'
import ModelInterface from './pages/ModelInterface'

const App = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ width: '100%', bgcolor: 'primary.main', color: 'white', py: 2, textAlign: 'center', boxShadow: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 2 }}>
          AGrow
        </Typography>
      </Box>
      <ModelInterface />
    </Box>
  )
}

export default App
