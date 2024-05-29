/* --------------------------------- Import --------------------------------- */
import express from 'express'
import morgan from 'morgan';

import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
import {engine} from 'express-handlebars'

import quienesSomosRoutes from './routes/quinesSomos.routes.js'
import productosRoutes from './routes/productos.routes.js'
import planesRoutes from './routes/planes.routes.js'



/* ----------------------------- Initializacion ----------------------------- */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/* -------------------------------- Settings -------------------------------- */
app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req, res) => {
    res.render('index')
});

app.use(quienesSomosRoutes);
app.use(productosRoutes);
app.use(planesRoutes);

/* ------------------------------ Public Files ------------------------------ */
app.use(express.static(join(__dirname, 'public') ));

/* ------------------------------- Run Server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port ', app.get('port'));
});