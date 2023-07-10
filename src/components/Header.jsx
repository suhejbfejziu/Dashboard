import { Link } from 'react-router-dom';
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import useAuthStore from '../authStore';

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)
  
  return (      
        <nav className="bg-[#1976d2] border-b h-16 px-6 border-white/5 flex items-center justify-between">
        <Typography
            variant="h6"
            noWrap
            component={Link}
            to={'/'}
            sx={{ color: 'white'}}
          >
            User Connectivity
          </Typography>
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
        { isLoggedIn ? 
          <Button LinkComponent={Link} to={"/dashboard"} sx={{color: 'white'}}>
            Go to dashboard
          </Button> :
          <>
            <Button LinkComponent={Link} to={"/login"} sx={{color: 'white'}}>
              Sign in
            </Button>
            <Button LinkComponent={Link} to={"/sign-up"} sx={{color: 'white'}}>
              Sign up
            </Button>
          </>
        }
          </div>
        </nav>
  );
}
