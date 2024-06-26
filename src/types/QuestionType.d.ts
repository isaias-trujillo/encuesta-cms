import OptionType from "./OptionType";

type QuestionType = {
    uuid: string;
    question: string;
    options?: OptionType[];
}

export default QuestionType;
