import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, G, SvgProps } from 'react-native-svg';

import { Party } from '@/appTypes';
import DemocratLogo from '@/assets/democrat_logo.svg';
import RepublicanLogo from '@/assets/republican_logo.svg';

type PartyType = Party['name'];

interface PartyLogoProps {
  party: PartyType;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorValue;
  size: number;
}

const PartyLogo: React.FC<PartyLogoProps> = ({ party, style, backgroundColor, size }) => {
  const partyLogoMap: Record<PartyType, React.FC<SvgProps>> = {
    Democrat: DemocratLogo,
    Republican: RepublicanLogo,
  };

  const Logo = partyLogoMap[party];

  return backgroundColor ? (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={backgroundColor} />
      <G scale={0.7} x={size * 0.15} y={size * 0.15}>
        <Logo width={size} height={size} style={style} />
      </G>
    </Svg>
  ) : (
    <Logo width={size} height={size} style={style} />
  );
};

export default PartyLogo;
