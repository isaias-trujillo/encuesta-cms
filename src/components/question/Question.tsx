import {FC} from "react";
import {cn, RadioGroup} from "@nextui-org/react";
import Option from "./../option";
import QuestionType from "../../types/QuestionType";

type Props = QuestionType & {
    updateAnswer: (answer: string) => void;
    initialAnswer: string | undefined;
}


const Question: FC<Props> = ({uuid, question, options, initialAnswer, updateAnswer}) => {
    return <RadioGroup
        label={question}
        defaultValue={initialAnswer}
        onValueChange={updateAnswer}
        orientation="horizontal"
        classNames={{
            base: cn("flex"),
            wrapper: cn("sm:p-2 max-sm:p-1 sm:gap-10 max-sm:gap-5 max-sm:grid flex items-center"),
            label: cn("text-black text-base max-md:text-sm font-semibold font-['Roboto']")
        }}
    >
        <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">En desacuerdo</span>
        {options?.map(option => <Option
            key={`question-${uuid}-option-${option.uuid}`} {...option}></Option>)}
        <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">De acuerdo</span>
    </RadioGroup>
}

export default Question
