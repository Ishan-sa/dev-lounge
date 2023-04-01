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
