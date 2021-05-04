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
  },
  avatarWrap: {
    backgroundColor: AppStyles.color.DARK,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppStyles.color.PRIMARY,
  },
})

interface HomeHeaderProps {
  name: string
}

const HomeHeader = ({ name }: HomeHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.textWrap}>
        <Text type="h2">Hi {name} </Text>
        <Text gray>Let's be productive today !</Text>
      </View>
      <View style={styles.avatarWrap}>
        <Image style={styles.avatar} source={images.logo} />
      </View>
    </View>
  )
}

export default HomeHeader
