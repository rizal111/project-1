import React, { FC, useRef, useState, useEffect } from "react";

import { Stack, Box } from "@mui/material";
import { grey, red, yellow, blue, green } from "@mui/material/colors";

type Props = {
  id: number;
  currentScore: number;
  currentColor: string;
};

const Bar = ({ id, currentScore, currentColor }: Props) => {
  const [color, setColor] = useState<string>();

  useEffect(() => {
    if (id <= currentScore) return setColor(currentColor);
    return setColor(grey[400]);
  }, [currentColor]);

  return (
    <Box
      sx={{ width: "100%", height: 5, backgroundColor: color, borderRadius: 5 }}
    ></Box>
  );
};

const PasswordMeter = ({ score }: { score: number }) => {
  const [color, setColor] = useState<string>(grey[400]);
  const shade = 700;

  useEffect(() => {
    switch (score) {
      case 1:
        setColor(red[shade]);
        break;
      case 2:
        setColor(yellow[shade]);
        break;
      case 3:
        setColor(blue[shade]);
        break;
      case 4:
        setColor(green[shade]);
        break;
      default:
        setColor(grey[400]);
        break;
    }
  }, [score]);

  return (
    <Stack direction="row" spacing={0.5}>
      <Bar id={1} currentScore={score} currentColor={color} />
      <Bar id={2} currentScore={score} currentColor={color} />
      <Bar id={3} currentScore={score} currentColor={color} />
      <Bar id={4} currentScore={score} currentColor={color} />
    </Stack>
  );
};

export default PasswordMeter;
