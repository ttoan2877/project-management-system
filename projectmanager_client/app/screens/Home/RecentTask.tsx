import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from 'components/Text'
import { useSelector } from 'react-redux'
import Card from 'components/Card'
import { get, clone } from 'lodash'
import NavigationService from 'navigation/NavigationService'
import { getMyTaskState } from 'store/myTask/selectors'

const RecentTask = () => {
  const { data } = useSelector(getMyTaskState)

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

  const convertData = useMemo(() => (data ? clone(data).reverse() : []), [data])

  return (
    <View style={styles.container}>
      <Text style={styles.text} type="h4">
        Recently assigned
      </Text>
      {convertData &&
        convertData.map((item: any, index: number) => renderItem(item, index))}
    </View>
  )
}

export default RecentTask

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    marginBottom: 16,
  },
})
