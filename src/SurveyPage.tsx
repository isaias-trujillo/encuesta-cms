import {FC, useId} from "react";
import Header from "./components/header";
import Card from "./components/card";
import useSurvey from "./stores/useSurvey.ts";
import Navigation from "./components/navigation";


const SurveyPage: FC = () => {
    const id = useId();
    const {indicators} = useSurvey();

    return (
        <div className="flex flex-col p-5 max-w-screen-lg bg-app-bg">
            <Header/>
            <div className="flex flex-col gap-4 py-8">
                {indicators().map((indicator, index) => <Card
                    key={`indicator-card-${id}-${index}`}
                    indicator={indicator}
                    questions={indicator?.questions}
                />)}
            </div>
            <Navigation/>
        </div>
    );
};

export default SurveyPage
