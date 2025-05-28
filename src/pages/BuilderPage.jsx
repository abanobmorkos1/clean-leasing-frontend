// src/pages/BuilderPage.jsx
import { BuilderComponent } from '@builder.io/react';
import '../builder/builder-setup';
import '../builder/registerComponents';

const BuilderPage = () => <BuilderComponent model="page" />;

export default BuilderPage;
