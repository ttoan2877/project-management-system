import React, { useEffect, useRef, useCallback } from 'react'
import { Modalize, ModalizeProps } from 'react-native-modalize'
import { useSafeArea } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import Touchable from 'components/Touchable'
import Text from 'components/Text'
import Icon from 'components/Icon'
import AppStyles from 'config/styles'
import { Portal } from 'react-native-paper'

export interface BottomSheetProps extends Partial<ModalizeProps> {
  isOpen: boolean
  children?: any
  title?: string
  closeIconColor?: string
  headerStyle?: any
  modalStyle?: any
  onClosed?: () => void
  adjustToContentHeight?: boolean
  snapPoint?: number
  withHandle?: boolean
  handlePosition?: 'inside' | 'outside'
  onPositionChange?: (position: 'top' | 'initial') => void
}

const BottomSheet = ({
  isOpen,
  children,
  title,
  closeIconColor = AppStyles.color.GRAY,
  headerStyle,
  modalStyle,
  snapPoint,
  ...props
}: BottomSheetProps) => {
  const insets = useSafeArea()
  const modalizeRef = useRef<Modalize>(null)

  useEffect(() => {
    if (modalizeRef.current) {
      isOpen ? modalizeRef.current.open() : modalizeRef.current.close()
    }
  }, [isOpen])

  const onPressClose = useCallback(() => {
    modalizeRef.current && modalizeRef.current.close()
  }, [modalizeRef])

  const renderHeader = useCallback(
    () => (
      <View style={[styles.header, headerStyle]}>
        <Text type="h5">{title}</Text>
        <Touchable onPress={onPressClose}>
          <Icon name="close" color={closeIconColor} />
        </Touchable>
      </View>
    ),
    [closeIconColor, headerStyle, onPressClose, title],
  )

  return (
    <Portal>
      <Modalize
        modalStyle={[styles.modal, modalStyle]}
        overlayStyle={styles.overlay}
        ref={modalizeRef}
        childrenStyle={{ paddingBottom: insets.bottom }}
        withHandle={false}
        HeaderComponent={renderHeader}
        {...(snapPoint ? { snapPoint } : { adjustToContentHeight: true })}
        {...props}>
        {children}
      </Modalize>
    </Portal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 45, 100, 0.65)',
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 999,
  },
})
