import {FC} from "react";
import {cn, Radio} from "@nextui-org/react";
import OptionType from "../../types/OptionType";

const Option: FC<OptionType> = ({uuid, weight}) => {
    return <Radio
        value={uuid}
        color="default"
        className="flex flex-col-reverse place-content-center rounded-xl max-sm:p-2.5" classNames={{
        base: cn(
            "data-[selected=true]:bg-container max-sm:shadow-lg max-sm:data-[selected=true]:shadow-none max-sm:data-[selected=true]:border-1 max-sm:data-[selected=true]:border-black",
        ),
        wrapper: cn("max-sm:hidden")
    }}
    >
        <span className="max-sm:text-medium text-center self-center justify-self-center w-min h-min ">{weight}</span>
    </Radio>
};

export default Option
