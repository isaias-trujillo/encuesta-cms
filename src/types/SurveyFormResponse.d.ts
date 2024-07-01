export type SurveyFormResponse = {
    patient: Patient
    survey: Survey
    service: Service
    options: Option[]
    questionnaire: Questionnaire[]
}

type Patient = {
    id: string
    name: string
}

type Survey = {
    id: string
    status: string
}

type Service = {
    id: string
    name: string
}

type Option = {
    id: string
    name: string
    weight: string
}

type Questionnaire = {
    id: string
    name: string
    image: string
    questions: Question[]
}

type Question = {
    id: string
    question: string
    answer: string;
}

export default SurveyFormResponse;
