import { response } from "../helpers/Response.js";
import { postModel } from "../models/post.model.js";

const postCtrl = {};

postCtrl.listar = async (req, reply) => {
  try {
    const post = await postModel.find();
    response(reply, 200, true, post, "lista de post ");
  } catch (error) {
    response(reply, 500, false, "", error.message);
    // res.status(500).json({
    //     ok:false,
    //     data:"",
    //     message:error.message
    // })
  }
};
postCtrl.listarById = async (req, reply) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return response(reply, 404, false, "", "Post no encontrado");
    }

    response(res, 200, true, post, "Post encontrado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.add = async (req, reply) => {
  try {
    if (req.file) {
      // console.log(req.file)
    }

    const { title, description, imgUrl } = req.body;

    const newPost = new postModel({
      title,
      description,
      imgUrl,
    });

    await postModel.create(newPost);

    console.log(newPost);
    response(reply, 201, true, newPost, "post creado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.delete = async (req, reply) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return response(
        reply,
        404,
        false,
        "",
        "Post no encontrado para eliminar"
      );
    }

    // post.nameImage && deleteImg(post.nameImage)

    if (post.public_id) {
      await eliminarImagenCloudinary(post.public_id);
    }

    await post.deleteOne();

    response(reply, 200, true, "", "Post eliminado ");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.update = async (req, reply) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return response(reply, 404, false, "", "Post no encontrado al eliminar");
    }

    if (req.file) {
      // post.nameImage && deleteImg(post.nameImage);
      // post.setImg(req.file.filename)

      if (post.public_id) {
        await eliminarImagenCloudinary(post.public_id);
      }
      const { secure_url, public_id } = await subirImagenACloudinary(req.file);
      post.setImg({ secure_url, public_id });
      await post.save();
    }

    await post.updateOne(req.body);

    response(reply, 200, true, "", "Post actualizado correctamente");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default postCtrl;
