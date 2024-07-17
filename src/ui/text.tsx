import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { I18nManager, StyleSheet, Text as RNText } from 'react-native';

import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';

interface Props extends TextProps {
  tx?: TxKeyPath;
}

export const Text = ({ style, tx, children, ...props }: Props) => {
  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        styles.baseText,
        style,
      ]) as TextStyle,
    [style]
  );

  return (
    <RNText style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins_500Medium',
  },
});
