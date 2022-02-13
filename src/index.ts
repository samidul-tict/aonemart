import express from "express";
import cors from "cors";
import  morgan from 'morgan'; 

import { connection } from './config/db';
import categoryRoutes from './route/category.route';
import productRoutes from './route/product.route';
import adminRoutes from './route/admin.route';
import bannerRoutes from './route/banner.route';
import locationRoutes from './route/location.route';
import favRoutes from './route/fav.route';
import cartRoutes from './route/cart.route';
import customerRoutes from './route/customer.route';
import miscRoutes from './route/misc.route';
import orderRoutes from './route/order.route';
import paymentRoutes from './route/payment.route';
import discountRoutes from './route/discount.route';
import taxRoutes from './route/tax.route'

const PORT = process.env.PORT || 5000;

const app = express();

//db connection
connection()

app.use(cors());
app.use(morgan('common'));
app.use(express.json({limit: '50mb'}));
//app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }))



app.use("/api", categoryRoutes,productRoutes,adminRoutes,bannerRoutes,locationRoutes,cartRoutes,
customerRoutes,favRoutes,miscRoutes,orderRoutes,paymentRoutes, taxRoutes,discountRoutes);

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`))

