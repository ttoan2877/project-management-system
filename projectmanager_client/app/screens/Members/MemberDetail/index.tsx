import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import { get } from 'lodash'

const MemberDetail = ({ route }: any) => {
  const member = useMemo(() => get(route, 'params.item'), [route])
  return (
    <SecondaryLayout title={get(member, 'fullname', '')}>
      <View />
    </SecondaryLayout>
  )
}

export default MemberDetail
