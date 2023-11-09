/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [
        require("@tailwindcss/line-clamp"),
    ],
    theme: {
        screens: {
            "sm": "575px",
            "smMax": { "max": "575px" },
            "mdMax": { "max": "768px" },
            "md": "768px",
            "lgMax": { "max": "1024px" },
            "lg": "1024px",
            "xl": "1200px",
            "2xl": "1440px",
            "3xl": "1600px",
        },
        spacing: {
            "containerSm": "20px", // ... - 768px
            "containerMd": "24px", // 768px - 1440px
            "containerXl": "40px", // 1440px - 1600px
            "containerXxl": "60px", // 1600px - ...
        },
        colors: {
            "white": "#FFFFFF",
            "whiteWarm": "#D9D9D9",
            "desaturatedWhiteWarm": "#F6F6F6",
            "blueMagenta": "#939299",
            "blueMagentaDarkLight": "#3D3C3F",
            "blueMagentaDark": "#313033",
            "blackLight": "#4A4A4C",
            "blueMagentaDark-400": "rgba(49,48,51,0.4)",
            "cyanBlueDark": "#6C757D",
            "cyanBlueMiddle": "#ADB5BD",
            "cyanBlueLight": "#e9ecef",
            "cyanBlueLight-500": "rgba(233,236,239,0.5)",
            "cyanBlueGray": "#212529",
            "cyanBlueCool": "#7F7F7F",
            "superSilver": "#EEEEEE",
            "yellowLight": "#FFE18E",
            "yellowWarm": "#FBB900",
            "yellowWarmLight": "#FFCC3D",
            "greenWarm": "#ACCD28",
            "greenWarm-500": "rgba(172,205,40,0.5)",
            "red": "#D10A10",
            "red-300": "rgba(209,10,16,0.3)",
            "blue-600": "rgba(128,203,222,0.6)",
            "black": "#000001",
        },
        fontSize:  {
            "xs": ["12px", {
                lineHeight: "15px",
                letterSpacing: "-0.02em",
                fontWeight: "400",
            }],
            "sm": ["14px", {
                lineHeight: "20px",
                fontWeight: "400",
            }],
            "lg-light": ["18px", {
                lineHeight: "19px",
                letterSpacing: "0.4px",
                fontWeight: "400",
            }],
            "lg-bold": ["18px", {
                lineHeight: "46px",
                letterSpacing: "0.4px",
                fontWeight: "500",
            }],
            "xl": ["20px", {
                lineHeight: "24px",
                fontWeight: "500",
            }],
            "3xl": ["32px", {
                lineHeight: "40px",
                fontWeight: "500",
            }],
            "2xl": ["40px", {
                lineHeight: "50px",
                fontWeight: "300",
            }],
            "5xl": ["48px", {
                lineHeight: "46px",
                letterSpacing: "0.4px",
                fontWeight: "400",
            }],
        },
        borderWidth: {
            "1": "1px",
            "2": "2px",
        },
    },
};
