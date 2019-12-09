#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { MeetsStack } from "../lib/meets-stack";

const app = new cdk.App();
new MeetsStack(app, 'MeetsStack');
