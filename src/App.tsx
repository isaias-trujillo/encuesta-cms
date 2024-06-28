import {ThemeProvider as NextThemesProvider} from "next-themes";
import SurveyPage from "./SurveyPage.tsx";

export default function App() {
    return <NextThemesProvider attribute="class" defaultTheme="light">
        <SurveyPage/>
    </NextThemesProvider>
}
