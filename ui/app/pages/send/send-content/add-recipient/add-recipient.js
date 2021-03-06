import {
  REQUIRED_ERROR,
  INVALID_RECIPIENT_ADDRESS_ERROR,
  KNOWN_RECIPIENT_ADDRESS_ERROR,
  INVALID_RECIPIENT_ADDRESS_NOT_ETH_NETWORK_ERROR,
} from '../../send.constants'

import { isValidAddress, isEthNetwork } from '../../../../helpers/utils/util'
import { checkExistingAddresses } from '../../../add-token/util'

import ethUtil from 'ethereumjs-util'
import contractMap from '@yqrashawn/cfx-contract-metadata'

export function getToErrorObject (
  to,
  toError = null,
  hasHexData = false,
  _,
  __,
  network
) {
  if (!to) {
    if (!hasHexData) {
      toError = REQUIRED_ERROR
    }
  } else if (!isValidAddress(to, network) && !toError) {
    toError = isEthNetwork(network)
      ? INVALID_RECIPIENT_ADDRESS_ERROR
      : INVALID_RECIPIENT_ADDRESS_NOT_ETH_NETWORK_ERROR
  }

  return { to: toError }
}

export function getToWarningObject (
  to,
  toWarning = null,
  tokens = [],
  selectedToken = null
) {
  if (
    selectedToken &&
    (ethUtil.toChecksumAddress(to) in contractMap ||
      checkExistingAddresses(to, tokens))
  ) {
    toWarning = KNOWN_RECIPIENT_ADDRESS_ERROR
  }
  return { to: toWarning }
}
