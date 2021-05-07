import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { get } from 'lodash'
import Touchable from 'components/Touchable'
import NavigationService from 'navigation/NavigationService'

interface AvatarListProps {
  users?: any[]
  touchable?: boolean
}

const AvatarList = ({ users, touchable }: AvatarListProps) => {
  const Wrapper = touchable ? Touchable : Fragment
  return (
    <View style={styles.container}>
      {users &&
        users.map((item, index) => (
          <Wrapper
            onPress={() =>
              NavigationService.navigate('Modal', {
                screen: 'MemberDetail',
                item,
              })
            }>
            <Avatar.Image
              key={index.toString()}
              size={40}
              style={styles.margin}
              source={{ uri: get(item, 'avatar', '') }}
            />
          </Wrapper>
        ))}
    </View>
  )
}

export default AvatarList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  margin: {
    marginRight: 4,
  },
})
