import {FC} from "react";
import IndicatorType from "../../types/IndicatorType";

const Indicator: FC<IndicatorType> = ({image, name}) => {
    return <div className="justify-start items-center sm:gap-2.5 gap-1 inline-flex">
        <img className="max-sm:w-8 w-9" src={`${image}`} alt='icon indicator'/>
        <span className="text-foreground-500 text-base max-md:text-sm font-medium font-['Roboto Condensed']">{name}</span>
    </div>
}

export default Indicator;
