import {FC, useId} from "react";
import IndicatorType from "../../types/IndicatorType";
import QuestionType from "../../types/QuestionType";
import Indicator from "../indicator";
import Question from "../question";

type Props = {
    indicator: IndicatorType;
    questions?: QuestionType[]
}

const Card: FC<Props> = ({indicator, questions = []}) => {
    const key = useId();
    return <div className="p-5 bg-white rounded-2xl flex-col justify-start items-start gap-5 inline-flex">
        <Indicator {...indicator}/>
        {questions.map((q, index) => <Question key={`indicator-${key}-question-${index}`} {...({...q, indicator: indicator.uuid})}/>)}
    </div>
}

export default Card
