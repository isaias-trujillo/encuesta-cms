import {FC, useEffect, useId, useMemo} from "react";
import Header from "../../components/header";
import Card from "../../components/card";
import Navigation from "../../components/navigation";
import useForm from "../../stores/useForm.ts";
import ErrorPage from "../error";
import splitFormInPages from "../../services/splitFormInPages.ts";
import useNavigation from "../../stores/useNavigation.ts";
import LoadingPage from "../loading/LoadingPage.tsx";

const SurveyContent: FC = () => {
    const id = useId();
    const page = useNavigation(state => state.page);
    const {loading, status, message, init} = useForm();
    const data = useForm(state => state.data);
    const slice = useMemo(() => {
        return splitFormInPages(data())[page - 1]
    }, [data, page]);

    useEffect(() => {
        init();
    }, [init]);

    if (loading) {
        return <LoadingPage/>
    }

    if (status === 'error') {
        return <ErrorPage status={'error'} message={message}/>
    }

    if (!data) {
        return <ErrorPage status={'error'} message={'No se ha podido cargar la encuesta'}/>
    }


    return <div className="flex flex-col p-5 max-w-screen-lg bg-app-bg">
        <Header/>
        <div className="flex flex-col gap-4 py-8">
            {slice?.indicators.map((indicator, index) => <Card
                key={`indicator-card-${id}-${index}`}
                indicator={indicator}
                questions={indicator?.questions}
            />)}
        </div>
        <Navigation/>
    </div>
}

export default SurveyContent
