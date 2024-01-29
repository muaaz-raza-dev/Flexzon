import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RecordsFile from './RecordsFile'
import { QueryClientProvider ,QueryClient } from 'react-query'
const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
   <RecordsFile/>
   </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
