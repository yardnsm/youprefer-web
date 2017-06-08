import { create as createJss } from 'jss';
import { create as createInjectSheet } from 'react-jss';
import preset from 'jss-preset-default';

const jss = createJss();
jss.setup(preset());

const injectSheet = createInjectSheet(jss);

export default injectSheet;
