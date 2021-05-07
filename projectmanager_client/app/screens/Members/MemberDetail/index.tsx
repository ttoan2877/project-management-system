import React, { useMemo, useCallback, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import Text from 'components/Text'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { removeMember, setMemberRole } from 'store/project/actions'
import { getCurrentRole, getProjectState } from 'store/project/selectors'
import AppStyles from 'config/styles'
import Touchable from 'components/Touchable'
import Loading from 'components/Loading'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrap: {
    borderWidth: 1,
    borderColor: AppStyles.color.LIGHT_GRAY,
    backgroundColor: AppStyles.color.BACKGROUND,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
  footerBtn: {
    ...AppStyles.common.shadow,
    paddingVertical: 8,
    backgroundColor: AppStyles.color.PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'black',
    marginTop: 16,
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
})

const MemberDetail = ({ route }: any) => {
  const dispatch = useDispatch()
  const role = useSelector(getCurrentRole)
  const { isLoading } = useSelector(getProjectState)

  const member = useMemo(() => get(route, 'params.item'), [route])

  const onRemoveMember = useCallback(() => {
    dispatch(removeMember(get(member, 'id')))
  }, [dispatch, member])

  const onSetRole = useCallback(
    (isAdmin: boolean) => {
      dispatch(setMemberRole({ isAdmin, user_id: get(member, 'id') }))
    },
    [dispatch, member],
  )

  return (
    <SecondaryLayout
      title={'Member detail'}
      onPressFooterButton={onRemoveMember}
      hasFooter={role === 'admin'}
      footerButtonLabel={'Remove from project'}>
      <Fragment>
        <View style={styles.textWrap}>
          <Text gray bold type="caption">
            Member name:
          </Text>
          <Text gray type="h4">
            {get(member, 'fullname', '')}
          </Text>
          <Text style={{ marginTop: 16 }} gray bold type="caption">
            Member email:
          </Text>
          <Text gray type="h4">
            {get(member, 'mail', '')}
          </Text>
          <Text style={{ marginTop: 16 }} gray bold type="caption">
            Role:
          </Text>
          <Text uppercase gray type="h4">
            {get(member, 'role', '')}
          </Text>
        </View>
        {role === 'admin' && (
          <Touchable
            style={styles.footerBtn}
            onPress={() => onSetRole(get(member, 'role', '') !== 'admin')}>
            <Text uppercase light type="h5">
              {get(member, 'role', '') === 'admin'
                ? 'Set to member'
                : 'Promote to admin'}
            </Text>
          </Touchable>
        )}
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default MemberDetail
