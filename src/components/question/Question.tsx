import {FC, useEffect, useState} from "react";
import {cn, RadioGroup} from "@nextui-org/react";
import Option from "./../option";
import QuestionType from "../../types/QuestionType";
import IndicatorType from "../../types/IndicatorType";


const Question: FC<QuestionType & {
    indicator: IndicatorType['uuid']
}> = ({uuid, question, options, indicator}) => {
    const marked = options?.find(o => !!o?.selected);
    const [optionId, setOptionId] = useState(marked?.uuid);

    useEffect(() => {
        const controller = new AbortController();
        if (!optionId) {
            console.log("Nothing to send");
            return () => controller.abort();
        }
        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                todo: `Sending indicator id: ${indicator}, question id: ${uuid} with option id: ${optionId}`,
                completed: true,
                userId: 5,
            }),
            signal: controller.signal
        }).then(r => r.json())
            .then(r => console.log(r))
            .catch((e) => console.log(`Aborted: ${controller.signal.aborted}, error: ${e}`))
        return () => controller.abort();
    }, [indicator, optionId, uuid])

    return (
        <RadioGroup
            label={question}
            defaultValue={marked?.uuid}
            onValueChange={(v) => {
                console.log({option: v})
                setOptionId(() => v);
            }}
            orientation="horizontal"
            classNames={{
                base: cn("flex"),
                wrapper: cn("sm:p-2 max-sm:p-1 sm:gap-10 max-sm:gap-5 max-sm:grid flex items-center"),
                label: cn("text-black text-base max-md:text-sm font-semibold font-['Roboto']")
            }}
        >
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">En desacuerdo</span>
            {options?.map(option => <Option key={`question-${uuid}-option-${option.uuid}`} {...option}></Option>)}
            <span className="max-sm:hidden text-black max-md:text-sm font-normal font-['Roboto']">De acuerdo</span>
        </RadioGroup>
    );
}

export default Question
