import {FC, useState} from "react";
import {cn, RadioGroup} from "@nextui-org/react";
import Option from "./../option";
import QuestionType from "../../types/QuestionType";

type Props = QuestionType & {
    updateAnswer: (answer: string) => void;
    initialAnswer: string | undefined;
}

const Question: FC<Props> = ({uuid, question, options, initialAnswer, updateAnswer}) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(initialAnswer);
    return <div className="flex flex-col gap-2.5">
        <RadioGroup
            label={question}
            defaultValue={initialAnswer}
            onValueChange={(v) => {
                setSelectedOption(() => v);
                updateAnswer(v);
            }}
            className="flex max-w-full gap-2.5"
            orientation="horizontal"
            classNames={{
                wrapper: cn("sm:p-2 max-sm:p-1 sm:gap-10 gap-5 max-sm:flex-row flex items-center max-sm:justify-center"),
                label: cn("text-black text-base max-md:text-sm font-semibold font-['Roboto']")
            }}
        >
            <img src="/icons/Embarrassed.svg" alt="Negativo" className="max-sm:max-w-8 max-w-10 sm:hidden"/>
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">En desacuerdo</span>
            {options?.map(option => <Option
                key={`question-${uuid}-option-${option.uuid}`} {...{
                ...option,
                selected: selectedOption === option.uuid
            }}/>)}
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">De acuerdo</span>
            <img src="/icons/Happy.svg" alt="Positive" className="max-sm:max-w-8 max-w-10 sm:hidden"/>
        </RadioGroup>
        <p className="sm:hidden text-black max-md:text-sm font-normal font-['Roboto'] text-center">{options?.find(o => o.uuid == selectedOption)?.name ?? ""}</p>
    </div>
}

export default Question
