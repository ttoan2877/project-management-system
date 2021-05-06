import React, { useCallback } from 'react'
import { Card as PaperCard } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import Icon from 'components/Icon'
import AvatarList from 'components/AvatarList'

interface CardProps {
  name: any
  avatar?: string[]
  created_at?: any
  description?: string
  isOwner?: boolean
  users?: any[]
  onPress?: () => void
}

const Card = ({
  name,
  avatar,
  created_at,
  description,
  isOwner,
  users,
  onPress,
}: CardProps) => {
  return (
    <PaperCard style={styles.container} onPress={onPress}>
      <View style={styles.accessories}>
        <Text type="h5">{name}</Text>
        {isOwner && (
          <View style={styles.wrap}>
            <Text bold style={styles.text} type="caption">
              Onwed
            </Text>
            <Icon
              name="check-bold"
              size={12}
              color={AppStyles.color.LIGHT_GRAY}
            />
          </View>
        )}
      </View>
      <View style={[styles.accessories, styles.top8]}>
        <AvatarList users={users} />
      </View>
      <Text numberOfLines={2} style={styles.top8} gray type="caption">
        {description}
      </Text>
    </PaperCard>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  accessories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrap: {
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    borderColor: AppStyles.color.LIGHT_GRAY,
  },
  text: {
    color: AppStyles.color.LIGHT_GRAY,
    marginRight: 2,
  },
  top8: {
    marginTop: 8,
  },
})
