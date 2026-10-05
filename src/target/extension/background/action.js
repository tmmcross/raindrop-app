import browser from 'webextension-polyfill'
import { has } from './links'
import { currentTab } from '~target'

let icon = unescape('%u2713') //✓, glitchy without escape in safari

export async function updateBadge() {
    const { url, id: tabId } = await currentTab()
    if (!url) return

    await Promise.all([
        browser.action.setBadgeBackgroundColor({tabId, color: '#0087EA'}),
        browser.action.setBadgeText({tabId, text: has(url) ? icon : ''}),

        ...(typeof browser.action.setBadgeTextColor == 'function' ? [
            browser.action.setBadgeTextColor({tabId, color: '#FFFFFF'})
        ] : []),
    ])
}

export async function open(path, { width = 420, height = 600 } = {}) {
    let origin = { left: 0, top: 0, width: 0, height: 0 }
    try{
        origin = await browser.windows.getCurrent()
    } catch(_) {}

    return await browser.windows.create({
        url: `/index.html#${path}`,
        type: 'popup',

        //position
        width,
        height,
        left: parseInt(origin.left + (origin.width/2) - (width/2)),
        top: parseInt(origin.top + (origin.height/2) - (height/2))
    })
}

async function onTabsUpdated(id, details = {}) {
    if (details?.status == 'complete')
        await updateBadge()
}

export default function() {
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    browser.tabs.onActivated.removeListener(updateBadge)
    browser.tabs.onActivated.addListener(updateBadge)
}