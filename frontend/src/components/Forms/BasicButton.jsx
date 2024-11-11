
import Button from '@mui/material/Button';

function BasicButton({variant="contained",startIcon=null, type,sx={margin:7} ,children, ...rest}) {
  return (
    <span>
      <Button
       variant={variant}
       type={type}
       sx={{...sx}}
       startIcon={startIcon}
       {...rest}
      >
        {children}
      </Button>
    </span>
    
  )
}

export default BasicButton