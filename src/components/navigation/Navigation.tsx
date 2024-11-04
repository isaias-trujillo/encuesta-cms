import {FC, useCallback, useEffect, useMemo} from "react";
import {Button, Image} from "@nextui-org/react";
import useNavigation from "../../stores/useNavigation.ts";
import useStatus from "../../stores/useStatus.ts";
import useReplier from "../../stores/useReplier.ts";


const Navigation: FC = () => {
    const {
        next,
        previous,
        init,
        isFirst,
        isLast,
        page,
        total,
    } = useNavigation(state => state);
    const {tryFinish, status} = useStatus(state => state);
    const {overview, init: initReplier} = useReplier(state => state);
    const state: 'has missing questions' | 'all question is missing' | 'no missing questions' = useMemo(() => {
        if (overview.missing === 0) {
            return 'no missing questions';
        }
        if (overview.missing === overview.total) {
            return 'all question is missing';
        }
        return 'has missing questions';
    }, [overview.missing, overview.total]);

    const pageMessage = useMemo(() => {
        switch (state) {
            case 'has missing questions':
            case 'all question is missing': {
                const count = overview.missing === 1 ? 'una pregunta' : `${overview.missing} preguntas`;
                return isLast()
                    ? `Solo te faltan responder ${count} para terminar.`
                    : `Te faltan responder ${count} para continuar.`;
            }
            default:
                return undefined;
        }
    }, [isLast, overview.missing, state])

    const initAll = useCallback(() => {
        init();
        initReplier(page);
    }, [page, init, initReplier]);

    useEffect(() => {
        initAll();
    }, [initAll]);

    return <div className='flex flex-col gap-2.5 w-full p-0 m-0 items-center'>
        {
            overview.missing == 0 && isLast() &&
            <div
                className='inline-flex gap-2.5 items-center bg-[#e5f6ff] text-black font-medium py-2.5 px-5 rounded-xl w-fit '>
                <img
                    className='w-5 h-5'
                    src="https://cdn-icons-png.flaticon.com/512/17002/17002169.png"
                    alt='check icon'
                /> Ya puedes enviar tus respuestas.
            </div>
        }

        {
            state !== 'no missing questions' &&
            <div
                className='inline-flex gap-2.5 items-center bg-[#ffe6eb] text-black font-medium py-2.5 px-5 rounded-xl w-fit'>
                <img
                    className='w-5 h-5'
                    src="https://cdn-icons-png.flaticon.com/512/3306/3306642.png"
                    alt='check icon'
                /> {pageMessage}
            </div>
        }

        <div className="flex flex-col gap-5 items-center bg-white py-2.5 px-5 rounded-2xl w-full">
            <div className={"flex justify-between items-center w-full"}>
                {!isFirst() && <Button
                    className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-6 max-sm:px-3.5 py-6 rounded-2xl justify-center items-center gap-2.5 max-sm:gap-0.5 inline-flex  shadow-lg"
                    disabled={isFirst()}
                    startContent={<Image src="/icons/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
                    onClick={previous}
                >Atrás</Button>}
                <span className="text-center text-wrap md:text-medium text-base flex flex-row gap-2.5"><p
                    className="max-sm:hidden">Página</p> {page} de <b>{total}</b></span>
                <Button
                    className={
                        `${isLast() ? "bg-bright-orange text-black" : "bg-dark-blue text-white"}
                         font-medium text-base font-['Outfit'] px-6  max-sm:px-3.5 py-6 rounded-2xl justify-center items-center gap-2.5 max-sm:gap-0.5 inline-flex shadow-lg`
                    }
                    onPress={isLast() ? () => {
                        if (state === 'has missing questions' || state === 'all question is missing') {
                            return;
                        }
                        tryFinish().finally(() => {
                            if (status === 'completed') {
                                window.location.reload();
                            }
                        });
                    } : () => {
                        if (state === 'has missing questions' || state === 'all question is missing') {
                            return;
                        }
                        next();
                    }}
                    endContent={<Image
                        src={
                            isLast()
                                ? "/icons/send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                                : "/icons/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                        }/>}
                >{
                    isLast()
                        ? "Enviar"
                        : "Siguiente"
                }</Button>
            </div>
        </div>
    </div>
}

export default Navigation
