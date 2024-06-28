import {FC, useId} from "react";
import IndicatorType from "../../types/IndicatorType";
import QuestionType from "../../types/QuestionType";
import Indicator from "../indicator";
import Question from "../question";
import useSurvey from "../../stores/useSurvey.ts";

type Props = {
    indicator: IndicatorType;
    questions?: QuestionType[]
}

const Card: FC<Props> = ({indicator, questions = []}) => {
    const key = useId();
    const {updateAnswer, answerOf} = useSurvey();

    return <div className="p-5 bg-background/70 rounded-2xl grid gap-2.5">
        <Indicator {...indicator}/>
        {questions.map((q, index) => <Question
            key={`indicator-${key}-question-${index}`}{...{
            ...q,
            updateAnswer: (answer) => updateAnswer({
                indicator: indicator.uuid,
                question: q.uuid,
                answer
            }),
            initialAnswer: answerOf({indicator: indicator.uuid, question: q.uuid})
        }}
        />)}
    </div>
}

export default Card
