import {FC, useId, useMemo, useState} from "react";
import Header from "../../components/header";
import Card from "../../components/card";
import SurveyType from "../../types/SurveyType";
import OptionType from "../../types/OptionType";
import getQuestionsOfPage from "../../services/getQuestionsOfPage.ts";
import {Button, Image} from "@nextui-org/react";

type Props = {
    survey: SurveyType,
    options: OptionType[]
}

const SurveyPage: FC<Props> = ({survey, options}) => {
    const id = useId();
    const maxPages = useMemo(() => {
        console.log("Computing max pages")
        return Math.ceil(survey.indicators.map(({questions}) => questions.length)
            .reduce((acc, curr) => acc + curr, 0) / 5)
    }, []);
    const [page, setPages] = useState(1);
    const slices = useMemo(() => {
        console.log("Computing slices")
        return getQuestionsOfPage(survey, 5, page)
    }, [page]);

    console.log({page})

    return (
        <div className="flex flex-col p-5 max-w-screen-lg">
            <Header/>
            <div className="flex flex-col gap-4 py-8">
                {slices.map((indicator, index) => <Card
                    key={`indicator-card-${id}-${index}`}
                    indicator={indicator}
                    questions={indicator?.questions?.map(q => ({...q, options: [...options]}))}
                />)}
            </div>
            <div className={page === 1 ? "flex justify-end" : "flex justify-between"}>
                {page !== 1 && <Button
                    className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex  shadow-lg"
                    disabled={page == 1}
                    startContent={<Image src="/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
                    onClick={() => setPages((prev) => Math.max(1, prev - 1))}
                >Back</Button>}
                <Button
                    className={
                        `${page === maxPages ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-dark-blue"}
                        text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex shadow-lg`
                    }
                    disabled={page === maxPages}
                    onClick={() => setPages(prev => Math.min(maxPages, prev + 1))}
                    endContent={<Image src={
                        page === maxPages
                            ? "send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                            : "/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                    }/>}
                >{page == maxPages ? "Send" : "Next"}</Button>
            </div>
        </div>
    );
};

export default SurveyPage
