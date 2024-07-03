import {FC, useEffect, useState} from "react";
import {cn, RadioGroup} from "@nextui-org/react";
import Option from "./../option";
import QuestionType from "../../types/QuestionType";
import useForm from "../../stores/useForm.ts";
import useReplier from "../../stores/useReplier.ts";

const Question: FC<QuestionType & { indicatorId: string }> = ({id, question, indicatorId}) => {
    const options = useForm(state => state.data()?.options ?? []);
    const replier = useReplier();
    const [selected, setSelected] = useState(replier.current(indicatorId, id));

    useEffect(() => {
        setSelected(() => replier.current(indicatorId, id));
    }, [id, indicatorId, replier])

    return <div className="flex flex-col gap-2.5">
        <RadioGroup
            label={question}
            defaultValue={selected}
            onValueChange={(v) => {
                setSelected(() => v);
                replier.next(indicatorId, id, v);
            }}
            className="flex max-w-full gap-2.5"
            orientation="horizontal"
            classNames={{
                wrapper: cn("sm:p-2 max-sm:p-1 sm:gap-10 gap-5 max-sm:flex-row flex flex-nowrap items-center max-sm:justify-center"),
                label: cn("text-foreground text-base max-md:text-sm font-semibold font-['Roboto']")
            }}
        >
            <img src="/icons/Embarrassed.svg" alt="Negativo" className="max-sm:max-w-8 max-w-10 sm:hidden"/>
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">En desacuerdo</span>
            {options?.map(option => <Option
                key={`question-${id}-option-${option.id}`} {...{
                ...option,
                selected: selected === option.id
            }}/>)}
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">De acuerdo</span>
            <img src="/icons/Happy.svg" alt="Positive" className="max-sm:max-w-8 max-w-10 sm:hidden"/>
        </RadioGroup>
        <p className="sm:hidden text-black max-md:text-sm font-normal font-['Roboto'] text-center">{options?.find(o => o?.id == selected)?.name ?? ""}</p>
    </div>
}

export default Question
