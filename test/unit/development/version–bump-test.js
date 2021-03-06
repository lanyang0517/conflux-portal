import assert from 'assert'
import versionBump from '../../../development/version-bump'
import promisify from 'pify'
import fs from 'fs'

const readFile = promisify(fs.readFile)
import path from 'path'

const changelogPath = path.join(__dirname, 'sample-changelog.md')
import manifest from './sample-manifest.json'

let changelog

describe('version bumper', function () {
  beforeEach(async () => {
    // load changelog. Mock version is 4.1.3
    const changeBuffer = await readFile(changelogPath)
    changelog = changeBuffer.toString()
  })

  it('returns a properly bumped major version', async function () {
    const result = await versionBump('major', changelog, manifest)
    const expected = '5.0.0'
    assert.equal(result.version, expected, 'major bumps correctly')
    assert.equal(result.manifest.version, expected, 'major bumps correctly')
    assert.ok(result.changelog.includes(expected))
  })

  it('returns a properly bumped minor version', async function () {
    const result = await versionBump('minor', changelog, manifest)
    const expected = '4.2.0'
    assert.equal(result.version, expected, 'minor bumps correctly')
    assert.equal(result.manifest.version, expected, 'minor bumps correctly')
    assert.ok(result.changelog.includes(expected))
  })

  it('returns a properly bumped patch version', async function () {
    const result = await versionBump('patch', changelog, manifest)
    const expected = '4.1.4'
    assert.equal(result.version, expected, 'patch bumps correctly')
    assert.equal(result.manifest.version, expected, 'patch bumps correctly')
    assert.ok(result.changelog.includes(expected))
  })
})
