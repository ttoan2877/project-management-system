import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppStyles from 'config/styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from 'components/Text'

const styles = StyleSheet.create({
  body: {
    ...AppStyles.common.shadow,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: AppStyles.color.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.WHITE,
  },
  header: {
    paddingRight: 32,
    paddingLeft: 16,
    paddingVertical: 16,
  },
  footer: {
    paddingTop: 8,
  },
})

interface LayoutProps {
  children: JSX.Element
  renderHeader?: any
  renderFooter?: any
  style?: any
  title?: string
}

const LayoutPrimary = ({
  children,
  renderHeader,
  style,
  renderFooter,
  title,
}: LayoutProps) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets ? insets.top + 16 : 16 },
        style,
      ]}>
      {title && (
        <View style={styles.header}>
          <Text uppercase type="h5">
            {title}
          </Text>
        </View>
      )}

      {renderHeader && renderHeader()}

      <View style={styles.body}>{children}</View>

      {renderFooter && (
        <View
          style={[
            styles.footer,
            { paddingBottom: insets ? insets.bottom + 8 : 8 },
          ]}>
          {renderFooter()}
        </View>
      )}
    </View>
  )
}

export default LayoutPrimary
