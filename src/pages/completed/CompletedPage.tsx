import {FC} from "react";

const CompletedPage: FC = () => {
    return <div
        className="flex lg:flex-row max-sm:flex-col-reverse justify-center items-center place-content-center w-[100svw] h-[100svh] lg:px-20 md:px-10 px-5 lg:py-5 md:py-2.5 py-1 bg-black">
        <div className="flex md:h-full max-w-full">
            <img
                className="flex md:h-full max-w-full object-contain"
                src="/pics/original-a4506bf9fc1e3a76179602e39a5393f9.jpg"
             alt="Encuesta completada"/>
        </div>
        <div
            className="flex flex-col justify-center lg:gap-10 md:gap-5 gap-2.5 lg:max-w-md max-lg:max-w-md items-center">
            <div
                className="flex flex-wrap text-zinc-900 lg:text-6xl md:text-4xl text-[1.75rem] font-bold font-['Roboto Mono'] lg:gap-2.5 md:gap-1.5 gap-1 md:items-center items-center">
                <span className="text-white">Encuesta de Satisfacción</span>
                <span className="text-pink-200">completada</span>
            </div>
            <span
                className="text-white md:text-2xl text-base font-normal font-['Roboto'] lg:rounded-2xl md:rounded-xl rounded-medium">
                        <b className="text-violet-200 font-bold">¡Muchas gracias!</b>, la información que ha brindado,
                es muy valiosa para mejorar la calidad de la atención en la
                <b className="text-bright-orange font-bold"> Clínica Maison de Santé</b>.
                    </span>
        </div>
    </div>
}

export default CompletedPage
