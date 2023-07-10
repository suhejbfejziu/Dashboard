import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import useAuthStore from "../authStore";

export default function Home() {
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    async function handleAuthentication() {
       await checkAuthentication();
    }

    handleAuthentication();
  }, []);
  return (
    <div>
    <section className="items-center justify-center bg-[#141521] flex h-screen">
      <div className="items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-white/5">
              <span className="text-sm font-medium text-white">Acquire your first customer</span>
            </span>
            <p className="mt-8 text-3xl font-extrabold tracking-tight text-white lg:text-6xl">
              The Dashboard features your audience will love
            </p>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-slate-300">
              Welcome to our website that is designed to help you manage your users, posts, comments and profile in an easy and efficient way.
            </p>
          </div>
          <div className="flex flex-col justify-center max-w-sm gap-3 mx-auto mt-10 sm:flex-row">
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            { isLoggedIn ? "" : <Button sx={{color: 'white'}} LinkComponent={Link} to={"/sign-up"}>Sign up for free</Button>}
            <Button sx={{color: 'white'}} LinkComponent={Link} to={"/posts"}>Check out posts</Button>
          </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white">
    <div className="items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
      <div>
        <div className="max-w-2xl">
          <p className="text-2xl font-medium tracking-tight text-black sm:text-4xl">
            Effortlessly Manage Your Online Presence with Our User-Friendly Platform
          </p>
          <p className="max-w-2xl mt-4 text-lg tracking-tight text-gray-600">
            With our powerful tools and intuitive interface, you can easily manage your users, moderate comments, and create engaging posts that will keep your audience coming back for more. 
            Whether you're a seasoned blogger or just starting out, our website has everything you need to take your online presence to the next level. So why wait? Sign up today and start managing your online presence like a pro!
          </p>
        </div>
      </div>
      <div className="">
        <div className="max-w-xl py-12 mx-auto text-left lg:max-w-7xl">
          <h2 className="sr-only">Features.</h2>
          <div>
            <div className="grid grid-cols-2 gap-12 lg:grid-cols-3 lg:space-y-0">
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Database with GraphQL
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Define the data model in your database and query data with
                  GraphQL.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Real-time Sync
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Sync data across multiple clients.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Permissions
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Define complex security policies to keep your users’ data safe.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    File Storage
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Upload and manage files.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Image Transformations
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Resize and optimise images on the fly.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Authentication
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  User accounts and social login.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Serverless Functions
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Custom backend code with logs and error handling.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Payments
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Stripe integration for all apps.
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 text-black bg-gray-100 rounded-xl">
                    ❖
                  </div>
                  <p className="mt-4 text-lg font-medium leading-6 text-black">
                    Transactional Emails
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500">
                  Design your email templates and engage your users.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
  <div className="items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl">
    <div className="text-center">
      <h1 className="text-lg font-medium leading-6 text-black uppercase within 500 fortune companies">
        Worldwide trust within 500 fortune companies
      </h1>
     </div>
      <div className="grid grid-cols-2 gap-0.5 md:grid-cols-6 pt-6">
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/2a4d2cdd794587314ad2034778712608ac32e37c/79f3b/images/logos/8.svg" alt="logo" />
        </div>
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/aae3d6dfaee9138c485f5305dd33b7f80379edb4/64dd2/images/logos/2.svg" alt="logo" />
        </div>
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/4dc5df63255f9f0c1f54c804dd3149cf11308507/b7a70/images/logos/3.svg" alt="logo" />
        </div>
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/be7130b04bb6b932ed9222877a5e9146d80c0eba/6511d/images/logos/4.svg" alt="logo" />
        </div>
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/456c999508e76cd199714cfa4fad3826ebb02216/9147b/images/logos/5.svg" alt="logo" />
        </div>
        <div className="flex justify-center col-span-1 px-8">
          <img className="max-h-12" src="https://d33wubrfki0l68.cloudfront.net/b5d09ea7476a226d10dd1235e071288761e51da7/e68ac/images/logos/6.svg" alt="logo" />
        </div>
      </div>
      </div>
    </section>
    </div>
  );
}
