import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jsonServer from "json-server";

import authController from "./controllers/authController.js";
import basketController from "./controllers/basketController.js";
import compareController from "./controllers/compareController.js";
import contactsController from "./controllers/contactsController.js";
import domainController from "./controllers/domainController.js";
import favoritesController from "./controllers/favoritesController.js";
import feedbackController from "./controllers/feedbackController.js";
import globalController from "./controllers/globalController.js";
import lkController from "./controllers/lkController.js";
import pageController from "./controllers/pageController.js";
import reviewController from "./controllers/reviewController.js";
import subscriptionController from "./controllers/subscriptionController.js";
import { routes } from "./db/index.js";
import favoritesService from "./services/favoritesService.js";

dotenv.config();

const server = jsonServer.create();
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = jsonServer.router(join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();
const PORT = process.env.SERVER_PORT;
const corsConfig = {
    origin: true,
    credentials: true,
};

server.options("*", cors(corsConfig));
server.use(cors());

server.use(cookieParser());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/api/v1/domain", domainController.getDomain);
server.post("/api/v1/domain", domainController.postDomain);

server.get("/api/v1/catalog/pageType/*", pageController.getPageType);

server.post("/api/v1/auth/registration", authController.registration);
server.post("/api/v1/auth/registration/confirm", authController.confirmRegistration);
server.post("/api/v1/auth/login", authController.login);
server.post("/api/v1/auth/logout", authController.logout);
server.post("/api/v1/auth/changePassword", authController.changePassword);
server.post("/api/v1/auth/changePassword/confirm", authController.confirmChangePassword);
server.post("/api/v1/auth/refresh", authController.refresh);

server.get("/api/v1/basket", basketController.getBasket);
server.post("/api/v1/basket", basketController.createBasketProduct);
server.delete("/api/v1/basket/:productId", basketController.deleteBasketProduct);
server.put("/api/v1/basket/:productId", basketController.updateBasketProduct);
server.get("/api/v1/basket/statistics", basketController.getBasketInfo);
server.post("/api/v1/basket/reset", basketController.basketReset);
server.post("/api/v1/basket/payment", basketController.basketPayment);

server.get("/api/v1/compare", compareController.getCompareProducts);
server.post("/api/v1/compare", compareController.addCompareProducts);
server.delete("/api/v1/compare/:elementId/:id", compareController.deleteCompareProduct);

server.get("/api/v1/favorites", favoritesController.getProducts);
server.post("/api/v1/favorites", favoritesController.addProducts);
server.delete("/api/v1/favorites/:id", favoritesController.deleteProduct);
server.get("/api/v1/favorites/pdfLink", favoritesController.getPdfLink);
server.post("/api/v1/favorites/sendEmail", favoritesController.sendEmail);

server.post("/api/v1/subscription", subscriptionController.subscribe);

server.post("/api/v1/feedback/supplier", feedbackController.supplier);
server.post("/api/v1/feedback/dealer", feedbackController.dealer);

server.get("/api/v1/reviews/catalog/*", reviewController.getReviews);
server.post("/api/v1/reviews/catalog/*", reviewController.createReview);

server.get("/api/v1/profile/personalInfo", lkController.personalInfo);
server.post("/api/v1/profile/personalInfo", lkController.personalInfoUpdate);
server.post("/api/v1/profile/changePassword", lkController.changePassword);
server.post("/api/v1/profile/changeEmail/confirm", lkController.confirmChangeEmail);
server.get("/api/v1/profile/addresses", lkController.getAddresses);
server.get("/api/v1/profile/addresses/:id", lkController.getAddress);
server.get("/api/v1/profile/addresses/default", lkController.getDefaultAddress);
server.post("/api/v1/profile/addresses", lkController.createAddress);
server.put("/api/v1/profile/addresses/:id", lkController.updateAddress);
server.delete("/api/v1/profile/addresses/:id", lkController.deleteAddress);
server.get("/api/v1/profile/orders", lkController.getOrders);
server.post("/api/v1/profile/orders/repeat", lkController.repeatOrders);
server.post("/api/v1/profile/orders/cancel", lkController.cancelOrder);
server.get("/api/v1/contacts/", contactsController.getContactsInfo);
server.get("/api/v1/contacts/info", contactsController.getContactsPageSeo);
server.get("/api/v1/info", globalController.getGloabalsInfo);

await routes.read();
server.use(jsonServer.rewriter(routes.data));
server.use(router);
server.listen(PORT, () => {
    console.log("JSON Server is running on port " + PORT);
});
