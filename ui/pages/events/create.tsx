import React from 'react'
import CreateForm from "../../components/events/Create";
import { withAuthSync } from '../../utils/auth';

const createForm = () =>
(
  <CreateForm/>
);

export default withAuthSync(createForm);