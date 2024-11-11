import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
};

export default corsOptions;
