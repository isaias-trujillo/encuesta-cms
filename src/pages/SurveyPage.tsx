import useSurveyStatus from "../stores/useSurveyStatus.ts";
import {FC, useEffect} from "react";
import ErrorPage from "./error";
import LoadingPage from "./loading/LoadingPage.tsx";

const SurveyPage: FC = () => {
    const init = useSurveyStatus(state => state.init);

    const {loading, status, message} = useSurveyStatus(state => ({
        loading: state.loading,
        status: state.status,
        message: state.message,
        surveyId: state.surveyId
    }));

    useEffect(() => {
        const surveyId = new URLSearchParams(window.location.search).get('id');
        if (surveyId) {
            init(surveyId);
        }
    }, [init]);


    if (loading) {
        return <LoadingPage/>;
    }

    if (status === 'not found') {
        return <ErrorPage status={'not found'} message={message}/>;
    }

    if (status === 'error') {
        return <ErrorPage status={'error'} message={message}/>;
    }

    if (status === 'completed') {
        return <div>Survey has been completed</div>;
    }

    return <div>Survey in progress</div>;

    // const id = useId();
    // const {indicators} = useSurvey(state => ({indicators: state.indicators()}));
    //
    //
    // return (
    //     <div className="flex flex-col p-5 max-w-screen-lg bg-app-bg">
    //         <Header/>
    //         <div className="flex flex-col gap-4 py-8">
    //             {indicators.map((indicator, index) => <Card
    //                 key={`indicator-card-${id}-${index}`}
    //                 indicator={indicator}
    //                 questions={indicator?.questions}
    //             />)}
    //         </div>
    //         <Navigation/>
    //     </div>
    // );
};

export default SurveyPage
