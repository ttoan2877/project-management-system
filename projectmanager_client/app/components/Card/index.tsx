import Touchable from 'components/Touchable'
import React, { useCallback } from 'react'
import { Card as PaperCard } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'

interface CardProps {
  name: any
  avatar?: string[]
  created_at?: any
  description?: string
  isOwner?: boolean
  onPress?: () => void
}

const Card = ({
  name,
  avatar,
  created_at,
  description,
  isOwner,
  onPress,
}: CardProps) => {
  return (
    <Touchable onPress={onPress}>
      <PaperCard>
        <View style={styles.header}>
          <Text>{name}</Text>
        </View>
      </PaperCard>
    </Touchable>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
