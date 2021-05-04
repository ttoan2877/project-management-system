import Touchable from 'components/Touchable'
import Text from 'components/Text'
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import AppStyles from 'config/styles'
import Icon from 'components/Icon'

const styles = StyleSheet.create({
  container: {
    height: 144,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btn: {
    width: 128,
    height: 128,
    backgroundColor: AppStyles.color.WHITE,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AppStyles.color.LIGHT_GRAY,
  },
  iconWrap: {
    padding: 4,
    borderRadius: 2,
  },
  whiteText: { color: AppStyles.color.WHITE },
  grayText: { color: AppStyles.color.GRAY },
  greenText: { color: AppStyles.color.GREEN },
  redText: { color: AppStyles.color.DANGER },
  orangeText: { color: AppStyles.color.ORANGE },
  primaryText: { color: AppStyles.color.PRIMARY },
  all: { backgroundColor: AppStyles.color.PRIMARY },
})

const TaskSummary = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Touchable style={[styles.btn, styles.all]}>
          <Icon
            name="text-box-check-outline"
            size={16}
            color={AppStyles.color.WHITE}
          />
          <Text style={styles.whiteText} type="h1">
            28
          </Text>
          <Text type="h5" style={styles.whiteText}>
            All task
          </Text>
        </Touchable>
        <Touchable style={styles.btn}>
          <Icon
            name="format-list-checkbox"
            size={16}
            color={AppStyles.color.ORANGE}
          />
          <Text style={styles.orangeText} type="h1">
            12
          </Text>
          <Text type="h5" style={styles.grayText}>
            To do
          </Text>
        </Touchable>
        <Touchable style={styles.btn}>
          <Icon name="calendar" size={16} color={AppStyles.color.PRIMARY} />
          <Text style={styles.primaryText} type="h1">
            9
          </Text>
          <Text type="h5" style={styles.primaryText}>
            In progress
          </Text>
        </Touchable>
        <Touchable style={styles.btn}>
          <Icon
            name="check-box-multiple-outline"
            size={16}
            color={AppStyles.color.GREEN}
          />
          <Text style={styles.greenText} type="h1">
            5
          </Text>
          <Text type="h5" style={styles.greenText}>
            Completed
          </Text>
        </Touchable>
        <Touchable style={styles.btn}>
          <Icon name="calendar" size={16} color={AppStyles.color.ORANGE} />
          <Text style={styles.redText} type="h1">
            22
          </Text>
          <Text type="h5" style={styles.redText}>
            Closed
          </Text>
        </Touchable>
      </ScrollView>
    </View>
  )
}

export default TaskSummary
