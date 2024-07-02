import {FC, useEffect} from "react";
import {Button, Image} from "@nextui-org/react";
import useNavigation from "../../stores/useNavigation.ts";
import useStatus from "../../stores/useStatus.ts";

const Navigation: FC = () => {
    const {next, previous, init, isFirst, isLast, page, total} = useNavigation(state => state);
    const {tryFinish, status} = useStatus(state => state);

    useEffect(() => {
        init();
    }, [init]);

    return <div className="flex flex-col gap-5 items-center">
        {status === 'not finished' && <span className="bg-secondary-foreground text-secondary font-medium py-2.5 px-5 rounded-xl">Te faltan preguntas por responder</span>}
        <div className={"flex justify-between items-center w-full"}>
            {!isFirst() && <Button
                className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-6 max-sm:px-3.5 py-6 rounded-2xl justify-center items-center gap-2.5 max-sm:gap-0.5 inline-flex  shadow-lg"
                disabled={isFirst()}
                startContent={<Image src="/icons/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
                onClick={previous}
            >Atrás</Button>}
            <span className="text-center text-wrap md:text-medium text-base flex flex-row gap-2.5"><p className="max-sm:hidden">Página</p> {page} de <b>{total}</b></span>
            <Button
                className={
                    `${isLast() ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-dark-blue"}
                        text-white font-medium text-base font-['Outfit'] bg-dark-blue px-6  max-sm:px-3.5 py-6 rounded-2xl justify-center items-center gap-2.5 max-sm:gap-0.5 inline-flex shadow-lg`
                }
                disabled={isLast()}
                onPress={isLast() ? () => {
                    tryFinish().finally(() => {
                        if (status === 'completed') {
                            window.location.reload();
                        }
                    });
                } : next}
                endContent={<Image src={
                    isLast()
                        ? "/icons/send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                        : "/icons/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                }/>}
            >{isLast() ? "Enviar" : "Siguiente"}</Button>
        </div>
    </div>
}

export default Navigation
