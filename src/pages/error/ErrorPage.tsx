import {FC} from "react";
import styles from './styles.module.css'

type Props = {
    status: 'error' | 'not found';
    message?: string;
}

const ErrorPage: FC<Props> = ({status, message}) => {
    return <div
        className='box-border select-none flex flex-col justify-center items-center bg-black w-[100svw] h-[100svh] gap-2.5'>
        <span className="text-[10rem] max-sm:text-4xl text-background font-bold text-center">
            {status === "not found" ? "404" : "Algo fue mal..."}
        </span>
        <div className="flex justify-center items-center">
            <span className={styles.message + " text-background"}>{message}</span>
            <span className={styles.spacer}></span>
        </div>
    </div>
}

export default ErrorPage
