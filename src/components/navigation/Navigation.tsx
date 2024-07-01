import {FC, useEffect} from "react";
import {Button, Image, Modal, useDisclosure} from "@nextui-org/react";
import CompletedPage from "../completed";
import useNavigation from "../../stores/useNavigation.ts";

const Navigation: FC = () => {
    const {next, previous, init, isFirst, isLast} = useNavigation();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        init();
    }, [init]);

    return <div className={isFirst() ? "flex justify-end" : "flex justify-between"}>
        {!isFirst() && <Button
            className="text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex  shadow-lg"
            disabled={isFirst()}
            startContent={<Image src="/icons/arrow_back_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"/>}
            onClick={previous}
        >Atrás</Button>}
        <>
            <Button
                className={
                    `${isLast() ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-dark-blue"}
                        text-white font-medium text-base font-['Outfit'] bg-dark-blue px-[25px] py-6 rounded-2xl justify-center items-center gap-2.5 inline-flex shadow-lg`
                }
                disabled={isLast()}
                onPress={isLast() ? onOpen : next}
                endContent={<Image src={
                    isLast()
                        ? "/icons/send_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                        : "/icons/arrow_forward_ios_20dp_FILL0_wght400_GRAD0_opsz20.svg"
                }/>}
            >{isLast() ? "Enviar" : "Siguiente"}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <CompletedPage/>
            </Modal>
        </>
    </div>
}

export default Navigation
