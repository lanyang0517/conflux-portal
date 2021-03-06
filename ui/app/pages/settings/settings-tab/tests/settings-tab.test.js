import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SettingsTab from '../index'

describe('Settings Tab', () => {
  let wrapper

  const props = {
    setCurrentCurrency: sinon.spy(),
    displayWarning: sinon.spy(),
    setUseBlockie: sinon.spy(),
    updateCurrentLocale: sinon.spy(),
    setUseNativeCurrencyAsPrimaryCurrencyPreference: sinon.spy(),
    warning: '',
    currentLocale: 'en',
    useBlockie: false,
    currentCurrency: 'usd',
    conversionDate: 1,
    nativeCurrency: 'eth',
    useNativeCurrencyAsPrimaryCurrency: true,
  }
  beforeEach(() => {
    wrapper = mount(
      <SettingsTab.WrappedComponent {...props} />, {
        context: {
          t: str => str,
        },
      }
    )
  })

  it.skip('selects currency', async () => {
    const selectCurrency = wrapper.find({ placeholder: 'selectCurrency' })

    selectCurrency.props().onSelect('eur')
    assert(props.setCurrentCurrency.calledOnce)
  })

  it('selects locale', async () => {
    const selectLocale = wrapper.find({ placeholder: 'selectLocale' })

    await selectLocale.props().onSelect('ja')
    assert(props.updateCurrentLocale.calledOnce)
  })

  it.skip('sets fiat primary currency', () => {
    const selectFiat = wrapper.find('#fiat-primary-currency')

    selectFiat.simulate('change')
    assert(props.setUseNativeCurrencyAsPrimaryCurrencyPreference.calledOnce)
  })

  it.skip('toggles blockies', () => {
    const toggleBlockies = wrapper.find({ type: 'checkbox' })

    toggleBlockies.simulate('click')
    assert(props.setUseBlockie.calledOnce)
  })
})
