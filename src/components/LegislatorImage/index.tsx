import React, { useState } from 'react';
import { ColorValue, Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import PartyLogo from '@/components/PartyLogo';

interface LegislatorImageProps {
  party: string;
  svgBackgroundColor?: ColorValue;
  svgSize: number;
  svgStyle?: StyleProp<ViewStyle>;
  style: StyleProp<ImageStyle>;
  uri: string;
}

const LegislatorImage: React.FC<LegislatorImageProps> = ({
  party,
  svgBackgroundColor,
  svgSize,
  svgStyle,
  style,
  uri,
}) => {
  const [error, setError] = useState<boolean>(false);

  if (error) {
    return (
      <PartyLogo
        party={party}
        style={svgStyle}
        size={svgSize}
        backgroundColor={svgBackgroundColor}
      />
    );
  }

  return <Image source={{ uri }} style={style} onError={() => setError(true)} />;
};

export default LegislatorImage;
