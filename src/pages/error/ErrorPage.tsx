import {FC} from "react";
import styles from './styles.module.css'
import {Image} from "@nextui-org/react";

type Props = {
    status: 'error' | 'not found';
    message?: string;
}

const ErrorPage: FC<Props> = ({status, message}) => {
    return <div
        className='box-border select-none flex flex-col justify-center items-center bg-black w-[100svw] h-[100svh] gap-2.5'>
        <div
            className="absolute top-0 left-0 w-full h-fullz-0  lg:px-20 md:px-10 px-5 lg:py-5  py-2.5">
            <Image src="/pics/logo_cms_aniversario.png" className="max-h-20" alt="Logo de la Clínica"/>
        </div>
        <span className="text-[10rem] max-sm:text-4xl text-background font-bold text-center">
            {status === "not found" ? "404" : "Algo fue mal..."}
        </span>
        <div className="flex justify-center items-center">
            <span className={`text-violet-200 ${styles.message}`}>{message}</span>
            <span className={styles.spacer}></span>
        </div>
        <div
            className="text-white absolute bottom-0 flex flex-col w-full lg:px-20 md:px-10 px-5 lg:py-5  py-2.5 md:text-xl max-md:text-medium text-xs font-normal font-['Roboto']">
            <p className="text-xs">Copyright © 2024 – Clinica Maison de Santé.</p>
            <p className="text-xs">Todos los derechos reservados.</p>
        </div>
    </div>
}

export default ErrorPage
