import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="overflow-y-scroll">
      <Head>
        <title>Shout-outs</title>
        <meta name="shout-out generator" content="Shout-out generator" />
      </Head>
      <div className="font-Rubik font-light h-screen flex flex-col justify-center items-center p-10 lg:p-0">
        <div className="text-4xl lg:text-7xl tracking-tight text-center">
          give a shout-out to anyone...
        </div>
        <div className="mt-5 lg:mt-10 w-3/4 lg:w-2/4">
          <ul className="list-decimal text-2xl">
            <li>
              type in any name after the URL and an exclusive shout-out page
              will be generated{" "}
              <span className="italic">
                (letters only with a length of 2 up to 12)
              </span>
            </li>
            <li>add a message and submit</li>
            <li>share this link to the one you&apos;re thankful for today</li>
            <li>
              try it out!{" "}
              <Link href="/test" passHref>
                <a className="italic">
                  https://shout-out-board-j8020ie07-mldc18.vercel.app/
                  <span className="text-sky-400">test</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
