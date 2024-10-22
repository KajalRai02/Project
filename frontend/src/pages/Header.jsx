
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const Header = () => {

  const {isAuthenticated} = useSelector(state => state.auth.isAuthenticated)
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3D52A0" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Contact us
        </Typography>
        
        {isAuthenticated ? (
          <>
            <Button component={Link} to="/login" color="inherit" sx={{ mx: 1 }}>Sign in</Button>
            <Button component={Link} to="/register" color="inherit">Sign up</Button>
          </>
        ):
          <Button component={Link} to="/" color="inherit">Logout</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Header;
