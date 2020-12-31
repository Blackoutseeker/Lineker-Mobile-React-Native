const INITIAL_STATE: string = '__null__'

export interface qrModalActionTemplate {
  type: 'SET_QRMODAL_VALUE';
  payload: {
    qrModalValue: string
  }
}

const QrModal = (state: string=INITIAL_STATE, action: qrModalActionTemplate): string => {
  switch(action.type) {
    case 'SET_QRMODAL_VALUE':
      return action.payload.qrModalValue
    default:
      return state
  }
}

export default QrModal