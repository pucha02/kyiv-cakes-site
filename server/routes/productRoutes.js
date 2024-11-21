import express from 'express';
import Product from '../models/Product.js';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/getProducts', getProducts)
router.put('/updateType/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;

        const product = await Product.findByIdAndUpdate(id, { type }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }

        res.json({ message: 'Тип товару успішно оновлено', product });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});

export default router;