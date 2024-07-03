import {FC} from "react";
import styles from './styles.module.css'
import {Image} from "@nextui-org/react";

const CompletedPage: FC = () => {
    return <div
        className="flex max-md:flex-wrap-reverse lg:flex-row justify-center items-center place-content-center w-[100svw] h-[100svh] lg:px-20 md:px-10 px-5 lg:py-5 md:py-2.5 py-1 bg-black">
        <div className="flex md:max-h-f ull max-w-full max-h-full">
            <img
                className={`flex max-w-full max-h-full object-contain ${styles.animatic} z-0 relative aspect-auto`}
                src="/pics/original-a4506bf9fc1e3a76179602e39a5393f9.jpg"
                alt="Encuesta completada"/>
        </div>
        <div
            className="flex flex-col justify-center lg:gap-10 md:gap-5 gap-2.5 lg:max-w-md max-lg:max-w-md items-center z-1 relative">
            <div
                className="flex flex-wrap text-zinc-900 lg:text-6xl md:text-5xl max-md:text-4xl text-[1.5rem] font-bold font-['Roboto Mono'] lg:gap-2.5 md:gap-1.5 gap-1 md:items-center items-center">
                <span className="text-white">Encuesta de Satisfacción</span>
                <span className="text-pink-200">completada</span>
            </div>
            <span
                className="text-white md:text-2xl max-md:text-medium text-base font-light font-['Roboto'] lg:rounded-2xl md:rounded-xl rounded-medium">
                        <b className="text-violet-200 font-bold">¡Muchas gracias!</b>, la información que ha brindado,
                es muy valiosa para mejorar la calidad de la atención en todas nuestras sedes de la
                <b className="text-bright-orange font-bold"> Clínica Maison de Santé</b>.
                    </span>
        </div>
        <div
            className="text-white absolute bottom-0 flex flex-col w-full lg:px-20 md:px-10 px-5 lg:py-5  py-2.5 md:text-xl max-md:text-medium text-xs font-normal font-['Roboto']">
            <Image src="/pics/logo_cms_aniversario.png" className="max-h-20" alt="Logo de la Clínica"/>
            <p className="text-xs">Copyright © 2024 – Clinica Maison de Santé.</p>
            <p className="text-xs">Todos los derechos reservados.</p>
        </div>
    </div>
}

export default CompletedPage
