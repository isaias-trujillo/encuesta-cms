import {FC, useId} from "react";
import Header from "../../components/header";
import Card from "../../components/card";
import {Button, Image} from "@nextui-org/react";
import useSurvey from "../../stores/useSurvey.ts";


const SurveyPage: FC = () => {
    const id = useId();
    const {indicators, page, maxPages, nextPage, previousPage} = useSurvey();

    return (
        <div className="flex flex-col p-5 max-w-screen-lg">
            <Header/>
            <div className="flex flex-col gap-4 py-8">
                {indicators().map((indicator, index) => <Card
                    key={`indicator-card-${id}-${index}`}
                    indicator={indicator}
                    questions={indicator?.questions}
                />)}
            </div>
            <div className={page === 1 ? "flex justify-end" : "flex justify-between"}>
                {page !== 1 && <Button
                    className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex  shadow-lg"
                    disabled={page == 1}
                    startContent={<Image src="/icons/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
                    onClick={previousPage}
                >Back</Button>}
                <Button
                    className={
                        `${page === maxPages() ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-dark-blue"}
                        text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex shadow-lg`
                    }
                    disabled={page === maxPages()}
                    onClick={nextPage}
                    endContent={<Image src={
                        page === maxPages()
                            ? "/icons/send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                            : "/icons/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                    }/>}
                >{page == maxPages() ? "Send" : "Next"}</Button>
            </div>
        </div>
    );
};

export default SurveyPage
