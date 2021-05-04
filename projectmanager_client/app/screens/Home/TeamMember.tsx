import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Text from 'components/Text'
import Touchable from 'components/Touchable'
import AppStyles from 'config/styles'
import Icon from 'components/Icon'

const TeamMember = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} type="h4">
        My Team
      </Text>
      <ScrollView horizontal contentContainerStyle={styles.content}>
        <Touchable style={styles.btn}>
          <Icon name="plus" color={AppStyles.color.LIGHT_GRAY} />
        </Touchable>
      </ScrollView>
    </View>
  )
}

export default TeamMember

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  text: {
    marginLeft: 16,
  },
  btn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: AppStyles.color.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.WHITE,
  },
  content: {
    padding: 16,
  },
})
