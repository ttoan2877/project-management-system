import React, { useState, useCallback, Fragment, useEffect } from 'react'
import Form from 'components/Form'
import SecondaryLayout from 'components/SecondaryLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createProject, updateProject } from 'store/project/actions'
import { getProjectState, getProjectData } from 'store/project/selectors'
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

const UpdateProject = () => {
  const { isLoading } = useSelector(getProjectState)
  const { name, description } = useSelector(getProjectData)
  const dispatch = useDispatch()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (name && description) {
      setData({ name, description })
    }
  }, [description, name])

  const onSubmit = useCallback(() => {
    dispatch(updateProject(data))
  }, [data, dispatch])

  return (
    <SecondaryLayout
      title="Update project information"
      onPressFooterButton={onSubmit}
      footerButtonLabel="Update project">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default UpdateProject
