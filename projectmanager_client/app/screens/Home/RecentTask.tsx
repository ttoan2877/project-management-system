import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from 'components/Text'
import { useSelector } from 'react-redux'
import Card from 'components/Card'
import { get } from 'lodash'
import NavigationService from 'navigation/NavigationService'
import { getMyTask } from 'store/project/selectors'

const RecentTask = () => {
  const recentTasks = useSelector(getMyTask)

  const onTaskDetail = useCallback((ID: number) => {
    NavigationService.navigate('Modal', {
      screen: 'TaskDetail',
      params: { ID },
    })
  }, [])

  const renderItem = useCallback(
    (item: any, index: number) => {
      return (
        <Card
          key={index.toString()}
          name={get(item, 'name', '')}
          description={get(item, 'description', '')}
          created_at={get(item, 'CreatedAt', '')}
          users={get(item, 'users', [])}
          onPress={() => onTaskDetail(get(item, 'ID'))}
        />
      )
    },
    [onTaskDetail],
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text} type="h4">
        Recently assigned
      </Text>
      {recentTasks.map((item: any, index: number) => renderItem(item, index))}
    </View>
  )
}

export default RecentTask

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  text: {
    marginLeft: 16,
  },
})
