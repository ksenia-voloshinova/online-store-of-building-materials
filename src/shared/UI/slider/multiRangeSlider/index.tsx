import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";

interface IMultiRangeSlider {
    min: number;
    max: number;
    affordableValues: {
        min: number;
        max: number;
    }
    onChange: (min: number, max: number) => void;
}

const MultiRangeSlider: FC<IMultiRangeSlider> = ({ min, max, affordableValues, onChange }) => {
    const [minVal, setMinVal] = useState<number>(affordableValues.min);
    const [maxVal, setMaxVal] = useState<number>(affordableValues.max);
    const [refetch, setRefetch] = useState<boolean>(false);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const timeout = useRef<any>(null);
    const firstRender = useRef(true);

    // convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        setMaxVal(affordableValues.max);
        setMinVal(affordableValues.min);
    }, [affordableValues]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (firstRender.current) {
            firstRender.current = false;
        } else {
            if (!refetch) return;

            debouncedChange();
            setRefetch(false);
        }
    }, [minVal, maxVal]);

    // set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent + 1}%`;
            }
        }
    }, [minVal, getPercent]);

    // set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent - 1}%`;
            }
        }
    }, [maxVal, getPercent]);

    function debouncedChange() {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            if (maxVal < min) {
                setMaxVal(min);
            } else if (minVal > maxVal) {
                setMinVal(maxVal);
            } else if (maxVal > max) {
                setMaxVal(max);
            } else if (minVal < min) {
                setMinVal(min);
            } else {
                onChange(minVal, maxVal);
            }
        }, 700);
    }

    function handleMinRange(e: ChangeEvent<HTMLInputElement>) {
        const value = Math.min(+e.target.value, maxVal);

        setMinVal(value);
        setRefetch(true);
    }

    function handleMaxRange(e: ChangeEvent<HTMLInputElement>) {
        const value = Math.max(+e.target.value, minVal);

        setMaxVal(value);
        setRefetch(true);
    }

    function handleMinInput(e: ChangeEvent<HTMLInputElement>) {
        const value = +e.target.value;

        setMinVal(value);
        setRefetch(true);
    }

    function handleMaxInput(e: ChangeEvent<HTMLInputElement>) {
        const value = +e.target.value;

        setMaxVal(value);
        setRefetch(true);
    }

    return (
        <div className={"relative"}>
            <input
                ref={minValRef}
                max={max}
                min={min}
                type="range"
                value={minVal}
                className={`thumb absolute w-full h-[0px] outline-none pointer-events-none z-[3] 
                ${minVal > max - 100 && "z-[5]"}`}
                onChange={handleMinRange}
            />
            <input
                ref={maxValRef}
                className="thumb absolute w-full h-[0px] outline-none pointer-events-none z-[4]"
                max={max}
                min={min}
                type="range"
                value={maxVal}
                onChange={handleMaxRange}
            />
            <div className={"relative w-full overflow-hidden"}>
                <div className={"absolute z-[1] w-full h-[2px] bg-cyanBlueCool"} />
                <div ref={range} className={"absolute z-[2] h-[2px] bg-yellowWarm"} />
                <div className={"flex justify-between gap-[10px]"}>
                    <input
                        className={"mt-[20px] p-[9px] w-1/2 border-1 border-cyanBlueCool outline-none"}
                        type="text"
                        value={minVal}
                        onChange={handleMinInput}
                    />
                    <input
                        className={"mt-[20px] p-[9px] w-1/2 border-1 border-cyanBlueCool outline-none"}
                        type="text"
                        value={maxVal}
                        onChange={handleMaxInput}
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
