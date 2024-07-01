import useStatus from "../../stores/useStatus.ts";
import {FC, ReactNode, useEffect} from "react";
import ErrorPage from "../error";
import LoadingPage from "../loading/LoadingPage.tsx";

const SurveyWrapper: FC<{children: ReactNode}> = ({children}) => {
    const init = useStatus(state => state.init);

    const {loading, status, message} = useStatus(state => ({
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

    return children
};

export default SurveyWrapper
