import { Tab } from "@headlessui/react";
import { FC, ReactNode } from "react";

interface ITabs {
    tabs: {
        id: number;
        title: string;
        component: ReactNode;
    }[]
}

const Tabs: FC<ITabs> = ({ tabs }) => {
    function renderTabs() {
        return tabs.map(tab => {
            return (
                <Tab key={tab.id} className={"outline-none"}>
                    {({ selected }) => (
                        <span className={`text-sm lg:text-[18px] ${selected && "font-bold underline"} outline-none`}>
                            {tab.title}
                        </span>
                    )}
                </Tab>
            );
        });
    }

    function renderContent() {
        return tabs.map(tab => {
            return (
                <Tab.Panel key={tab.id} className={"lg:w-7/12"}>
                    {tab.component}
                </Tab.Panel>
            );
        });
    }
    
    return (
        <Tab.Group>
            <Tab.List className={"flex justify-between lg:justify-start lg:gap-[132px]"}>
                {renderTabs()}
            </Tab.List>
            <Tab.Panels className={"mt-[28px] flex gap-[20px]"}>
                {renderContent()}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs;