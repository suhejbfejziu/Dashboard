import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Header() {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    setDarkMode(initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const darkMode = !isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    setDarkMode(darkMode);
  };

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (      
    <section className="bg-[#141521] border-b border-white/5 overflow-hidden relative">
    <div className="relative w-full mx-auto max-w-7xl">
      <div className="relative flex flex-col w-full p-5 mx-auto lg:px-16 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex flex-row items-center justify-between text-sm text-white lg:justify-start">
          <RouterLink to={"/"}><div><p>User Connectivity</p></div></RouterLink><button className="inline-flex items-center justify-center p-2 text-white focus:outline-none focus:text-black hover:text-black md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className="inline-flex" d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path className="hidden" d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
        </div>
        <nav className="flex-col items-center flex-grow hidden md:flex md:flex-row md:justify-end md:pb-0">
          <RouterLink to={"/pricing"} style={({isActive}) => isActive ? activeStyles : null} className="px-2 py-2 text-sm font-medium text-white hover:text-white/50 lg:px-6 md:px-3 lg:ml-auto">Pricing</RouterLink>
          <RouterLink to={"/enterprise"} style={({isActive}) => isActive ? activeStyles : null} className="px-2 py-2 text-sm font-medium text-white hover:text-white/50 lg:px-6 md:px-3">Enterprise</RouterLink>
          <RouterLink to={"/support"} style={({isActive}) => isActive ? activeStyles : null} className="px-2 py-2 text-sm font-medium text-white hover:text-white/50 lg:px-6 md:px-3">Support</RouterLink>
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <RouterLink to={"/login"} className="block px-4 py-2 mt-2 text-sm text-white hover:text-white/50 focus:outline-none focus:shadow-outline md:mt-0">
              Sign in
            </RouterLink>
            <RouterLink to={"/sign-up"} className="text-white text-sm py-2 focus:outline-none px-4 active:text-#279f0e bg-white/5 focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 group hover:bg-white/5 inline-flex items-center justify-center rounded-xl">
              Sign up
            </RouterLink>
            <FormControlLabel control={<MaterialUISwitch sx={{mx: 1}} onClick={toggleDarkMode} checked={isDarkMode} />}/>
          </div>
        </nav>
      </div>
    </div>
  </section>
  );
}
