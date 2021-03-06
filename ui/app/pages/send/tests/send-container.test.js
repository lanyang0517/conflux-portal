import assert from 'assert'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

let mapDispatchToProps

const actionSpies = {
  updateSendTokenBalance: sinon.spy(),
  updateGasData: sinon.spy(),
  setGasTotal: sinon.spy(),
}
const duckActionSpies = {
  updateSendErrors: sinon.spy(),
  resetSendState: sinon.spy(),
}

proxyquire('../send.container.js', {
  'react-redux': {
    connect: (_, md) => {
      mapDispatchToProps = md
      return () => ({})
    },
  },
  'react-router-dom': { withRouter: () => {} },
  recompose: { compose: (_, arg2) => () => arg2() },
  '../../store/actions': actionSpies,
  '../../ducks/send/send.duck': duckActionSpies,
  './send.utils.js': {
    calcGasTotal: (gasLimit, gasPrice) => gasLimit + gasPrice,
  },
})

describe('send container', () => {
  describe('mapDispatchToProps()', () => {
    let dispatchSpy
    let mapDispatchToPropsObject

    beforeEach(() => {
      dispatchSpy = sinon.spy()
      mapDispatchToPropsObject = mapDispatchToProps(dispatchSpy)
    })

    describe('updateAndSetGasLimit()', () => {
      const mockProps = {
        blockGasLimit: 'mockBlockGasLimit',
        editingTransactionId: '0x2',
        gasLimit: '0x3',
        gasPrice: '0x4',
        recentBlocks: ['mockBlock'],
        selectedAddress: '0x4',
        selectedToken: { address: '0x1' },
        to: 'mockTo',
        value: 'mockValue',
        data: undefined,
      }

      it('should dispatch a setGasTotal action when editingTransactionId is truthy', () => {
        mapDispatchToPropsObject.updateAndSetGasLimit(mockProps)
        assert(dispatchSpy.calledOnce)
        assert.equal(actionSpies.setGasTotal.getCall(0).args[0], '0x30x4')
      })

      it('should dispatch an updateGasData action when editingTransactionId is falsy', () => {
        const {
          gasPrice,
          selectedAddress,
          selectedToken,
          recentBlocks,
          blockGasLimit,
          to,
          value,
          data,
        } = mockProps
        mapDispatchToPropsObject.updateAndSetGasLimit(
          Object.assign({}, mockProps, { editingTransactionId: false })
        )
        assert(dispatchSpy.calledOnce)
        assert.deepEqual(actionSpies.updateGasData.getCall(0).args[0], {
          gasPrice,
          selectedAddress,
          selectedToken,
          recentBlocks,
          blockGasLimit,
          to,
          value,
          data,
        })
      })
    })

    describe('updateSendTokenBalance()', () => {
      const mockProps = {
        address: '0x10',
        tokenContract: '0x00a',
        selectedToken: { address: '0x1' },
      }

      it('should dispatch an action', () => {
        mapDispatchToPropsObject.updateSendTokenBalance(
          Object.assign({}, mockProps)
        )
        assert(dispatchSpy.calledOnce)
        assert.deepEqual(
          actionSpies.updateSendTokenBalance.getCall(0).args[0],
          mockProps
        )
      })
    })

    describe('updateSendErrors()', () => {
      it('should dispatch an action', () => {
        mapDispatchToPropsObject.updateSendErrors('mockError')
        assert(dispatchSpy.calledOnce)
        assert.equal(
          duckActionSpies.updateSendErrors.getCall(0).args[0],
          'mockError'
        )
      })
    })

    describe('resetSendState()', () => {
      it('should dispatch an action', () => {
        mapDispatchToPropsObject.resetSendState()
        assert(dispatchSpy.calledOnce)
        assert.equal(duckActionSpies.resetSendState.getCall(0).args.length, 0)
      })
    })
  })
})
