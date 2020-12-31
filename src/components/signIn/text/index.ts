import styled from 'styled-components/native'

export const TitleWhite = styled.Text`
  color: #fff;
  font-size: 36px;
  margin-bottom: 10px;
`

export const TitleBlack = styled.Text`
  color: #222;
`

export const Description = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
  width: 240px;
  margin-top: 10px;
  margin-bottom: 30px;
`

export const SimpleText = styled.Text`
  width: 85%;
  color: #fff;
  font-size: 18px;
  margin-bottom: 15px;
`

export const ForgotText = styled(SimpleText)`
  text-align: left;
`

export const AccountText = styled(SimpleText)`
  text-align: center;
`

export const RuleText = styled(SimpleText)`
  text-align: left;
  font-size: 15px;
`

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.background};
  font-size: 24px;
`