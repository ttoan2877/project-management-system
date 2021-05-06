import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface AvatarListProps {
  users?: any[]
}

const demo = ['XD', 'JA', 'HM', 'MT']

const AvatarList = ({ users }: AvatarListProps) => {
  return (
    <View style={styles.container}>
      {demo.map((item, index) => (
        <Avatar.Text size={24} style={styles.margin} label={item} />
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
