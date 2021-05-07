import React, { useState, useCallback, Fragment } from 'react'
import Form from 'components/Form'
import SecondaryLayout from 'components/SecondaryLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createProject } from 'store/project/actions'
import { getProjectState } from 'store/project/selectors'
import Loading from 'components/Loading'

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

const CreateProject = () => {
  const { isLoading } = useSelector(getProjectState)
  const dispatch = useDispatch()
  const [data, setData] = useState<any>({})

  const onSubmit = useCallback(() => {
    dispatch(createProject(data))
  }, [data, dispatch])

  return (
    <SecondaryLayout
      title="Create new project"
      onPressFooterButton={onSubmit}
      footerButtonLabel="Create project">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default CreateProject
