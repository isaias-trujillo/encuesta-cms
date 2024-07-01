import OptionType from "./OptionType";

type QuestionType = {
    id: string;
    question: string;
    options?: OptionType[];
}

export default QuestionType;
