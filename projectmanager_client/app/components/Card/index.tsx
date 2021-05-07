import React, { useCallback, Fragment } from 'react'
import { Card as PaperCard, Avatar } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import Icon from 'components/Icon'
import AvatarList from 'components/AvatarList'

interface CardProps {
  name: any
  email?: string
  avatar?: string[]
  created_at?: any
  description?: string
  isOwner?: boolean
  users?: any[]
  onPress?: () => void
  userAvatar?: string
}

const Card = ({
  name,
  avatar,
  email,
  created_at,
  description,
  isOwner,
  users,
  userAvatar,
  onPress,
}: CardProps) => {
  return (
    <PaperCard
      style={[styles.container, !!userAvatar && styles.row]}
      onPress={onPress}>
      {!userAvatar ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Fragment>
          <View style={styles.row}>
            <Avatar.Image source={{ uri: userAvatar }} />
            <View style={[styles.accessories, styles.left16]}>
              <Text type="h5">{name}</Text>
              <Text gray type="caption">
                {email}
              </Text>
            </View>
          </View>
        </Fragment>
      )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left16: {
    marginLeft: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})
