import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const appRouter = express.Router();

const environment = process.env.NODE_ENV;

const parseManifest = async () => {
    if (environment !== 'production') return {};

    const manifestPath = path.join(path.resolve(), 'dist', '.vite', 'manifest.json');
    const manifestFile = await fs.readFile(manifestPath, 'binary');

    return JSON.parse(manifestFile);
};

appRouter.get('/*', async (_req, _res) => {
    const manifest = await parseManifest();
    const data = {
        isProduction: environment === 'production',
        js: manifest['src/main.js'].file || '',
        css1: manifest['src/main.css']?.file || '',
        css2: manifest['src/main.js']?.css?.[0] || '',
        layout: false,
    };

    _res.render('index.hbs', data);
});

export { appRouter };
