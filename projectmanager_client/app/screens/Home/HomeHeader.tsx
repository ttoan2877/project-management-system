import Text from 'components/Text'
import AppStyles from 'config/styles'
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import images from 'config/images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.WHITE,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    paddingBottom: 32,
    alignItems: 'center',
    paddingTop: 16,
  },
  textWrap: {
    flex: 1,
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  avatarWrap: {
    backgroundColor: AppStyles.color.DARK,
    borderRadius: 16,
  },
})

interface HomeHeaderProps {
  name: string
  avatar: string
}

const HomeHeader = ({ name, avatar }: HomeHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.textWrap}>
        <Text type="h2">Hi {name} </Text>
        <Text gray>Let's be productive today !</Text>
      </View>
      <View style={styles.avatarWrap}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
    </View>
  )
}

export default HomeHeader
