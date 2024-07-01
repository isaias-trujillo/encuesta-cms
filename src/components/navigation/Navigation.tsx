import {FC, useMemo} from "react";
import {Button, Image, Modal, useDisclosure} from "@nextui-org/react";
import useSurvey from "../../stores/useSurvey.ts";
import CompletedPage from "../completed";

const Navigation: FC = () => {
    const {page, maxPages, nextPage, previousPage} = useSurvey();
    const isTheLastPage = useMemo(() => page == maxPages(), [page]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return <div className={page === 1 ? "flex justify-end" : "flex justify-between"}>
        {page !== 1 && <Button
            className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex  shadow-lg"
            disabled={page == 1}
            startContent={<Image src="/icons/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
            onClick={previousPage}
        >Atrás</Button>}
        <>
            <Button
                className={
                    `${isTheLastPage ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-dark-blue"}
                        text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex shadow-lg`
                }
                disabled={isTheLastPage}
                onPress={isTheLastPage ? onOpen : nextPage}
                endContent={<Image src={
                    isTheLastPage
                        ? "/icons/send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                        : "/icons/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                }/>}
            >{isTheLastPage ? "Enviar" : "Siguiente"}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <CompletedPage/>
            </Modal>
        </>
    </div>
}

export default Navigation
