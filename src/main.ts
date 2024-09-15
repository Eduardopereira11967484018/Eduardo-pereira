import { ApiExpress } from "./api/express/api.express";
import { RingController } from "./api/express/controllers/ring.controller";

function main() {
    const api = ApiExpress.build();
    const controller = RingController.build();

    api.addGetRoute("/ring", controller.list.bind(controller));
    api.addPostRoute("/ring/:id/buy", controller.buy.bind(controller));
    api.addPostRoute("/ring/:id/sell", controller.sell.bind(controller));
    api.addPostRoute("/ring/create", controller.create.bind(controller));

    api.start(8000);
}

main();
