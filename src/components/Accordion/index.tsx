import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { View, StyleProp, TextStyle, ViewStyle } from 'react-native';

import RotatingChevron from '@/components/RotatingChevron';

import styles from './styles';

interface AccordionStyles {
  container?: StyleProp<ViewStyle>;
  item?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  content?: StyleProp<ViewStyle>;
}

interface AccordionItemProps {
  title: string;
  onPressText?: () => void;
  itemStyles?: Omit<AccordionStyles, 'container'>;
}

const AccordionItem: React.FC<PropsWithChildren<AccordionItemProps>> = React.memo(
  ({ title, onPressText, itemStyles, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View style={[styles.accordionItem, itemStyles?.item]}>
        <RotatingChevron
          headerStyle={[styles.header, itemStyles?.header]}
          textStyle={[styles.headerText, itemStyles?.text]}
          isOpen={isOpen}
          text={title}
          onPressText={onPressText}
          onPress={(open: boolean) => setIsOpen(open)}
        />
        {isOpen && <View style={[styles.content, itemStyles?.content]}>{children}</View>}
      </View>
    );
  },
);

interface AccordionProps {
  data: Array<{
    key: number;
    title: string;
    onPressTitle?: () => void;
    content: ReactNode;
  }>;
  accordionStyles?: AccordionStyles;
}

const Accordion: React.FC<AccordionProps> = ({ data, accordionStyles }) => {
  return (
    <View style={[styles.container, accordionStyles?.container]}>
      {data.map(item => (
        <AccordionItem
          key={item.key}
          title={item.title}
          onPressText={item.onPressTitle}
          itemStyles={{
            item: accordionStyles?.item,
            header: accordionStyles?.header,
            text: accordionStyles?.text,
            content: accordionStyles?.content,
          }}>
          {item.content}
        </AccordionItem>
      ))}
    </View>
  );
};

export default Accordion;
