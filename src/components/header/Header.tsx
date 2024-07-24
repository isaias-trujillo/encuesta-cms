import {FC} from "react";
import useForm from "../../stores/useForm.ts";

const Header: FC = () => {
    const service = useForm(state => state.data()?.service);

    return <div className='flex flex-col gap-2.5'>
        <main
            className="flex flex-col lg:p-8 p-4 lg:gap-2.5 gap-1.5 justify-center place-items-start bg-dark-blue rounded-medium text-white">
            <span
                className="flex flex-row lg:gap-1 gap-0.5 flex-wrap font-medium lg:text-4xl text-2xl font-['Roboto Condensed']">
                Encuesta de Satisfacción <h1 className="text-bright-orange"> Clínica Maison de Santé</h1></span>
            <p className="text-md max-md:text-sm font-['Roboto']">
                Estimado usuario (a), estamos interesados en conocer su opinión sobre la calidad de atención que recibió
                en la Clínica Maison de Santé. Sus
                respuestas son totalmente confidenciales.
                Agradeceremos su
                participación.
            </p>
        </main>
        {
            service && <article
                className="flex flex-row  lg:gap-2 gap-1.5 flex-wrap text-md max-md:text-sm font-['Roboto'] bg-white rounded-medium text-dark-blue lg:p-5 p-4 justify-between">
                <div className='inline-flex gap-2.5 items-center'>
                    <img
                        className='w-5 h-5'
                        src="https://cdn-icons-png.flaticon.com/512/1040/1040238.png"
                        alt={service.name}
                    /> <b>Servicio:</b>{service?.['name']}
                </div>
                <div className='inline-flex gap-2.5 items-center'>
                    <img
                        className='w-5 h-5'
                        src="https://cdn-icons-png.flaticon.com/512/10473/10473587.png"
                        alt={service['care date']}
                    /> <b>Fecha de atención:</b>{service['care date']}
                </div>
            </article>
        }
    </div>
}

export default Header;
