import data from "./assets/emergencia.json" with {type: "json"}
import options from "./assets/options.json" with {type: "json"}
import SurveyPage from "./routes/survey";

export default function App() {
    return <SurveyPage survey={data} options={[...options]}/>
}
