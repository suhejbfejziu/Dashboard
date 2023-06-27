import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <section>
        <div className="relative justify-center h-screen max-h-full overflow-hidden lg:px-0 md:px-12">
          <div className="justify-center w-full text-center lg:p-10 max-auto">
            <div className="justify-center w-full mx-auto">
              <p className="text-5xl tracking-tight text-black  lg:text-9xl">
                404
              </p>
              <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-400">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              <Link to={"/"} className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                Return Home
              </Link>
              <a href="#" className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600">
                Learn more
                <span aria-hidden="true"> → </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    
    )
}
