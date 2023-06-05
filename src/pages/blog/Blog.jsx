import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import ReactMarkdown from 'react-markdown';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const [featuredPosts, setFeaturedPosts] = useState([])
  
  return ( <></>
    // <ThemeProvider theme={defaultTheme}>
    //   <CssBaseline />
    //   <Container maxWidth="lg">
    //     <Header title="Blog" sections={sections} />
    //     <main>
    //       <MainFeaturedPost post={mainFeaturedPost} />
    //       <Grid container spacing={4}>
    //         {featuredPosts.map((post) => (
    //           <FeaturedPost key={post.title} post={post} />
    //         ))}
    //       </Grid>
    //       <Grid container spacing={5} sx={{ mt: 3 }}>
    //         {/* <Main title="From the firehose" posts={loadedPosts}>
    //           {loadedPosts.map((post, index) => (
    //             <ReactMarkdown key={index} children={post} />
    //           ))}
    //         </Main> */}
    //         <Sidebar
    //           title={sidebar.title}
    //           description={sidebar.description}
    //           archives={sidebar.archives}
    //           social={sidebar.social}
    //         />
    //       </Grid>
    //     </main>
    //   </Container>
    // </ThemeProvider>
  );
}
