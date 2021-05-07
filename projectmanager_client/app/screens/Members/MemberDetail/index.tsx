import React, { useMemo, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { removeMember } from 'store/project/actions'

const MemberDetail = ({ route }: any) => {
  const dispatch = useDispatch()

  const member = useMemo(() => get(route, 'params.item'), [route])

  const onRemoveMember = useCallback(() => {
    dispatch(removeMember(get(member, 'id')))
  }, [dispatch, member])
  return (
    <SecondaryLayout
      title={get(member, 'fullname', '')}
      onPressFooterButton={onRemoveMember}
      footerButtonLabel={'Remove from project'}>
      <View />
    </SecondaryLayout>
  )
}

export default MemberDetail
