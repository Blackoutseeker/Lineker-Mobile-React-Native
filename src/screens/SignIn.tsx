import React, { FC, useContext, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { DefaultTheme, ThemeContext } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import { Keyboard, Alert, ActivityIndicator } from 'react-native'
import { userInfoActionTemplate } from '../store/reducers/UserInfo'
import { routeActionTemplate } from '../store/reducers/Route'
import { CrateUserTemplate } from '../databaseTemplates/index'
import { Main, Container } from '../components/signIn/main/index'
import { 
  Description,
  TitleBlack,
  TitleWhite,
  ButtonText,
  ForgotText,
  AccountText,
  RuleText
} from '../components/signIn/text'
import { Logo } from '../components/signIn/logo/index'
import { InputContent, IconContent, Input } from '../components/signIn/input/index'
import { Button } from '../components/signIn/button'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '../utils/Firebase'

const SignIn: FC = () => {
  FontAwesome.loadFont()

  const { colors } = useContext<DefaultTheme>(ThemeContext)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [signUp, setSignUp] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const changeText = useCallback((value: string, type: string): void => {
    if(type === 'email') {
      setEmail(value)
    }
    else if(type === 'password') {
      setPassword(value)
    }
  }, [email, password])

  const changeSignUpState = useCallback((): void => {
    setSignUp(true)
  }, [signUp])

  const dismissKeyboard = (): void => {
    Keyboard.dismiss()
  }

  const signIn = useCallback(async() => {
    dismissKeyboard()
    if(email !== '') {
      if(password.length >= 6) {
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          dispatch<userInfoActionTemplate>({type: 'SET_USER_INFO', payload: {email: email, userId: user?.uid}})
          dispatch<routeActionTemplate>({type: 'SET_ROUTE', payload: {routeName: 'Home'}})
          setLoading(false)
          navigation.navigate('Home')
        })
        .catch((error) => {
          Alert.alert(
            'An error has occurred!',
            `${error}`
          )
        })
        .finally(() => {
          setLoading(false)
        })
      }
      else {
        Alert.alert(
          'Password error!',
          'The password must be 6 or more characters.'
        )
      }
    }
  }, [email, password])

  const createUser = useCallback(async() => {
    if(email !== '') {
      if(password.length >= 6) {
        setLoading(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async({user}) => {
          const createUser: CrateUserTemplate = {
            email: email,
            filters: {
              Default: {
                filter: 'Default'
              }
            }
          }
          await firebase.database().ref(`users/${user?.uid}`).set({...createUser})
          await firebase.auth().currentUser?.sendEmailVerification()
          .then(() => {
            Alert.alert(
              'Check your inbox!',
              'I sent an email to verify your account.'
            )
          })
          dispatch<userInfoActionTemplate>({type: 'SET_USER_INFO', payload: {email: email, userId: user?.uid}})
          dispatch<routeActionTemplate>({type: 'SET_ROUTE', payload: {routeName: 'Home'}})
          setLoading(false)
          navigation.navigate('Home')
        })
        .catch((error) => {
          setLoading(false)
          Alert.alert(
            'An error has occurred!',
            `${error}`
          )
        })
      }
      else {
        Alert.alert(
          'Password error!',
          'The password must be 6 or more characters.'
        )
      }
    }
  }, [email, password])

  const resetPassword = useCallback(async() => {
    if(email !== '') {
      await firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Check your inbox!',
          'I sent you an email to reset your password.'
        )
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          `${error}`
        )
      })
    }
  }, [email])

  return (
    <Main onPress={dismissKeyboard} >
      <Container>
        <StatusBar style={'light'} translucent={false} backgroundColor={colors.background} />
        <TitleWhite>Lin<TitleBlack>e</TitleBlack>k<TitleBlack>er</TitleBlack></TitleWhite>
        <Logo source={require('../assets/Lineker.png')} resizeMode={'contain'} />
        <Description>Access links between your devices</Description>
        <InputContent>
          <IconContent>
            <FontAwesome name={'envelope'} color={'#fff'} size={30} />
          </IconContent>
          <Input placeholder={'Email'} placeholderTextColor={'#fff'} selectionColor={'#fff'}
          keyboardType={'email-address'} autoCapitalize={'none'} value={email}
          onChangeText={value => changeText(value, 'email')}
          onSubmitEditing={!signUp ? signIn : createUser} />
        </InputContent>
          {!signUp
            ? <InputContent>
                <IconContent>
                  <FontAwesome name={'lock'} color={'#fff'} size={30} />
                </IconContent>
                <Input placeholder={'Password'} placeholderTextColor={'#fff'} selectionColor={'#fff'}
                  keyboardType={'default'} autoCapitalize={'none'} secureTextEntry value={password}
                  onChangeText={value => changeText(value, 'password')}onSubmitEditing={signIn} />
              </InputContent>
            : <RuleText>The password must be 6 or more characters</RuleText>
          }
        {!signUp
          ? <ForgotText onPress={resetPassword} >Forgot your password?</ForgotText>
          : <InputContent>
              <IconContent>
                <FontAwesome name={'lock'} color={'#fff'} size={30} />
              </IconContent>
              <Input placeholder={'Password'} placeholderTextColor={'#fff'} selectionColor={'#fff'}
                keyboardType={'default'} autoCapitalize={'none'} secureTextEntry value={password}
                onChangeText={value => changeText(value, 'password')} onSubmitEditing={createUser} />
            </InputContent>
        }
        <Button activeOpacity={0.7} onPress={!signUp ? signIn : createUser} >
          {!signUp
            ? !loading ? <ButtonText>Sign-In</ButtonText> : <ActivityIndicator color={colors.background} size={25} />
            : !loading ? <ButtonText>Sign-Up</ButtonText> : <ActivityIndicator color={colors.background} size={25} />
          }
        </Button>
        {!signUp
          ? <AccountText onPress={changeSignUpState} >Don't have an account? Do it now!</AccountText>
          : <AccountText />}
      </Container>
    </Main>
  )
}

export default SignIn