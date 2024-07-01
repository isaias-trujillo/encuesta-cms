import {FC} from "react";
import './styles.css'

const LoadingPage: FC = () => {
    return <div
        className='box-border select-none flex flex-col justify-center items-center bg-black w-[100svw] h-[100svh] gap-2.5'>
        <span className="loader"></span>
    </div>
}

export default LoadingPage;
