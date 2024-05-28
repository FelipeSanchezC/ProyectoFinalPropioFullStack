import { Router } from "express";
import pool from "../database.js";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: "src/public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.get("/product", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM productos");
    res.render("productos/product", { productos: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.redirect("/product");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [producto] = await pool.query(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );
    const productoEdit = producto[0];
    res.render("productos/edit", { producto: productoEdit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/edit/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    let { nombreProducto, descProducto, precioProducto } = req.body;
    let imagenes = req.file ? req.file.filename : null;

    // Obtener la imagen anterior si no se seleccionó una nueva
    if (!req.file) {
      const [producto] = await pool.query(
        "SELECT imagenes FROM productos WHERE id = ?",
        [id]
      );
      imagenes = producto[0].imagenes;
    }
    const editProducto = {
      nombreProducto,
      descProducto,
      precioProducto,
      imagenes,
    };
    await pool.query("UPDATE productos SET ? WHERE id = ?", [editProducto, id]);
    res.redirect("/product");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
