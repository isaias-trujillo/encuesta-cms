import {ThemeProvider as NextThemesProvider} from "next-themes";
import SurveyPage from "./routes/survey";

export default function App() {
    return <NextThemesProvider attribute="class" defaultTheme="light">
        <SurveyPage/>
    </NextThemesProvider>
}
