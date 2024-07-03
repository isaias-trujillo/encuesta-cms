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

    return <div className="p-5 bg-background/70 rounded-2xl grid gap-2.5">
        <Indicator {...indicator}/>
        {questions.map((q, index) => <Question
            key={`indicator-${key}-question-${index}`}{...{
            ...q,
            indicatorId: indicator.id
        }}
        />)}
    </div>
}

export default Card
