import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import AppStyles from 'config/styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from 'components/Text'
import Touchable from 'components/Touchable'
import Icon from 'components/Icon'
import NavigationService from 'navigation/NavigationService'

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: AppStyles.color.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.WHITE,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: AppStyles.color.LIGHT_GRAY,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  footer: {
    padding: 16,
    borderTopColor: AppStyles.color.LIGHT_GRAY,
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtn: {
    ...AppStyles.common.shadow,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: AppStyles.color.PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'black',
  },
  disabled: {
    backgroundColor: AppStyles.color.SECONDARY,
  },
})

interface LayoutProps {
  children: JSX.Element
  renderHeaderTitle?: any
  title?: string
  renderFooterButton?: any
  style?: any
  disableFooterButton?: boolean
  onPressFooterButton?: () => void
  footerButtonLabel?: string
  hasFooter?: boolean
}

const SecondaryLayout = ({
  children,
  renderHeaderTitle,
  title,
  style,
  disableFooterButton,
  renderFooterButton,
  onPressFooterButton,
  footerButtonLabel,
  hasFooter = true,
}: LayoutProps) => {
  const insets = useSafeAreaInsets()

  const onBack = useCallback(() => {
    NavigationService.goBack()
  }, [])

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets ? insets.top + 16 : 16 },
        style,
      ]}>
      <View style={styles.header}>
        <Touchable style={styles.btn} onPress={onBack}>
          <Icon name="arrow-left" size={16} style={styles.icon} />
          <Text bold>Back</Text>
        </Touchable>
        {!!title && (
          <Text uppercase type="h5">
            {title}
          </Text>
        )}
        {renderHeaderTitle && renderHeaderTitle()}
      </View>
      <View style={styles.body}>{children}</View>
      {hasFooter && (
        <View
          style={[
            styles.footer,
            { paddingBottom: insets ? insets.bottom + 16 : 16 },
          ]}>
          {!!onPressFooterButton && (
            <Touchable
              disabled={disableFooterButton}
              style={[styles.footerBtn, disableFooterButton && styles.disabled]}
              onPress={onPressFooterButton}>
              <Text uppercase light type="h5">
                {footerButtonLabel}
              </Text>
            </Touchable>
          )}
          {renderFooterButton && renderFooterButton()}
        </View>
      )}
    </View>
  )
}

export default SecondaryLayout
