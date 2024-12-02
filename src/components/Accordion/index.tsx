import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { View } from 'react-native';

import RotatingChevron from '@/components/RotatingChevron';

import styles from './styles';

interface AccordionItemProps {
  title: string;
}

const AccordionItem: React.FC<PropsWithChildren<AccordionItemProps>> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.accordionItem}>
      <RotatingChevron
        headerStyle={styles.header}
        textStyle={styles.headerText}
        isOpen={isOpen}
        text={title}
        onPress={(open: boolean) => setIsOpen(open)}
      />
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

interface AccordionProps {
  data: Array<{
    title: string;
    content: ReactNode;
  }>;
}

const Accordion: React.FC<AccordionProps> = React.memo(({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </View>
  );
});

export default Accordion;
