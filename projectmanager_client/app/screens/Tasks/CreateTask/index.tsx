import React, { useCallback, Fragment, useState, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import Form from 'components/Form'
import Loading from 'components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState } from 'store/tasks/selectors'
import DatePicker from 'react-native-date-picker'
import { createTask } from 'store/tasks/actions'

const FIELDS = [
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'description',
    label: 'Description',
  },
]

const CreateTask = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState<Date>(new Date())
  const { isLoading } = useSelector(getTaskState)
  const [data, setData] = useState<any>({})

  const isValid = useMemo(() => data.name && data.description, [data])

  const onSubmit = useCallback(() => {
    if (!isValid) return
    dispatch(createTask({ ...data, deadline: date.toISOString() }))
  }, [data, date, dispatch, isValid])

  return (
    <SecondaryLayout
      title="Create new task"
      disableFooterButton={!isValid}
      onPressFooterButton={onSubmit}
      footerButtonLabel="Create task">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
        <View
          style={{
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <DatePicker
            minimumDate={new Date()}
            date={date}
            onDateChange={setDate}
            androidVariant="iosClone"
            mode="date"
          />
        </View>
      </Fragment>
    </SecondaryLayout>
  )
}

export default CreateTask
