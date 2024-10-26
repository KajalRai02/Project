
import Button from '@mui/material/Button';

function BasicButton({type,children}) {
  return (
    <span>
      <Button
       variant="contained"
       type={type}
       sx={{margin:7}}
      >{children}</Button>
    </span>
    
  )
}

export default BasicButton