import React from 'react';
import { render } from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './style.scss';

import App from './App';

render(<App />, document.querySelector("#App"));
