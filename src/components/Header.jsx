import { AppBar, Toolbar, Typography, Link, Button } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

export default function Header(){
    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
    }

    return (      
    <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography component={RouterLink} to={"/"} variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            DASHBOARD
          </Typography>
          <nav>
            <Link
              variant="button"
              component={RouterLink}
              color="text.primary"
              to="/pricing"
              style={({isActive}) => isActive ? activeStyles : null}
              sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
            >
              Pricing
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="text.primary"
              to="/enterprise"
              style={({isActive}) => isActive ? activeStyles : null}
              sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="text.primary"
              to="/support"
              style={({isActive}) => isActive ? activeStyles : null}
              sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
            >
              Support
            </Link>
          </nav>
          <Button component={RouterLink} to={"/login"} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            <LoginIcon sx={{mr:0.5}} /> Login
          </Button>
        </Toolbar>
      </AppBar>
      )
}