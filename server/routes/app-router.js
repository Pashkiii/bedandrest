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
    const data = {
        environment,
        manifest: await parseManifest(),
    };

    _res.render('index.html.ejs', data);
});

export { appRouter };
