import postCtrl from "../controllers/post.controller.js";
import { postValid } from "../validSchemas/postValid.js";

postCtrl;

export const postRoutes = (fastify, opts, done) => {
  fastify.post("/", { schema: postValid }, postCtrl.add);
  fastify.get("/", postCtrl.listar);
  fastify.get("/:id", postCtrl.listarById);
  fastify.put("/:id", postCtrl.update);
  fastify.delete("/:id", postCtrl.delete);

  done();
};
