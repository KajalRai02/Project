import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

function CreateButton({onClick}) {
  return (
    <IconButton
          color="primary" 
          onClick={onClick}
          aria-label="Add Course"
          sx={{
            position: 'fixed', 
            bottom: '20px',    
            right: '20px',    
            zIndex: 1000,      
            boxShadow: 3,      
            '&:hover': {
              boxShadow: 6,    
            },
            backgroundColor: 'primary.main', 
            color: 'white',    
            borderRadius: '50%', 
            padding: '20px',     
          }}
        >
          <AddIcon />
        </IconButton>
  )
}

export default CreateButton