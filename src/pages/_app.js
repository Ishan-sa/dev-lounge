import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Nav from "../components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@/components/MDX-Styles/MDX-Styles";
import { useSSR } from "@nextui-org/react";
import "@/styles/globals.css";
import Footer from "@/components/Footer/Footer";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { isBrowser } = useSSR();

  const scrollRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 1000);
  };

  return (
    <>
      {isBrowser && (
        <>
          <NextUIProvider>
            <SessionProvider session={session}>
              <NextThemesProvider
                defaultTheme="system"
                attribute="class"
                value={{
                  light: lightTheme.className,
                }}
              >
                <Nav />
                <MDXProvider components={MDXComponents}>
                  <Component {...pageProps} />
                  <div className="mt-14">
                    <Footer />
                  </div>
                  {showScrollBtn && (
                    <BsFillArrowUpCircleFill
                      className="fixed bottom-[70px] right-[40px] text-4xl cursor-pointer text-blue-500 hover:text-blue-700 duration-150"
                      ref={scrollRef}
                      onClick={scrollToTop}
                    />
                  )}
                </MDXProvider>
              </NextThemesProvider>
            </SessionProvider>
          </NextUIProvider>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
