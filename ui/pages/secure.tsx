import React from 'react';
import { withAuthSync } from "../utils/auth";

const auth = () => (
  <div>Unlocked</div>
);

export default withAuthSync(auth);