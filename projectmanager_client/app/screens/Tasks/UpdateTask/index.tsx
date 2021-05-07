import React, { useCallback, Fragment, useState, useMemo } from 'react'
import SecondaryLayout from 'components/SecondaryLayout'
import Form from 'components/Form'
import Loading from 'components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState } from 'store/tasks/selectors'
import { updateTask } from 'store/tasks/actions'
import { get } from 'lodash'

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

const UpdateTask = ({ route }: any) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(getTaskState)
  const [data, setData] = useState<any>(get(route, 'params.data', {}))
  const ID = useMemo(() => get(route, 'params.ID'), [route])

  const isValid = useMemo(() => data.name && data.description, [data])

  const onSubmit = useCallback(() => {
    if (!isValid) return
    dispatch(updateTask({ ...data, ID }))
  }, [ID, data, dispatch, isValid])

  return (
    <SecondaryLayout
      title="Update task information"
      disableFooterButton={!isValid}
      onPressFooterButton={onSubmit}
      footerButtonLabel="Update">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default UpdateTask
