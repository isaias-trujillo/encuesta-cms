import {FC} from "react";

const Header: FC = () => {
    return <main
        className="flex flex-col lg:p-10 p-4 justify-center place-items-start bg-dark-blue rounded-medium text-white">
            <span
                className="flex flex-row lg:gap-1 gap-0.5 flex-wrap font-medium lg:text-4xl text-2xl font-['Roboto Condensed']">
                Encuesta de Satisfacción <h1 className="text-bright-orange"> Clínica Maison de Santé</h1></span>
        <p className="text-base max-md:text-sm font-['Roboto']">
            Estimado usuario (a), estamos interesados en conocer su opinión sobre la calidad de atención que recibió
            en la Clínica Maison de Santé. Sus respuestas son totalmente confidenciales. Agradeceremos su
            participación.
        </p>
    </main>
}

export default Header;
