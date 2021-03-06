import React, { useCallback, Fragment, useState, useMemo } from 'react'
import SecondaryLayout from 'components/SecondaryLayout'
import Form from 'components/Form'
import Loading from 'components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState } from 'store/tasks/selectors'
import { createTask } from 'store/tasks/actions'

const FIELDS = [
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'description',
    label: 'Description',
    multiline: true,
  },
]

const CreateTask = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(getTaskState)
  const [data, setData] = useState<any>({})

  const isValid = useMemo(() => data.name && data.description, [data])

  const onSubmit = useCallback(() => {
    if (!isValid) return
    dispatch(createTask(data))
  }, [data, dispatch, isValid])

  return (
    <SecondaryLayout
      title="Create new task"
      disableFooterButton={!isValid}
      onPressFooterButton={onSubmit}
      footerButtonLabel="Create task">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default CreateTask
