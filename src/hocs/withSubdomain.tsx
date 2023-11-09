import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { fetchSubdomain } from "@/api/api";

// компонент высшего порядка для редиректа по регионам
// должен подключаться в getServerSideProps на каждой странице

function withSubdomain(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const { req, res } = context;
        const { NEXT_PUBLIC_DOMAINS, NEXT_PUBLIC_BASE_DOMAIN, NODE_ENV } = process.env; // из переменных окружения достаем весь список доменов (генерируется динамически на бэке)
        const NEXT_PUBLIC_DOMAINS_PARSE = JSON.parse(NEXT_PUBLIC_DOMAINS ?? "");
        const cookies = req.headers.cookie;
        const pathname = req.url; // текущий путь
        const domain = req.headers.host; // текущий домен
        const userDomainCookie = req.cookies.userDomain; // кука с регионом
        const { slug } = await fetchSubdomain({
            headers: {
                Cookie: cookies ?? "",
                "X-Forwarded-For": req.headers["x-forwarded-for"]
            }
        }); // отправляет запрос на бэк, для определения текущего местоположения

        // если домен по слагу из енв не совпадает с текущем
        // или слаг с бэка не совпадает со слагом в куках,
        // то редиректим на нужный домен, который пришел с бэка
        if (NEXT_PUBLIC_DOMAINS_PARSE[slug] !== domain || slug !== userDomainCookie) {
            const domain = NODE_ENV === "development" ? "localhost" : NEXT_PUBLIC_BASE_DOMAIN;

            res.setHeader(
                "Set-Cookie",
                `userDomain=${slug}; Path=/; Domain=${domain};`
            );

            return {
                redirect: {
                    destination: `/auth/${slug}${pathname && `/${pathname}`}`,
                    permanent: false,
                },
            };
        }

        return await gssp(context);
    };
}

export default withSubdomain;
