import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";


export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = useAppSelector(state => state.theme.theme);

  useEffect(() => {

    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

  }, [theme]);

  return children;
}