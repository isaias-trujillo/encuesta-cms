import {FC} from "react";
import {cn, Radio} from "@nextui-org/react";
import OptionType from "../../types/OptionType";

const Option: FC<OptionType> = ({uuid, name, weight}) => {
    return <Radio
        value={uuid}
        color="default"
        className="flex sm:flex-col-reverse place-content-center rounded-xl max-sm:p-2.5 sm:gap-2.5" classNames={{
        base: cn(
            "data-[selected=true]:bg-container",
        ),
    }}>
        <span className="max-sm:hidden max-sm:text-xl text-center self-center justify-self-center">{weight}</span>
        <span className="sm:hidden">{name}</span>
    </Radio>
};

export default Option
