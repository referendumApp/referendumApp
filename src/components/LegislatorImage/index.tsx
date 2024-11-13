import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import Democrat from '@/assets/democrat_logo.svg';
import Republican from '@/assets/republican_logo.svg';

interface LegislatorImageProps {
  party: string;
  partySvgStyle: StyleProp<ViewStyle>;
  style: StyleProp<ImageStyle>;
  uri: string;
}

const LegislatorImage: React.FC<LegislatorImageProps> = ({ party, partySvgStyle, style, uri }) => {
  const [error, setError] = useState<boolean>(false);

  if (error) {
    return party === 'Democrat' ? <Democrat style={partySvgStyle} /> : <Republican style={partySvgStyle} />;
  }

  return <Image source={{ uri }} style={style} onError={() => setError(true)} />;
};

export default LegislatorImage;
