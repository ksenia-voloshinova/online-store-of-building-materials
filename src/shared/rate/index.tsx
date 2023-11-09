import { FC, useState } from "react";
import Ratings from "react-ratings-declarative";

import getArrayFromNumber from "@/utils/getArrayFromNumber";

interface IRate {
    rate: number;
    isDisabled?: boolean;
    onChange?: (rate: number) => void;
    size?: number;
    ratedColor?: string;
    emptyColor?: string;
    spacing?: number;
}

const Rate: FC<IRate> = ({ 
    rate,
    size = 12,
    ratedColor= "#FBB900",
    emptyColor= "#6C757D",
    spacing = 5,
    isDisabled = true,
    onChange
}) => {
    const [currentRate, setCurrentRate] = useState<number>(rate);
    
    function onChangeRate(newRate: number) {
        if (onChange) onChange(newRate);
        
        setCurrentRate(newRate);
    }

    function renderRatings() {
        return getArrayFromNumber(5).map(item => {
            return (
                <Ratings.Widget 
                    key={item}
                    widgetEmptyColor={emptyColor}
                    widgetRatedColor={ratedColor}
                />
            );
        });    
    }
    
    return (
        <Ratings
            changeRating={!isDisabled ? onChangeRate : null}
            rating={currentRate}
            widgetDimensions={`${size}px`}
            widgetHoverColors={ratedColor}
            widgetSpacings={`${spacing}px`}
        >
            {renderRatings()}
        </Ratings>
    );
};

export default Rate;