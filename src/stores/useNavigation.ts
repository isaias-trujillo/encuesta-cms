import {create} from "zustand";

type Navigation = {
    page: number;
    total: number;
    init: () => void;
    previous: () => void;
    next: () => void;
    isLast: () => boolean;
    isFirst: () => boolean;
    status?: 'has missing questions' | 'all question is missing' | 'no missing questions'
    message?: string;
}

const useNavigation = create<Navigation>((set, get) => ({
    page: 1,
    total: 1,
    init: () => {
        const data = JSON.parse(localStorage.getItem('cms-survey-form-2024') ?? '{}');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const total = Math.ceil((data?.questionnaire ?? []).reduce((acc, curr) => acc + curr.questions.length, 0) / 5);
        set(() => ({total, page: parseInt(localStorage.getItem('cms-survey-form-2024-page') ?? '1')}));
    },
    previous: () => {
        set(state => ({page: Math.max(1, state.page - 1)}))
        // save page to local storage
        localStorage.setItem('cms-survey-form-2024-page', get().page.toString());
        window.location.reload();
    },
    next: () => {
        set(state => ({page: Math.min(state.total, state.page + 1)}))
        // save page to local storage
        localStorage.setItem('cms-survey-form-2024-page', get().page.toString());
        window.location.reload();
    },
    isLast: () => get().page === get().total,
    isFirst: () => get().page === 1
}))

export default useNavigation;
