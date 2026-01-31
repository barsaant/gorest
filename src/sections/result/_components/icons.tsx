import * as React from 'react';

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';

export type IconKey = 'time' | 'hotel' | 'info' | 'warn' | 'check' | 'cancel' | 'target' | 'bolt';

export const IconByKey: Record<IconKey, React.ReactNode> = {
  time: <AccessTimeRoundedIcon />,
  hotel: <HotelRoundedIcon />,
  info: <InfoRoundedIcon />,
  warn: <WarningAmberRoundedIcon />,
  check: <CheckCircleRoundedIcon />,
  cancel: <CancelRoundedIcon />,
  target: <TrackChangesRoundedIcon />,
  bolt: <BoltRoundedIcon />,
};
