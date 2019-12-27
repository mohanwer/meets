import React from 'react';
import { withAuthSync } from "./auth";

const auth = () => (
  <div>Unlocked</div>
);

export default withAuthSync(auth);