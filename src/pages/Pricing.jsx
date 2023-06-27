import CheckIcon from '@mui/icons-material/Check';

export default function Pricing() {
  return (
    <section aria-labelledby="pricing-two" id="pricing-two">
    <div className="text-center">
      <h2 className="mt-6 text-3xl">Pricing</h2>
      <article className="text-sm text-gray-600 mx-auto mt-2 max-w-md">
        <p>
          Greetings! Our pricing page presents a range of pricing options and features tailored to fit your individual needs. Our team of experts is always on hand to address any questions or concerns you may have. We are excited to collaborate with you!
        </p>
      </article>
    </div>
    <div className="items-center px-8 py-32 mx-auto max-w-7xl">
      <div className="grid max-w-2xl grid-cols-1 py-4 -mx-4 sm:grid-cols-2 gap-y-10 sm:mx-auto lg:max-w-none lg:grid-cols-4 xl:gap-x-4 lg:bg-gray-100 rounded-3xl">
        <section className="flex flex-col px-6 sm:px-8 lg:py-8">
          <h3 className="mt-5 text-lg text-black">Greedy</h3>
          <p className="mt-2 text-sm text-gray-500">
            Amazing for those attached to money with glue
          </p>
          <p className="order-first text-5xl font-light tracking-tight text-black">
            $0
          </p>
          <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Connect 1 websites </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> 1 bank accounts </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Track up to 1 credit cards </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Analytics support </span>
            </li>
          </ul>
          <a className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black mt-8" aria-label="Wannabe tier" href="/register">
            Get started
          </a>
        </section>
        <section className="flex flex-col px-6 sm:px-8 lg:py-8">
          <h3 className="mt-5 text-lg text-black">Wannabe</h3>
          <p className="mt-2 text-sm text-gray-500">
            Good for those trying to get there, but are too far from it.
          </p>
          <p className="order-first text-5xl font-light tracking-tight text-black">
            $2
          </p>
          <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Connect 1 websites </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> 2 bank accounts </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Track up to 15 credit cards </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Analytics support </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Export up to 3 months data </span>
            </li>
          </ul>
          <a className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black mt-8" aria-label="Wannabe tier" href="/register">
            Get started
          </a>
        </section>
        <section className="flex flex-col order-first px-6 py-8 bg-black rounded-3xl sm:px-8 lg:-mt-24 lg:order-none">
          <h3 className="mt-5 text-lg text-white">Indie Hacker</h3>
          <p className="mt-2 text-sm text-gray-100">
            Perfect for those leaving 9-5 and working 24/7.
          </p>
          <p className="order-first text-5xl font-light tracking-tight text-white">
            $29
          </p>
          <ul role="list" className="flex flex-col order-last mt-10 text-sm text-white gap-y-3">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Connect 80 websites </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> 5 bank accounts </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Track up to 50 credit cards </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Analytics support </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Export up to 12 months data </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Cloud service 24/7 </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Track in multiple users </span>
            </li>
          </ul>
          <a className="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white mt-8" aria-label="Indie hacker tier" href="/register">
            Get started
          </a>
        </section>
        <section className="flex flex-col px-6 sm:px-8 lg:py-8">
          <h3 className="mt-5 text-lg text-black">Big fish</h3>
          <p className="mt-2 text-sm text-gray-500">
            For even the biggest enterprise companies.
          </p>
          <p className="order-first text-5xl font-light tracking-tight text-black">
            $99
          </p>
          <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Connect unlimited websites </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> 15 bank accounts </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Track up to 200 credit cards </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Analytics support </span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></CheckIcon>
              <span className="ml-4"> Export up to 24 months data </span>
            </li>
          </ul>
          <a className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black mt-8" aria-label="Big fish tier" href="/register">
            Get started
          </a>
        </section>
      </div>
    </div>
  </section>
  );
}