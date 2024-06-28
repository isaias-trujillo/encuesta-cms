import {FC} from "react";
import {cn, Radio, Tooltip} from "@nextui-org/react";
import OptionType from "../../types/OptionType";

const Option: FC<OptionType> = ({uuid, weight, name}) => {
    return <Tooltip
        content={name}
        placement='top'
        showArrow={true}
        offset={-5}
        color="foreground">

        <Radio
            value={uuid}
            color="default"
            classNames={{
                base: cn(
                    "hover:bg-on-container",
                    "max-sm:max-w-9 max-sm:max-h-9",
                    "flex flex-row flex-col-reverse rounded-xl",
                    'max-sm:p-2.5 gap-1.5',
                    "data-[selected=true]:bg-container",
                    'max-sm:shadow-lg max-sm:data-[selected=true]:shadow-none',
                    'max-sm:data-[selected=true]:border-1 max-sm:data-[selected=true]:border-black'
                ),
                wrapper: cn("max-sm:hidden"),
                label: cn("flex mr-1.5 max-sm:-mb-1.5")
            }}
        >
            {weight}
        </Radio>
    </Tooltip>
};


export default Option
