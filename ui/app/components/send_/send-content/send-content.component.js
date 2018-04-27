import React, { Component } from 'react'
import PageContainerContent from '../../page-container/page-container-content.component'
import SendAmountRow from './send-amount-row/send-amount-row.container'
import SendFromRow from './send-from-row/send-from-row.container'
import SendGasRow from './send-gas-row/send-gas-row.container'
import SendToRow from './send-to-row/send-to-row.container'

export default class SendContent extends Component {

  render () {
    return (
      <PageContainerContent>
        <div className=".send-v2__form">
          <SendFromRow />
          <SendToRow />
          <SendAmountRow />
          <SendGasRow />
        </div>
      </PageContainerContent>
    )
  }

}
