/*
 * Copyright (c) 2020. Prototype
 */

import { Space } from "antd";
import React from "react";

type Props = {
  text: string;
}

const Optional: React.FC<Props> = ({ text }) => <Space align='center'>
  <h1>{text}</h1>
</Space>;

export default Optional;

